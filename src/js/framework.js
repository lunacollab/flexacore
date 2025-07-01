/**
 * FlexaCore Framework
 * Complete UI Framework with CDN Support
 * Version: 2.0.0
 */

(function(window, document) {
    'use strict';

    // Load core engine first
    if (typeof FlexaCoreEngine === 'undefined') {
        console.error('FlexaCore Engine not loaded');
        return;
    }

    // Framework class
    class FlexaCoreFramework {
        constructor() {
            this.version = '2.0.0';
            this.engine = window.flexacore;
            this.initialized = false;
            this.config = {
                autoInit: true,
                debug: false,
                theme: 'default',
                rtl: false,
                locale: 'en',
                components: {
                    modal: true,
                    dropdown: true,
                    tooltip: true,
                    toast: true,
                    tabs: true,
                    switch: true,
                    progress: true,
                    skeleton: true,
                    stepper: true,
                    form: true
                },
                plugins: {
                    'theme-manager': true,
                    'component-manager': true
                }
            };
        }

        // Initialize framework
        init(options = {}) {
            if (this.initialized) {
                this.log('FlexaCore Framework already initialized');
                return this;
            }

            // Merge configuration
            this.config = this.deepMerge(this.config, options);
            
            // Initialize engine with config
            this.engine.init(this.config);
            
            // Load plugins
            this.loadPlugins();
            
            // Set up global API
            this.setupGlobalAPI();
            
            // Add framework class to body
            document.body.classList.add('flexacore-framework');
            
            this.initialized = true;
            
            this.log('FlexaCore Framework initialized successfully');
            
            return this;
        }

        // Load plugins
        loadPlugins() {
            // Load theme manager plugin
            if (this.config.plugins['theme-manager']) {
                this.loadPlugin('theme-manager');
            }
            
            // Load component manager plugin
            if (this.config.plugins['component-manager']) {
                this.loadPlugin('component-manager');
            }
        }

        // Load plugin by name
        loadPlugin(name) {
            let script = document.createElement('script');
            // Kiểm tra nếu đang chạy local thì load từ dist, còn lại thì load từ CDN
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                script.src = `../dist/plugins/${name}.min.js`;
            } else {
                script.src = `https://cdn.flexacore.dev/plugins/${name}.min.js`;
            }
            script.onload = () => {
                this.log(`Plugin \"${name}\" loaded`);
            };
            script.onerror = () => {
                this.error(`Failed to load plugin \"${name}\"`);
            };
            document.head.appendChild(script);
        }

        // Set up global API
        setupGlobalAPI() {
            // Main API
            window.FlexaCore = {
                version: this.version,
                init: this.init.bind(this),
                config: this.config,
                engine: this.engine,
                
                // Theme API
                theme: {
                    apply: (theme) => this.engine.emit('theme-change', { theme }),
                    toggle: () => this.engine.emit('theme-toggle'),
                    get: () => this.engine.getState('theme')
                },
                
                // Component API
                components: {
                    modal: {
                        show: (id) => this.showModal(id),
                        hide: (id) => this.hideModal(id)
                    },
                    toast: {
                        show: (message, type, duration) => this.showToast(message, type, duration)
                    },
                    tabs: {
                        show: (container, tab) => this.showTab(container, tab)
                    }
                },
                
                // Utility API
                utils: {
                    addClass: (element, className) => element.classList.add(className),
                    removeClass: (element, className) => element.classList.remove(className),
                    toggleClass: (element, className) => element.classList.toggle(className),
                    hasClass: (element, className) => element.classList.contains(className),
                    create: (tag, className, innerHTML) => {
                        const el = document.createElement(tag);
                        if (className) el.className = className;
                        if (innerHTML) el.innerHTML = innerHTML;
                        return el;
                    }
                }
            };

            // Shorthand API
            window.FC = {
                init: this.init.bind(this),
                theme: window.FlexaCore.theme,
                components: window.FlexaCore.components,
                utils: window.FlexaCore.utils,
                version: this.version
            };
        }

        // Component methods
        showModal(id) {
            const modal = document.getElementById(id);
            if (modal) {
                modal.classList.add('fc-modal-active');
                document.body.classList.add('fc-modal-open');
            }
        }

        hideModal(id) {
            const modal = document.getElementById(id);
            if (modal) {
                modal.classList.remove('fc-modal-active');
                document.body.classList.remove('fc-modal-open');
            }
        }

        showToast(message, type = 'info', duration = 3000) {
            const container = this.getToastContainer();
            const toast = this.createToast(message, type);
            
            container.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('fc-toast-active');
            }, 100);
            
            setTimeout(() => {
                this.hideToast(toast);
            }, duration);
        }

        getToastContainer() {
            let container = document.getElementById('fc-toast-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'fc-toast-container';
                container.className = 'fc-toast-container';
                document.body.appendChild(container);
            }
            return container;
        }

        createToast(message, type) {
            const toast = document.createElement('div');
            toast.className = `fc-toast fc-toast-${type}`;
            toast.textContent = message;
            return toast;
        }

        hideToast(toast) {
            toast.classList.remove('fc-toast-active');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }

        showTab(container, tab) {
            const tabContainer = typeof container === 'string' ? 
                document.querySelector(container) : container;
            
            if (tabContainer) {
                const tabs = tabContainer.querySelectorAll('[data-fc-tab]');
                const contents = tabContainer.querySelectorAll('[data-fc-tab-content]');
                
                tabs.forEach(t => t.classList.remove('fc-tab-active'));
                contents.forEach(c => c.classList.remove('fc-tab-content-active'));
                
                const activeTab = tabContainer.querySelector(`[data-fc-tab="${tab}"]`);
                const activeContent = tabContainer.querySelector(`[data-fc-tab-content="${tab}"]`);
                
                if (activeTab) activeTab.classList.add('fc-tab-active');
                if (activeContent) activeContent.classList.add('fc-tab-content-active');
            }
        }

        // Utility methods
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

        log(...args) {
            if (this.config.debug) {
                console.log('[FlexaCore Framework]', ...args);
            }
        }

        error(...args) {
            console.error('[FlexaCore Framework]', ...args);
        }
    }

    // Create framework instance
    const framework = new FlexaCoreFramework();

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (framework.config.autoInit) {
                framework.init();
            }
        });
    } else {
        if (framework.config.autoInit) {
            framework.init();
        }
    }

    // Expose framework globally
    window.FlexaCoreFramework = FlexaCoreFramework;

})(window, document); 