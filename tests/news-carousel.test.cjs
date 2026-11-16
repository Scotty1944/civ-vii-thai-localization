const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const modelFile = path.join(__dirname, '..', 'Base', 'modules', 'core', 'ui', 'shell', 'main-menu', 'main-menu-carousel-model.js');
const rawCode = fs.readFileSync(modelFile, 'utf8');
const code = rawCode.replace(/^import .*;\s*$/gm, '').replace(/^export \{.*\};\s*$/gm, '');
const tick = () => new Promise(resolve => setImmediate(resolve));

function setup({ failConstruct = false, empty = false, locale = 'th_TH' } = {}) {
  const timers = new Map();
  const requests = [];
  const callbacks = {};
  let nextTimer = 0;
  const promos = empty ? [] : ['FIRST', 'SECOND'].map((name, i) => ({
    promoID: `${i}`, localizedCarouselTitle: `${name}-HEADLINE`,
    localizedTitle: `${name}-TITLE`, localizedContent: `${name}-BODY`,
    primaryImageUrl: `${name}.png`, secondaryImageUrl: `${name}-small.png`
  }));
  const placement = () => ({ placement: 'mainmenu_primary', fullRefresh: true, promoCount: promos.length, promos });
  let fetchCount = 0;
  const context = {
    console: { info() {}, warn() {}, error() {} },
    window: {},
    createEffect() {}, createContext() { return {}; }, useContext() {},
    onMount(fn) { callbacks.mount = fn; }, onCleanup(fn) { callbacks.cleanup = fn; },
    createMutable(v) { return v; },
    ContextManager: { push() {} },
    ModelRegistry: { register(name, mode, factory) { return factory; } },
    ModelLifecycle: { SharedInstance: 1 },
    Locale: { getCurrentDisplayLocale: () => locale },
    Network: { supportsSSO: () => true, isConnectedToNetwork: () => true, hasPromoInteractivity: () => true },
    Online: { Promo: {
      isPromoReady: () => true, hasFetchPromotionFailed: () => false,
      getPlacementUIData: () => { fetchCount++; return placement(); },
      getPromoCarouselAutoSlideTime: () => 20, telemetryPromoAction() {},
      checkPromoUIData() {}, viewPromo() {}, interactWithPromo() {}
    } },
    PromoAction: { Interact: 1 },
    engine: { on(name, fn) { callbacks[name] = fn; }, off() {} },
    setInterval(fn, ms) { const id = ++nextTimer; timers.set(id, { fn, ms }); return id; },
    clearInterval(id) { timers.delete(id); },
    Image: class { constructor() { this.style = {}; } },
    XMLHttpRequest: class {
      constructor() { if (failConstruct) throw new Error('XHR unavailable'); requests.push(this); }
      open(method, url) { this.method = method; this.url = url; }
      send() {}
      respond(data, status = 200) { this.status = status; this.responseText = typeof data === 'string' ? data : JSON.stringify(data); this.onload(); }
      fail() { this.onerror(); }
    },
  };
  vm.createContext(context);
  vm.runInContext(code, context, { filename: modelFile });
  const model = context.createPromoCarouselModel();
  callbacks.mount();
  return { model, timers, requests, callbacks, promos, placement, count: () => fetchCount };
}

const trans = suffix => ({
  'FIRST-HEADLINE': `ข่าวแรก${suffix}`, 'FIRST-TITLE': `หัวข้อแรก${suffix}`, 'FIRST-BODY': `เนื้อหาแรก${suffix}`,
  'SECOND-HEADLINE': `ข่าวสอง${suffix}`, 'SECOND-TITLE': `หัวข้อสอง${suffix}`, 'SECOND-BODY': `เนื้อหาสอง${suffix}`,
});

