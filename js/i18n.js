/**
 * BruxControl i18n - Internationalization System
 * Lightweight client-side translation system
 */

const I18n = {
    currentLang: 'es',
    translations: {},
    supportedLangs: ['es', 'en', 'fr', 'de', 'it', 'pt', 'ja'],

    /**
     * Initialize the i18n system
     */
    async init() {
        // Detect preferred language
        this.currentLang = this.detectLanguage();

        // Load translations
        await this.loadTranslations(this.currentLang);

        // Apply translations to DOM
        this.applyTranslations();

        // Setup language switcher
        this.setupLanguageSwitcher();

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
    },

    /**
     * Detect user's preferred language
     */
    detectLanguage() {
        // 1. Check URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && this.supportedLangs.includes(urlLang)) {
            localStorage.setItem('bruxcontrol_lang', urlLang);
            return urlLang;
        }

        // 2. Check localStorage
        const savedLang = localStorage.getItem('bruxcontrol_lang');
        if (savedLang && this.supportedLangs.includes(savedLang)) {
            return savedLang;
        }

        // 3. Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (this.supportedLangs.includes(browserLang)) {
            return browserLang;
        }

        // 4. Default to Spanish
        return 'es';
    },

    /**
     * Load translations for a language
     */
    async loadTranslations(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) throw new Error(`Failed to load ${lang}`);
            this.translations = await response.json();
            this.currentLang = lang;
            localStorage.setItem('bruxcontrol_lang', lang);
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to Spanish
            if (lang !== 'es') {
                await this.loadTranslations('es');
            }
        }
    },

    /**
     * Get a translation by key (supports nested keys like "nav.features")
     */
    t(key, fallback = '') {
        const keys = key.split('.');
        let value = this.translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return fallback || key;
            }
        }

        return value || fallback || key;
    },

    /**
     * Apply translations to all elements with data-i18n attribute
     */
    applyTranslations() {
        // Translate text content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation) {
                el.textContent = translation;
            }
        });

        // Translate HTML content (for elements that contain HTML)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            const translation = this.t(key);
            if (translation) {
                el.innerHTML = translation;
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const translation = this.t(key);
            if (translation) {
                el.placeholder = translation;
            }
        });

        // Translate alt attributes
        document.querySelectorAll('[data-i18n-alt]').forEach(el => {
            const key = el.getAttribute('data-i18n-alt');
            const translation = this.t(key);
            if (translation) {
                el.alt = translation;
            }
        });

        // Translate aria-labels
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            const translation = this.t(key);
            if (translation) {
                el.setAttribute('aria-label', translation);
            }
        });

        // Update meta tags
        this.updateMetaTags();

        // Update active language in switcher
        this.updateLanguageSwitcher();
    },

    /**
     * Update meta tags with translations
     */
    updateMetaTags() {
        // Title
        document.title = this.t('meta.title');

        // Description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.content = this.t('meta.description');

        // Keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) metaKeywords.content = this.t('meta.keywords');

        // Open Graph
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.content = this.t('meta.og_title');

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.content = this.t('meta.og_description');

        // Twitter
        const twTitle = document.querySelector('meta[name="twitter:title"]');
        if (twTitle) twTitle.content = this.t('meta.twitter_title');

        const twDesc = document.querySelector('meta[name="twitter:description"]');
        if (twDesc) twDesc.content = this.t('meta.twitter_description');
    },

    /**
     * Setup language switcher UI
     */
    setupLanguageSwitcher() {
        const switcher = document.getElementById('lang-switcher');
        if (!switcher) return;

        switcher.addEventListener('change', async (e) => {
            const newLang = e.target.value;
            await this.changeLanguage(newLang);
        });
    },

    /**
     * Update language switcher to show current language
     */
    updateLanguageSwitcher() {
        const switcher = document.getElementById('lang-switcher');
        if (switcher) {
            switcher.value = this.currentLang;
        }

        // Update flag/label if using custom switcher
        const langLabel = document.getElementById('current-lang');
        if (langLabel) {
            langLabel.textContent = this.t('lang_name');
        }
    },

    /**
     * Change language
     */
    async changeLanguage(lang) {
        if (!this.supportedLangs.includes(lang)) return;

        await this.loadTranslations(lang);
        this.applyTranslations();
        document.documentElement.lang = lang;

        // Update URL without reload (optional)
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url);
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    I18n.init();
});

// Export for use in other scripts
window.I18n = I18n;
