import { addLocaleData } from 'react-intl';
import * as enLocateData from 'react-intl/locale-data/en';
import * as viLocateData from 'react-intl/locale-data/vi';

addLocaleData(enLocateData);
addLocaleData(viLocateData);

export const appLocales = ['en', 'vi'];

const enTranslationMessages = require('app/translations/en.json');
const viTranslationMessages = require('app/translations/vi.json');

export const formatTranslationMessages = (messages) => {
    const formattedMessages = {};
    for (const message of messages) {
        formattedMessages[message.id] = message.message || message.defaultMessage;
    }

    return formattedMessages;
};

export const translationMessages = {
    en: formatTranslationMessages(enTranslationMessages),
    de: formatTranslationMessages(viTranslationMessages),
};