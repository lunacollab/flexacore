/**
 * FlexaCore Theme Manager Plugin
 * Advanced theme management with dynamic switching
 * Version: 2.0.0
 */

(function(window, document) {
    'use strict';

    class ThemeManagerPlugin {
        constructor() {
            this.name = 'theme-manager';
            this.version = '2.0.0';
            this.currentTheme = 'default';
            this.themes = new Map();
            this.engine = null;
        }

        init(engine) {
            this.engine = engine;
            
            // Register default themes
            this.registerDefaultThemes();
            
            // Initialize theme system
            this.initThemeSystem();
            
            // Set up theme switching
            this.setupThemeSwitching();
            
            // Apply saved theme
            this.applySavedTheme();
            
            this.engine.log('Theme Manager Plugin initialized');
        }

        registerDefaultThemes() {
            // Default theme
            this.registerTheme('default', {
                name: 'Default',
                colors: {
                    primary: '#007bff',
                    secondary: '#6c757d',
                    success: '#28a745',
                    danger: '#dc3545',
                    warning: '#ffc107',
                    info: '#17a2b8',
                    light: '#f8f9fa',
                    dark: '#343a40',
                    background: '#ffffff',
                    surface: '#ffffff',
                    text: '#212529',
                    textSecondary: '#6c757d',
                    border: '#dee2e6',
                    shadow: 'rgba(0, 0, 0, 0.1)'
                },
                typography: {
                    fontFamily: 'sans',
                    fontSize: 'base',
                    lineHeight: 1.5
                },
                spacing: {
                    base: '1rem',
                    small: '0.5rem',
                    large: '1.5rem'
                },
                borderRadius: {
                    small: '0.25rem',
                    base: '0.375rem',
                    large: '0.5rem'
                },
                shadows: {
                    small: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    base: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    large: '0 10px 15px rgba(0, 0, 0, 0.1)'
                }
            });

            // Dark theme
            this.registerTheme('dark', {
                name: 'Dark',
                colors: {
                    primary: '#0d6efd',
                    secondary: '#6c757d',
                    success: '#198754',
                    danger: '#dc3545',
                    warning: '#ffc107',
                    info: '#0dcaf0',
                    light: '#212529',
                    dark: '#f8f9fa',
                    background: '#121212',
                    surface: '#1e1e1e',
                    text: '#ffffff',
                    textSecondary: '#adb5bd',
                    border: '#343a40',
                    shadow: 'rgba(0, 0, 0, 0.3)'
                },
                typography: {
                    fontFamily: 'sans',
                    fontSize: 'base',
                    lineHeight: 1.5
                },
                spacing: {
                    base: '1rem',
                    small: '0.5rem',
                    large: '1.5rem'
                },
                borderRadius: {
                    small: '0.25rem',
                    base: '0.375rem',
                    large: '0.5rem'
                },
                shadows: {
                    small: '0 1px 3px rgba(0, 0, 0, 0.3)',
                    base: '0 4px 6px rgba(0, 0, 0, 0.3)',
                    large: '0 10px 15px rgba(0, 0, 0, 0.3)'
                }
            });

            // Light theme
            this.registerTheme('light', {
                name: 'Light',
                colors: {
                    primary: '#0d6efd',
                    secondary: '#6c757d',
                    success: '#198754',
                    danger: '#dc3545',
                    warning: '#ffc107',
                    info: '#0dcaf0',
                    light: '#f8f9fa',
                    dark: '#212529',
                    background: '#ffffff',
                    surface: '#f8f9fa',
                    text: '#212529',
                    textSecondary: '#6c757d',
                    border: '#dee2e6',
                    shadow: 'rgba(0, 0, 0, 0.05)'
                },
                typography: {
                    fontFamily: 'sans',
                    fontSize: 'base',
                    lineHeight: 1.6
                },
                spacing: {
                    base: '1rem',
                    small: '0.5rem',
                    large: '1.5rem'
                },
                borderRadius: {
                    small: '0.25rem',
                    base: '0.375rem',
                    large: '0.5rem'
                },
                shadows: {
                    small: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    base: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    large: '0 10px 15px rgba(0, 0, 0, 0.05)'
                }
            });

            // High contrast theme
            this.registerTheme('high-contrast', {
                name: 'High Contrast',
                colors: {
                    primary: '#000000',
                    secondary: '#333333',
                    success: '#006600',
                    danger: '#cc0000',
                    warning: '#cc6600',
                    info: '#0066cc',
                    light: '#ffffff',
                    dark: '#000000',
                    background: '#ffffff',
                    surface: '#ffffff',
                    text: '#000000',
                    textSecondary: '#333333',
                    border: '#000000',
                    shadow: 'rgba(0, 0, 0, 0.5)'
                },
                typography: {
                    fontFamily: 'sans',
                    fontSize: 'lg',
                    lineHeight: 1.4
                },
                spacing: {
                    base: '1.25rem',
                    small: '0.75rem',
                    large: '2rem'
                },
                borderRadius: {
                    small: '0',
                    base: '0',
                    large: '0'
                },
                shadows: {
                    small: '2px 2px 0 rgba(0, 0, 0, 0.5)',
                    base: '4px 4px 0 rgba(0, 0, 0, 0.5)',
                    large: '6px 6px 0 rgba(0, 0, 0, 0.5)'
                }
            });
        }

        initThemeSystem() {
            // Create theme stylesheet
            this.createThemeStylesheet();
            
            // Set up theme observer
            this.setupThemeObserver();
        }

        createThemeStylesheet() {
            const style = document.createElement('style');
            style.id = 'flexacore-theme-styles';
            document.head.appendChild(style);
            this.themeStylesheet = style;
        }

        setupThemeObserver() {
            // Observe theme changes
            this.engine.on('theme-change', (data) => {
                this.applyTheme(data.theme);
            });

            // Observe RTL changes
            this.engine.on('rtl-change', (data) => {
                this.applyRTL(data.rtl);
            });
        }

        setupThemeSwitching() {
            // Auto-detect system theme preference
            this.detectSystemTheme();
            
            // Set up theme toggle buttons
            this.setupThemeToggles();
            
            // Set up keyboard shortcuts
            this.setupKeyboardShortcuts();
        }

        detectSystemTheme() {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            const handleChange = (e) => {
                const systemTheme = e.matches ? 'dark' : 'light';
                if (this.currentTheme === 'auto') {
                    this.applyTheme(systemTheme);
                }
            };
            
            mediaQuery.addListener(handleChange);
            
            // Set initial auto theme
            if (this.currentTheme === 'auto') {
                handleChange(mediaQuery);
            }
        }

        setupThemeToggles() {
            // Find theme toggle buttons
            document.addEventListener('click', (e) => {
                if (e.target.matches('[data-fc-theme-toggle]')) {
                    e.preventDefault();
                    this.toggleTheme();
                }
                
                if (e.target.matches('[data-fc-theme]')) {
                    e.preventDefault();
                    const theme = e.target.getAttribute('data-fc-theme');
                    this.applyTheme(theme);
                }
            });
        }

        setupKeyboardShortcuts() {
            document.addEventListener('keydown', (e) => {
                // Ctrl/Cmd + T to toggle theme
                if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                    e.preventDefault();
                    this.toggleTheme();
                }
                
                // Ctrl/Cmd + D for dark theme
                if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                    e.preventDefault();
                    this.applyTheme('dark');
                }
                
                // Ctrl/Cmd + L for light theme
                if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                    e.preventDefault();
                    this.applyTheme('light');
                }
            });
        }

        applySavedTheme() {
            const savedTheme = localStorage.getItem('flexacore-theme') || 'default';
            this.applyTheme(savedTheme);
        }

        registerTheme(name, theme) {
            this.themes.set(name, {
                ...theme,
                name: theme.name || name
            });
            
            this.engine.log(`Theme "${name}" registered`);
        }

        applyTheme(themeName) {
            const theme = this.themes.get(themeName);
            
            if (!theme) {
                this.engine.warn(`Theme "${themeName}" not found`);
                return;
            }

            this.currentTheme = themeName;
            
            // Update CSS custom properties
            this.updateCSSProperties(theme);
            
            // Update body classes
            this.updateBodyClasses(themeName);
            
            // Save to localStorage
            localStorage.setItem('flexacore-theme', themeName);
            
            // Update engine state
            this.engine.setState('theme', themeName);
            
            // Emit theme change event
            this.engine.emit('theme-change', { theme: themeName, themeData: theme });
            
            this.engine.log(`Theme "${themeName}" applied`);
        }

        updateCSSProperties(theme) {
            const root = document.documentElement;
            
            // Update color properties
            Object.entries(theme.colors).forEach(([name, value]) => {
                root.style.setProperty(`--fc-${name}`, value);
            });
            
            // Update typography properties
            Object.entries(theme.typography).forEach(([name, value]) => {
                if (name === 'fontFamily') {
                    const fontFamily = this.engine.getConfig('typography.fontFamily')[value];
                    root.style.setProperty(`--fc-font-family`, fontFamily.join(', '));
                } else {
                    root.style.setProperty(`--fc-${name}`, value);
                }
            });
            
            // Update spacing properties
            Object.entries(theme.spacing).forEach(([name, value]) => {
                root.style.setProperty(`--fc-spacing-${name}`, value);
            });
            
            // Update border radius properties
            Object.entries(theme.borderRadius).forEach(([name, value]) => {
                root.style.setProperty(`--fc-radius-${name}`, value);
            });
            
            // Update shadow properties
            Object.entries(theme.shadows).forEach(([name, value]) => {
                root.style.setProperty(`--fc-shadow-${name}`, value);
            });
        }

        updateBodyClasses(themeName) {
            const body = document.body;
            
            // Remove all theme classes
            this.themes.forEach((theme, name) => {
                body.classList.remove(`theme-${name}`);
            });
            
            // Add current theme class
            if (themeName !== 'default') {
                body.classList.add(`theme-${themeName}`);
            }
        }

        applyRTL(rtl) {
            const body = document.body;
            
            if (rtl) {
                body.classList.add('rtl');
                body.setAttribute('dir', 'rtl');
            } else {
                body.classList.remove('rtl');
                body.setAttribute('dir', 'ltr');
            }
            
            this.engine.setState('rtl', rtl);
        }

        toggleTheme() {
            const themes = ['default', 'light', 'dark'];
            const currentIndex = themes.indexOf(this.currentTheme);
            const nextIndex = (currentIndex + 1) % themes.length;
            this.applyTheme(themes[nextIndex]);
        }

        getCurrentTheme() {
            return this.currentTheme;
        }

        getTheme(name) {
            return this.themes.get(name);
        }

        getAllThemes() {
            return Array.from(this.themes.entries());
        }

        // Public API
        getAPI() {
            return {
                applyTheme: this.applyTheme.bind(this),
                toggleTheme: this.toggleTheme.bind(this),
                getCurrentTheme: this.getCurrentTheme.bind(this),
                getTheme: this.getTheme.bind(this),
                getAllThemes: this.getAllThemes.bind(this),
                registerTheme: this.registerTheme.bind(this)
            };
        }
    }

    // Register plugin with engine
    if (window.flexacore) {
        const plugin = new ThemeManagerPlugin();
        window.flexacore.registerPlugin('theme-manager', plugin);
        
        // Expose theme API globally
        window.FCTheme = plugin.getAPI();
    }

})(window, document); 