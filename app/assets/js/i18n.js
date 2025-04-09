import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .init({
    lng: localStorage.getItem('makix-l-page-lang') || 'fr',
    fallbackLng: 'fr',
    backend: {
        loadPath: '/locales/{{lng}}.json', // Path to JSON files
    },
    interpolation: {
      escapeValue: false,
    },
});

i18n.updateTranslations = () => {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.textContent = i18n.t(key); // Fetch translation using the key
    });
}

i18n.on('loaded', (loaded) => {
	i18n.updateTranslations();
});

i18n.on('languageChanged', () => {
    i18n.updateTranslations();
});
  
i18n.on('failedLoading', (lng, namespace, message) => {
    console.error(`Failed to load ${lng} - ${namespace}:`, message);
});

export default i18n;