test('loads local translations asynchronously without fetch and preserves selected promo', async () => {
  const game = setup();
  assert.equal(game.requests.length, 1);
  assert.equal(game.requests[0].method, 'GET');
  assert.match(game.requests[0].url, /^fs:\/\/game\/core\/ui\/shell\/main-menu\/news\.json$/);
  assert.equal(game.count(), 1, 'promo refresh occurs before XHR completes');
  assert.equal(game.model.carouselItems.length, 2);
  game.model.onNextItem();
  assert.equal(game.model.selectedCarouselItem.promoId, '1');
  game.requests[0].respond(trans(''));
  await tick();
  assert.equal(game.model.selectedCarouselItem.promoId, '1');
  assert.equal(game.model.selectedCarouselItem.carouselTitle, 'ข่าวสอง');
  assert.equal(game.model.selectedCarouselItem.title, 'หัวข้อสอง');
  assert.equal(game.model.selectedCarouselItem.content, 'เนื้อหาสอง');
});

test('synchronous XHR failure does not prevent promo refresh', async () => {
  const game = setup({ failConstruct: true });
  await tick();
  assert.equal(game.count(), 1);
  assert.equal(game.model.carouselItems.length, 2);
});

test('empty promo feed and subsequent translations do not crash', async () => {
  const game = setup({ empty: true });
  assert.equal(game.model.carouselItems.length, 0);
  game.requests[0].respond(trans(''));
  await tick();
  assert.equal(game.model.carouselItems.length, 0);
});

test('polls changed translations and retains selection', async () => {
  const game = setup();
  game.requests[0].respond(trans('เก่า'));
  await tick();
  game.model.onNextItem();
  const poll = [...game.timers.values()].find(t => t.ms === 60000);
  assert.ok(poll, 'translation refresh timer was registered');
  poll.fn();
  assert.equal(game.requests.length, 2);
  game.requests[1].respond(trans('ใหม่'));
  await tick();
  assert.equal(game.model.selectedCarouselItem.promoId, '1');
  assert.equal(game.model.selectedCarouselItem.title, 'หัวข้อสองใหม่');
});

test('failed read retries on next poll and applies recovered translations', async () => {
  const game = setup();
  game.requests[0].fail();
  await tick();
  assert.equal(game.count(), 1);
  const poll = [...game.timers.values()].find(t => t.ms === 60000);
  poll.fn();
  assert.equal(game.requests.length, 2);
  game.requests[1].respond(trans(''));
  await tick();
  assert.equal(game.model.selectedCarouselItem.title, 'หัวข้อแรก');
});

test('other display languages do not load Thai translations', () => {
  const game = setup({ locale: 'en_US' });
  assert.equal(game.requests.length, 0);
  assert.equal(game.count(), 1);
  assert.equal(game.model.selectedCarouselItem.title, 'FIRST-TITLE');
});

test('partial refresh updates the text of an existing selected promo', async () => {
  const game = setup();
  game.requests[0].respond(trans(''));
  await tick();
  assert.equal(game.model.selectedCarouselItem.title, 'หัวข้อแรก');
  const changed = {
    ...game.promos[0],
    localizedCarouselTitle: 'SECOND-HEADLINE',
    localizedTitle: 'SECOND-TITLE',
    localizedContent: 'SECOND-BODY'
  };
  game.callbacks.PromosRetrievalCompleted({
    placement: 'mainmenu_primary', fullRefresh: false, promoCount: 1, promos: [changed]
  });
  assert.equal(game.model.carouselItems.length, 2);
  assert.equal(game.model.selectedCarouselItem.promoId, '0');
  assert.equal(game.model.selectedCarouselItem.carouselTitle, 'ข่าวสอง');
  assert.equal(game.model.selectedCarouselItem.title, 'หัวข้อสอง');
  assert.equal(game.model.selectedCarouselItem.content, 'เนื้อหาสอง');
});

test('an empty full refresh clears the previously selected promo and image', async () => {
  const game = setup();
  game.requests[0].respond(trans(''));
  await tick();
  game.model.onNextItem();
  assert.equal(game.model.selectedCarouselItem.promoId, '1');
  assert.match(game.model.carouselImage, /SECOND-small/);
  game.callbacks.PromosRetrievalCompleted({
    placement: 'mainmenu_primary', fullRefresh: true, promoCount: 0, promos: []
  });
  assert.equal(game.model.carouselItems.length, 0);
  assert.equal(game.model.selectedCarouselIndex, 0);
  assert.equal(game.model.selectedCarouselItem, undefined);
  assert.equal(game.model.carouselImage, "url('blp:carousel_default')");
});
