/**
 * FlexaCore Core Engine
 * The heart of FlexaCore Framework
 * Version: 2.0.0
 */

(function(window, document) {
    'use strict';

    // Core Engine Class
    class FlexaCoreEngine {
        constructor() {
            this.version = '2.0.0';
            this.plugins = new Map();
            this.components = new Map();
            this.themes = new Map();
            this.config = {
                autoInit: true,
                debug: false,
                theme: 'default',
                rtl: false,
                locale: 'en',
                breakpoints: {
                    xs: 0,
                    sm: 576,
                    md: 768,
                    lg: 992,
                    xl: 1200,
                    xxl: 1400
                },
                colors: {
                    primary: '#007bff',
                    secondary: '#6c757d',
                    success: '#28a745',
                    danger: '#dc3545',
                    warning: '#ffc107',
                    info: '#17a2b8',
                    light: '#f8f9fa',
                    dark: '#343a40'
                },
                spacing: {
                    xs: '0.25rem',
                    sm: '0.5rem',
                    md: '1rem',
                    lg: '1.5rem',
                    xl: '3rem'
                },
                typography: {
                    fontFamily: {
                        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                        serif: ['Georgia', 'Times', 'serif'],
                        mono: ['SFMono-Regular', 'Monaco', 'Consolas', 'monospace']
                    },
                    fontSize: {
                        xs: '0.75rem',
                        sm: '0.875rem',
                        base: '1rem',
                        lg: '1.125rem',
                        xl: '1.25rem',
                        '2xl': '1.5rem',
                        '3xl': '1.875rem',
                        '4xl': '2.25rem'
                    }
                }
            };
            
            this.events = new Map();
            this.state = new Map();
            this.initialized = false;
            
            // Bind methods
            this.init = this.init.bind(this);
            this.registerPlugin = this.registerPlugin.bind(this);
            this.registerComponent = this.registerComponent.bind(this);
            this.registerTheme = this.registerTheme.bind(this);
            this.emit = this.emit.bind(this);
            this.on = this.on.bind(this);
            this.off = this.off.bind(this);
        }

        // Initialize the engine
        init(options = {}) {
            if (this.initialized) {
                this.log('FlexaCore already initialized');
                return this;
            }

            // Merge configuration
            this.config = this.deepMerge(this.config, options);
            
            // Set up global state
            this.state.set('initialized', true);
            this.state.set('theme', this.config.theme);
            this.state.set('rtl', this.config.rtl);
            
            // Initialize core systems
            this.initCore();
            
            // Initialize plugins
            this.initPlugins();
            
            // Initialize components
            this.initComponents();
            
            // Initialize themes
            this.initThemes();
            
            // Set up event listeners
            this.setupEventListeners();
            
            this.initialized = true;
            
            // Emit ready event
            this.emit('ready', { engine: this });
            
            this.log('FlexaCore Engine initialized successfully');
            
            return this;
        }

        // Initialize core systems
        initCore() {
            // Add body class
            document.body.classList.add('flexacore-loaded');
            
            // Set up CSS custom properties
            this.setupCSSProperties();
            
            // Initialize responsive system
            this.initResponsive();
            
            // Initialize accessibility
            this.initAccessibility();
        }

        // Set up CSS custom properties
        setupCSSProperties() {
            const root = document.documentElement;
            
            // Set color variables
            Object.entries(this.config.colors).forEach(([name, value]) => {
                root.style.setProperty(`--fc-${name}`, value);
            });
            
            // Set spacing variables
            Object.entries(this.config.spacing).forEach(([name, value]) => {
                root.style.setProperty(`--fc-spacing-${name}`, value);
            });
            
            // Set typography variables
            Object.entries(this.config.typography.fontSize).forEach(([name, value]) => {
                root.style.setProperty(`--fc-text-${name}`, value);
            });
            
            // Set breakpoint variables
            Object.entries(this.config.breakpoints).forEach(([name, value]) => {
                root.style.setProperty(`--fc-breakpoint-${name}`, `${value}px`);
            });
        }

        // Initialize responsive system
        initResponsive() {
            const mediaQueries = {};
            
            Object.entries(this.config.breakpoints).forEach(([name, value]) => {
                if (value > 0) {
                    mediaQueries[name] = window.matchMedia(`(min-width: ${value}px)`);
                }
            });
            
            this.state.set('mediaQueries', mediaQueries);
            
            // Listen for breakpoint changes
            Object.entries(mediaQueries).forEach(([name, mq]) => {
                mq.addListener(() => {
                    this.emit('breakpoint-change', { breakpoint: name, matches: mq.matches });
                });
            });
        }

        // Initialize accessibility
        initAccessibility() {
            // Add ARIA support
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-navigation');
                }
            });
            
            document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-navigation');
            });
            
            // Focus management
            this.state.set('focusTrap', null);
        }

        // Initialize plugins
        initPlugins() {
            this.plugins.forEach((plugin, name) => {
                if (typeof plugin.init === 'function') {
                    try {
                        plugin.init(this);
                        this.log(`Plugin "${name}" initialized`);
                    } catch (error) {
                        this.error(`Failed to initialize plugin "${name}":`, error);
                    }
                }
            });
        }

        // Initialize components
        initComponents() {
            this.components.forEach((component, name) => {
                if (typeof component.init === 'function') {
                    try {
                        component.init(this);
                        this.log(`Component "${name}" initialized`);
                    } catch (error) {
                        this.error(`Failed to initialize component "${name}":`, error);
                    }
                }
            });
        }

        // Initialize themes
        initThemes() {
            const currentTheme = this.state.get('theme');
            const theme = this.themes.get(currentTheme);
            
            if (theme && typeof theme.apply === 'function') {
                theme.apply(this);
            }
        }

        // Set up event listeners
        setupEventListeners() {
            // Theme change listener
            window.addEventListener('flexacore-theme-change', (e) => {
                this.state.set('theme', e.detail.theme);
                this.emit('theme-change', e.detail);
            });
            
            // RTL change listener
            window.addEventListener('flexacore-rtl-change', (e) => {
                this.state.set('rtl', e.detail.rtl);
                this.emit('rtl-change', e.detail);
            });
        }

        // Plugin system
        registerPlugin(name, plugin) {
            if (this.plugins.has(name)) {
                this.warn(`Plugin "${name}" already registered, overwriting`);
            }
            
            this.plugins.set(name, plugin);
            
            if (this.initialized && typeof plugin.init === 'function') {
                plugin.init(this);
            }
            
            this.log(`Plugin "${name}" registered`);
            return this;
        }

        // Component system
        registerComponent(name, component) {
            if (this.components.has(name)) {
                this.warn(`Component "${name}" already registered, overwriting`);
            }
            
            this.components.set(name, component);
            
            if (this.initialized && typeof component.init === 'function') {
                component.init(this);
            }
            
            this.log(`Component "${name}" registered`);
            return this;
        }

        // Theme system
        registerTheme(name, theme) {
            if (this.themes.has(name)) {
                this.warn(`Theme "${name}" already registered, overwriting`);
            }
            
            this.themes.set(name, theme);
            this.log(`Theme "${name}" registered`);
            return this;
        }

        // Event system
        on(event, callback) {
            if (!this.events.has(event)) {
                this.events.set(event, []);
            }
            this.events.get(event).push(callback);
            return this;
        }

        off(event, callback) {
            if (this.events.has(event)) {
                const callbacks = this.events.get(event);
                const index = callbacks.indexOf(callback);
                if (index > -1) {
                    callbacks.splice(index, 1);
                }
            }
            return this;
        }

        emit(event, data = {}) {
            if (this.events.has(event)) {
                this.events.get(event).forEach(callback => {
                    try {
                        callback(data);
                    } catch (error) {
                        this.error(`Error in event "${event}" callback:`, error);
                    }
                });
            }
            
            // Also dispatch DOM event
            window.dispatchEvent(new CustomEvent(`flexacore-${event}`, { detail: data }));
            
            return this;
        }

        // Utility methods
        getState(key) {
            return this.state.get(key);
        }

        setState(key, value) {
            this.state.set(key, value);
            this.emit('state-change', { key, value });
            return this;
        }

        getConfig(key) {
            return key ? this.config[key] : this.config;
        }

        setConfig(key, value) {
            if (typeof key === 'object') {
                this.config = this.deepMerge(this.config, key);
            } else {
                this.config[key] = value;
            }
            this.emit('config-change', { key, value });
            return this;
        }

        // Deep merge utility
        deepMerge(target, source) {
            const result = { ...target };
            
            for (const key in source) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    result[key] = this.deepMerge(result[key] || {}, source[key]);
                } else {
                    result[key] = source[key];
                }
            }
            
            return result;
        }

        // Logging methods
        log(...args) {
            if (this.config.debug) {
                console.log('[FlexaCore]', ...args);
            }
        }

        warn(...args) {
            if (this.config.debug) {
                console.warn('[FlexaCore]', ...args);
            }
        }

        error(...args) {
            console.error('[FlexaCore]', ...args);
        }

        // Public API
        getAPI() {
            return {
                version: this.version,
                init: this.init.bind(this),
                registerPlugin: this.registerPlugin.bind(this),
                registerComponent: this.registerComponent.bind(this),
                registerTheme: this.registerTheme.bind(this),
                on: this.on.bind(this),
                off: this.off.bind(this),
                emit: this.emit.bind(this),
                getState: this.getState.bind(this),
                setState: this.setState.bind(this),
                getConfig: this.getConfig.bind(this),
                setConfig: this.setConfig.bind(this),
                plugins: this.plugins,
                components: this.components,
                themes: this.themes
            };
        }
    }

    // Create global instance
    window.FlexaCoreEngine = FlexaCoreEngine;
    window.flexacore = new FlexaCoreEngine();

})(window, document); 