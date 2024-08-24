import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

const i18n = new I18n({
    en: {
        pickAnImage: "Pick an image from camera roll",
    },
    ru: {
        pickAnImage: "Выберите фото из галереи",
    },
  });

// get device locale with fallback to en:
i18n.locale = getLocales()[0].languageCode || 'en';

export {i18n};