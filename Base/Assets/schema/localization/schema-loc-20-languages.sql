
INSERT INTO "Languages" VALUES('en_US','LOC_LANGUAGE_EN_US_NAME',null,2);
INSERT INTO "Languages" VALUES('fr_FR','LOC_LANGUAGE_FR_FR_NAME',null,3);
INSERT INTO "Languages" VALUES('de_DE','LOC_LANGUAGE_DE_DE_NAME',null,2);
INSERT INTO "Languages" VALUES('it_IT','LOC_LANGUAGE_IT_IT_NAME',null,2);
INSERT INTO "Languages" VALUES('es_ES','LOC_LANGUAGE_ES_ES_NAME',null,2);
INSERT INTO "Languages" VALUES('ja_JP','LOC_LANGUAGE_JA_JP_NAME',null,1);
INSERT INTO "Languages" VALUES('ru_RU','LOC_LANGUAGE_RU_RU_NAME',null,8);
INSERT INTO "Languages" VALUES('pt_BR','LOC_LANGUAGE_PT_BR_NAME',null,3);
INSERT INTO "Languages" VALUES('pl_PL','LOC_LANGUAGE_PL_PL_NAME',null,10);
INSERT INTO "Languages" VALUES('ko_KR','LOC_LANGUAGE_KO_KR_NAME',null,1);
INSERT INTO "Languages" VALUES('zh_Hans_CN','LOC_LANGUAGE_ZH_HANS_CN_NAME',null,1);
INSERT INTO "Languages" VALUES('zh_Hant_HK','LOC_LANGUAGE_ZH_HANT_HK_NAME',null,1);
INSERT INTO "Languages" VALUES('th_TH','LOC_LANGUAGE_TH_TH_NAME',null,1);

INSERT INTO "AudioLanguages" VALUES('English(US)', 'LOC_LANGUAGE_EN_US_NAME');
INSERT INTO "AudioLanguages" VALUES('French', 'LOC_LANGUAGE_FR_FR_NAME');
INSERT INTO "AudioLanguages" VALUES('German', 'LOC_LANGUAGE_DE_DE_NAME');
INSERT INTO "AudioLanguages" VALUES('Italian', 'LOC_LANGUAGE_IT_IT_NAME');
INSERT INTO "AudioLanguages" VALUES('Spanish', 'LOC_LANGUAGE_ES_ES_NAME');
INSERT INTO "AudioLanguages" VALUES('Japanese', 'LOC_LANGUAGE_JA_JP_NAME');
INSERT INTO "AudioLanguages" VALUES('Russian', 'LOC_LANGUAGE_RU_RU_NAME');
INSERT INTO "AudioLanguages" VALUES('Polish', 'LOC_LANGUAGE_PL_PL_NAME');
INSERT INTO "AudioLanguages" VALUES('Korean', 'LOC_LANGUAGE_KO_KR_NAME');
INSERT INTO "AudioLanguages" VALUES('Chinese(Simplified)', 'LOC_LANGUAGE_ZH_HANS_CN_NAME');
INSERT INTO "AudioLanguages" VALUES('Chinese(Traditional)', 'LOC_LANGUAGE_ZH_HANT_HK_NAME');

INSERT INTO "DefaultAudioLanguages" VALUES('en_US','English(US)');
INSERT INTO "DefaultAudioLanguages" VALUES('fr_FR','French');
INSERT INTO "DefaultAudioLanguages" VALUES('de_DE','German');
INSERT INTO "DefaultAudioLanguages" VALUES('it_IT','Italian');
INSERT INTO "DefaultAudioLanguages" VALUES('es_ES','Spanish');
INSERT INTO "DefaultAudioLanguages" VALUES('ja_JP','Japanese');
INSERT INTO "DefaultAudioLanguages" VALUES('ru_RU','Russian');
INSERT INTO "DefaultAudioLanguages" VALUES('pl_PL','Polish');
INSERT INTO "DefaultAudioLanguages" VALUES('ko_KR','Korean');
INSERT INTO "DefaultAudioLanguages" VALUES('zh_Hans_CN','Chinese(Simplified)');
INSERT INTO "DefaultAudioLanguages" VALUES('zh_Hant_HK','Chinese(Traditional)');

INSERT INTO "LanguagePriorities" VALUES('en_US','en_US',100);

INSERT INTO "LanguagePriorities" VALUES('fr_FR','fr_FR',100);
INSERT INTO "LanguagePriorities" VALUES('fr_FR','en_US',50);

INSERT INTO "LanguagePriorities" VALUES('de_DE','de_DE',100);
INSERT INTO "LanguagePriorities" VALUES('de_DE','en_US',50);

INSERT INTO "LanguagePriorities" VALUES('it_IT','it_IT',100);
INSERT INTO "LanguagePriorities" VALUES('it_IT','en_US',50);

INSERT INTO "LanguagePriorities" VALUES('es_ES','es_ES',100);
INSERT INTO "LanguagePriorities" VALUES('es_ES','en_US',50);

INSERT INTO "LanguagePriorities" VALUES('ja_JP','ja_JP',100);
INSERT INTO "LanguagePriorities" VALUES('ja_JP','en_US',50);

INSERT INTO "LanguagePriorities" VALUES('ru_RU','ru_RU',100);
INSERT INTO "LanguagePriorities" VALUES('ru_RU','en_US',50);

INSERT INTO "LanguagePriorities" VALUES('pt_BR','pt_BR',100);
INSERT INTO "LanguagePriorities" VALUES('pt_BR','en_US',50);

INSERT INTO "LanguagePriorities" VALUES('pl_PL','pl_PL',100);
INSERT INTO "LanguagePriorities" VALUES('pl_PL','en_US',50);

INSERT INTO "LanguagePriorities" VALUES('ko_KR','ko_KR',100);
INSERT INTO "LanguagePriorities" VALUES('ko_KR','en_US',50);

INSERT INTO "LanguagePriorities" VALUES('zh_Hans_CN','zh_Hans_CN',100);
INSERT INTO "LanguagePriorities" VALUES('zh_Hans_CN','en_US',50);

INSERT INTO "LanguagePriorities" VALUES('zh_Hant_HK','zh_Hant_HK',100);
INSERT INTO "LanguagePriorities" VALUES('zh_Hant_HK','en_US',50);

INSERT INTO "LanguagePriorities" VALUES('th_TH','th_TH',100);
INSERT INTO "LanguagePriorities" VALUES('th_TH','en_US',50);