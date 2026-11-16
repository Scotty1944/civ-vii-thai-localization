import { createEffect, onMount, onCleanup, createContext, useContext } from '../../../vendor/solid-js/dist/solid.js';
import { createMutable } from '../../../vendor/solid-js/store/dist/store.js';
import { ContextManager } from '../../context-manager/context-manager.js';
import { ModelRegistry, ModelLifecycle } from '../../../ui-next/services/model-registry.js';

var CarouselActionTypes = /* @__PURE__ */ ((CarouselActionTypes2) => {
  CarouselActionTypes2[CarouselActionTypes2["NO_ACTION"] = 0] = "NO_ACTION";
  CarouselActionTypes2[CarouselActionTypes2["PROCESS_PROMO"] = 1] = "PROCESS_PROMO";
  return CarouselActionTypes2;
})(CarouselActionTypes || {});
function createPromoCarouselModel() {
  const NEWS_TRANSLATIONS_URL = "https://raw.githubusercontent.com/Scotty1944/civ-vii-thai-localization/main/news.json";
  let carouselSliderId = -1;
  let latestPromoData;
  let newsTranslations = {};
  let newsTranslationsLoadPromise;
  const carouselImages = [];
  const untranslatedNewsTags = new Set();
  function preloadCarouselImage(image) {
    const imageElement = new Image();
    imageElement.src = image;
    imageElement.style.display = "none";
    imageElement.style.position = "absolute";
    carouselImages.push(imageElement);
  }
  function onPromosRetrievalCompleted(data) {
    if (!Online.Promo.isPromoReady()) {
      console.error("main-menu-carousel.tsx: Promo is not ready! CreateCarousel skipped");
      return;
    }
    if (data.placement == "mainmenu_primary") {
      model.bootLoaded = model.bootLoaded && !data.fullRefresh;
      createCarousel(data);
    }
    updateNetworkFlags();
  }
  function onPromoRefresh() {
    refreshPromos();
  }
  function refreshPromos() {
    if (!Network.supportsSSO()) {
      return;
    }
    if (Online.Promo.hasFetchPromotionFailed()) {
      Online.Promo.reloadPromos();
      return;
    }
    const data = Online.Promo.getPlacementUIData("mainmenu_primary");
    if (data.placement == "mainmenu_primary") {
      model.bootLoaded = model.bootLoaded && !data.fullRefresh;
      createCarousel(data);
    }
    updateNetworkFlags();
  }
  function showExpandedCarousel() {
    ContextManager.push("promo-carousel-expanded", {
      singleton: true,
      createMouseGuard: true
    });
  }
  function createCarousel(data) {
    if (!Network.supportsSSO()) {
      return;
    }
    latestPromoData = data;
    if (data.fullRefresh) {
      model.carouselItems = [];
      if (model.selectedCarouselIndex > 0 && model.selectedCarouselIndex >= data.promoCount) {
        setCarouselIndex(data.promoCount - 1);
      }
    }
    let bootItemIndex = -1;
    for (let itemIndex = 0; itemIndex < data.promoCount; itemIndex += 1) {
      const promo = data.promos[itemIndex];
      appendPromoToCarousel(promo, itemIndex);
      if (promo.isBootPromo && !promo.isBootShown && bootItemIndex <= -1 && data.fullRefresh) {
        bootItemIndex = itemIndex;
      }
    }
    updateCarousel(0 /* NO_ACTION */);
    const isThaiDisplayLanguage = Locale.getCurrentDisplayLocale() === "th_TH";
    if (data.fullRefresh && !model.bootLoaded && bootItemIndex >= 0 && !isThaiDisplayLanguage) {
      setCarouselIndex(bootItemIndex);
      model.bootLoaded = true;
      showExpandedCarousel();
    } else if (data.fullRefresh) {
      setCarouselIndex(0);
    }
    resetCarouselSlider();
  }
  function setCarouselIndex(index) {
    model.selectedCarouselIndex = index;
    model.selectedCarouselItem = model.carouselItems[index];
    model.carouselImage = `url('${model.selectedCarouselItem.carouselImageUrl}')`;
  }
  function interactWithSelectedPromo() {
    if (!Network.supportsSSO()) {
      return;
    }
    if (model.selectedCarouselItem) {
      interactWithPromo(model.selectedCarouselItem.promoId, "Expanded Carousel");
    }
  }
  function interactWithPromo(promoId, promoLocation) {
    Online.Promo.interactWithPromo(PromoAction.Interact, promoId, promoLocation, model.selectedCarouselIndex);
  }
  function isNewsTag(value) {
    return typeof value === "string" && /^[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)+$/.test(value.trim());
  }
  function publishUntranslatedNewsTags() {
    const exportData = {};
    for (const tag of Array.from(untranslatedNewsTags).sort()) {
      exportData[tag] = "";
    }
    window.__CIV7_THAI_NEWS_TAGS__ = exportData;
    console.info("[CIV7_THAI_NEWS_TAGS] Copy this JSON into the root news.json to translate:\n" + JSON.stringify(exportData, null, 2));
  }
  function collectNewsTags(promo) {
    let changed = false;
    for (const field of ["localizedCarouselTitle", "localizedTitle", "localizedContent"]) {
      const value = promo && promo[field];
      const tags = typeof value === "string"
        ? value.match(/[A-Z0-9]+(?:[-_][A-Z0-9]+)+|[A-Z][a-z]+(?:_[A-Z][a-z]+)*_[A-Z0-9]+/g) || []
        : [];
      for (const candidate of tags) {
        if (Object.prototype.hasOwnProperty.call(newsTranslations, candidate)) continue;
        const tag = candidate;
        if (!untranslatedNewsTags.has(tag)) {
          untranslatedNewsTags.add(tag);
          changed = true;
        }
      }
    }
    if (changed) publishUntranslatedNewsTags();
  }
  function loadNewsTranslations() {
    if (newsTranslationsLoadPromise) return newsTranslationsLoadPromise;
    const url = `${NEWS_TRANSLATIONS_URL}?v=${Date.now()}`;
    newsTranslationsLoadPromise = fetch(url, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : {})
      .then((data) => {
        newsTranslations = data && typeof data === "object" && !Array.isArray(data) ? data : {};
        if (latestPromoData) {
          const selectedPromoId = model.selectedCarouselItem && model.selectedCarouselItem.promoId;
          createCarousel({ ...latestPromoData, fullRefresh: true });
          const selectedIndex = model.carouselItems.findIndex((item) => item.promoId === selectedPromoId);
          if (selectedIndex >= 0) setCarouselIndex(selectedIndex);
        }
        return newsTranslations;
      })
      .catch((error) => {
        console.warn("Unable to load news.json translations; using fallback labels.", error);
        return newsTranslations;
      });
    return newsTranslationsLoadPromise;
  }
  function getThaiPromoText(value, fallback) {
    if (Locale.getCurrentDisplayLocale() !== "th_TH" || typeof value !== "string") {
      return value;
    }
    const tag = value.trim();
    if (!isNewsTag(tag)) return value;
    const translation = newsTranslations[tag];
    return typeof translation === "string" && translation.trim() ? translation : fallback;
  }
  function appendPromoToCarousel(promo, itemIndex) {
    if (itemIndex < 0) {
      console.error("Invalid promo index");
      return;
    }
    if (promo == null) return;
    collectNewsTags(promo);
    for (const carouselItem of model.carouselItems) {
      if (carouselItem.promoId == promo.promoID) {
        carouselItem.carouselImageUrl = promo.secondaryImageUrl;
        carouselItem.modalImageUrl = promo.primaryImageUrl;
        carouselItem.isInteractable = promo.isInteractable;
        carouselItem.autoRedeemOnShow = promo.autoRedeemOnShow;
        return;
      }
    }
    model.carouselItems.push({
      carouselTitle: getThaiPromoText(promo.localizedCarouselTitle, "ข่าวสาร"),
      title: getThaiPromoText(promo.localizedTitle, "ข่าวสารจาก Civilization VII"),
      content: getThaiPromoText(promo.localizedContent, ""),
      carouselImageUrl: promo.secondaryImageUrl,
      modalImageUrl: promo.primaryImageUrl,
      promoId: promo.promoID,
      isInteractable: promo.isInteractable,
      autoRedeemOnShow: promo.autoRedeemOnShow,
      layout: promo.promoLayout
    });
    preloadCarouselImage(promo.primaryImageUrl);
  }
  function handleNextItem() {
    const nextItemIndex = model.selectedCarouselIndex + 1;
    if (nextItemIndex < model.carouselItems.length) {
      setCarouselIndex(nextItemIndex);
    } else {
      setCarouselIndex(0);
    }
    resetCarouselSlider();
    return true;
  }
  function handlePreviousItem() {
    const previousItemIndex = model.selectedCarouselIndex - 1;
    if (previousItemIndex >= 0) {
      setCarouselIndex(previousItemIndex);
    } else {
      setCarouselIndex(model.carouselItems.length - 1);
    }
    resetCarouselSlider();
    return true;
  }
  function handleSetItem(index) {
    setCarouselIndex(index);
  }
  createEffect(() => {
    if (model.isExpanded) {
      processSelectedPromo();
      if (model.selectedCarouselItem && !model.selectedCarouselItem.modalImageUrl) {
        Online.Promo.checkPromoUIData("mainmenu_primary", model.selectedCarouselItem.promoId ?? "");
      }
    }
    resetCarouselSlider();
  });
  function handleCarouselInteract() {
    interactWithSelectedPromo();
  }
  function resetCarouselSlider() {
    const secondsForAutomaticSlide = Online.Promo.getPromoCarouselAutoSlideTime();
    clearInterval(carouselSliderId);
    if (model.carouselItems.length <= 1) {
      return;
    }
    if (!model.isExpanded) {
      carouselSliderId = setInterval(() => {
        const nextItemIndex = Math.abs(model.selectedCarouselIndex + 1) % model.carouselItems.length;
        setCarouselIndex(nextItemIndex);
        updateCarousel();
      }, secondsForAutomaticSlide * 1e3);
    }
  }
  function onConnectionStatusChanged() {
    updateNetworkFlags();
  }
  function updateNetworkFlags() {
    model.supportsSSO = Network.supportsSSO();
    model.isConnectedToNetwork = Network.isConnectedToNetwork();
    model.hasPromoInteractivity = Network.hasPromoInteractivity();
  }
  function handleTelemetryPromoAction(promoAction, promoId, promoLocation, interactionDestination) {
    Online.Promo.telemetryPromoAction(promoAction, promoId, promoLocation, model.selectedCarouselIndex, interactionDestination);
  }
  function updateCarousel(action = 1 /* PROCESS_PROMO */) {
    if (model.selectedCarouselItem) {
      if (model.isExpanded && action == 1 /* PROCESS_PROMO */) {
        processSelectedPromo();
      }
      if (model.selectedCarouselItem.carouselImageUrl) {
        if (model.isExpanded) {
          handleTelemetryPromoAction(PromoAction.View, model.selectedCarouselItem.promoId, "Expanded Carousel", "");
        } else {
          handleTelemetryPromoAction(PromoAction.View, model.selectedCarouselItem.promoId, "Main Menu Carousel", "");
        }
      } else {
        Online.Promo.checkPromoUIData("mainmenu_primary", model.selectedCarouselItem.promoId);
      }
    }
  }
  function processSelectedPromo() {
    if (model.selectedCarouselItem) {
      Online.Promo.viewPromo(model.selectedCarouselItem.promoId);
      if (model.selectedCarouselItem.autoRedeemOnShow) {
        interactWithPromo(model.selectedCarouselItem.promoId, "Expanded Carousel");
        model.selectedCarouselItem.autoRedeemOnShow = false;
      }
    }
  }
  onMount(() => {
    engine.on("ConnectionStatusChanged", onConnectionStatusChanged);
    engine.on("PromosRetrievalCompleted", onPromosRetrievalCompleted);
    engine.on("PromoRefresh", onPromoRefresh);
    if (Locale.getCurrentDisplayLocale() === "th_TH") loadNewsTranslations();
    refreshPromos();
  });
  onCleanup(() => {
    engine.off("ConnectionStatusChanged", onConnectionStatusChanged);
    engine.off("PromosRetrievalCompleted", onPromosRetrievalCompleted);
    engine.off("PromoRefresh", onPromoRefresh);
  });
  const model = createMutable({
    bootLoaded: false,
    supportsSSO: false,
    isConnectedToNetwork: false,
    hasPromoInteractivity: false,
    isExpanded: false,
    carouselItems: [],
    selectedCarouselIndex: 0,
    selectedCarouselItem: void 0,
    carouselImage: "url('blp:carousel_default')",
    onNextItem: handleNextItem,
    onPreviousItem: handlePreviousItem,
    onSetItem: handleSetItem,
    onCarouselInteract: handleCarouselInteract,
    onCarouselUpdate: updateCarousel,
    onTelemetryPromoAction: handleTelemetryPromoAction,
    onShowExpandedCarousel: showExpandedCarousel
  });
  return model;
}
const PromoCarouselModel = ModelRegistry.register("PromoCarouselModel", ModelLifecycle.SharedInstance, createPromoCarouselModel);
const PromoCarouselModelContext = createContext();
function usePromoCarouselContext() {
  const context = useContext(PromoCarouselModelContext);
  if (!context) {
    throw new Error("usePromoCarouselContext: Cannot find context!");
  }
  return context;
}

export { PromoCarouselModel, PromoCarouselModelContext, createPromoCarouselModel, usePromoCarouselContext };
//# sourceMappingURL=main-menu-carousel-model.js.map
