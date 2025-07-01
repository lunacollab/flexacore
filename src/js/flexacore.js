/**
 * FlexaCore CDN JavaScript API
 * Version: 1.0.2
 * A powerful, flexible CSS/UI library with JavaScript enhancements
 */

(function(window, document) {
    'use strict';

    // FlexaCore namespace
    window.FlexaCore = window.FlexaCore || {};

    // Configuration
    const config = {
        version: '1.0.2',
        theme: 'default',
        rtl: false,
        autoInit: true,
        components: {
            modal: true,
            dropdown: true,
            tooltip: true,
            toast: true,
            tabs: true,
            switch: true,
            progress: true,
            skeleton: true,
            stepper: true
        }
    };

    // Utility functions
    const utils = {
        // Check if element exists
        exists: (selector) => document.querySelector(selector) !== null,

        // Get all elements
        all: (selector) => Array.from(document.querySelectorAll(selector)),

        // Add event listener with delegation
        on: (element, event, selector, handler) => {
            element.addEventListener(event, (e) => {
                if (e.target.matches(selector)) {
                    handler(e);
                }
            });
        },

        // Add/remove classes
        addClass: (element, className) => element.classList.add(className),
        removeClass: (element, className) => element.classList.remove(className),
        toggleClass: (element, className) => element.classList.toggle(className),
        hasClass: (element, className) => element.classList.contains(className),

        // Get/set attributes
        getAttr: (element, attr) => element.getAttribute(attr),
        setAttr: (element, attr, value) => element.setAttribute(attr, value),

        // Create element
        create: (tag, className = '', innerHTML = '') => {
            const el = document.createElement(tag);
            if (className) el.className = className;
            if (innerHTML) el.innerHTML = innerHTML;
            return el;
        },

        // Debounce function
        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    };

    // Theme management
    const ThemeManager = {
        current: 'default',
        
        init() {
            this.current = localStorage.getItem('flexacore-theme') || 'default';
            this.apply(this.current);
        },

        apply(theme) {
            const themes = ['default', 'dark', 'rtl'];
            const body = document.body;
            
            // Remove all theme classes
            themes.forEach(t => body.classList.remove(`theme-${t}`));
            
            // Add current theme
            if (theme !== 'default') {
                body.classList.add(`theme-${theme}`);
            }
            
            this.current = theme;
            localStorage.setItem('flexacore-theme', theme);
            
            // Dispatch theme change event
            window.dispatchEvent(new CustomEvent('flexacore-theme-change', { 
                detail: { theme } 
            }));
        },

        toggle() {
            const themes = ['default', 'dark'];
            const currentIndex = themes.indexOf(this.current);
            const nextIndex = (currentIndex + 1) % themes.length;
            this.apply(themes[nextIndex]);
        },

        get() {
            return this.current;
        }
    };

    // Component initializers
    const Components = {
        // Modal component
        initModal() {
            utils.all('[data-fc-modal]').forEach(modal => {
                const trigger = document.querySelector(`[data-fc-modal-trigger="${modal.id}"]`);
                const closeBtn = modal.querySelector('[data-fc-modal-close]');
                
                if (trigger) {
                    trigger.addEventListener('click', () => this.showModal(modal));
                }
                
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => this.hideModal(modal));
                }
                
                // Close on backdrop click
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) this.hideModal(modal);
                });
            });
        },

        showModal(modal) {
            utils.addClass(modal, 'fc-modal-active');
            utils.addClass(document.body, 'fc-modal-open');
        },

        hideModal(modal) {
            utils.removeClass(modal, 'fc-modal-active');
            utils.removeClass(document.body, 'fc-modal-open');
        },

        // Dropdown component
        initDropdown() {
            utils.all('[data-fc-dropdown]').forEach(dropdown => {
                const trigger = dropdown.querySelector('[data-fc-dropdown-trigger]');
                const menu = dropdown.querySelector('[data-fc-dropdown-menu]');
                
                if (trigger && menu) {
                    trigger.addEventListener('click', (e) => {
                        e.stopPropagation();
                        utils.toggleClass(menu, 'fc-dropdown-active');
                    });
                }
            });
            
            // Close dropdowns when clicking outside
            document.addEventListener('click', () => {
                utils.all('.fc-dropdown-active').forEach(menu => {
                    utils.removeClass(menu, 'fc-dropdown-active');
                });
            });
        },

        // Tooltip component
        initTooltip() {
            utils.all('[data-fc-tooltip]').forEach(element => {
                const tooltip = utils.create('div', 'fc-tooltip', element.getAttribute('data-fc-tooltip'));
                document.body.appendChild(tooltip);
                
                element.addEventListener('mouseenter', () => this.showTooltip(element, tooltip));
                element.addEventListener('mouseleave', () => this.hideTooltip(tooltip));
            });
        },

        showTooltip(element, tooltip) {
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
            utils.addClass(tooltip, 'fc-tooltip-active');
        },

        hideTooltip(tooltip) {
            utils.removeClass(tooltip, 'fc-tooltip-active');
        },

        // Toast component
        initToast() {
            if (!utils.exists('#fc-toast-container')) {
                const container = utils.create('div', 'fc-toast-container', '');
                container.id = 'fc-toast-container';
                document.body.appendChild(container);
            }
        },

        showToast(message, type = 'info', duration = 3000) {
            const container = document.getElementById('fc-toast-container');
            const toast = utils.create('div', `fc-toast fc-toast-${type}`, message);
            
            container.appendChild(toast);
            
            setTimeout(() => {
                utils.addClass(toast, 'fc-toast-active');
            }, 100);
            
            setTimeout(() => {
                utils.removeClass(toast, 'fc-toast-active');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            }, duration);
        },

        // Tabs component
        initTabs() {
            utils.all('[data-fc-tabs]').forEach(tabContainer => {
                const tabs = tabContainer.querySelectorAll('[data-fc-tab]');
                const contents = tabContainer.querySelectorAll('[data-fc-tab-content]');
                
                tabs.forEach(tab => {
                    tab.addEventListener('click', () => {
                        const target = tab.getAttribute('data-fc-tab');
                        
                        // Remove active class from all tabs and contents
                        tabs.forEach(t => utils.removeClass(t, 'fc-tab-active'));
                        contents.forEach(c => utils.removeClass(c, 'fc-tab-content-active'));
                        
                        // Add active class to current tab and content
                        utils.addClass(tab, 'fc-tab-active');
                        const content = tabContainer.querySelector(`[data-fc-tab-content="${target}"]`);
                        if (content) utils.addClass(content, 'fc-tab-content-active');
                    });
                });
                
                // Activate first tab by default
                if (tabs.length > 0) tabs[0].click();
            });
        },

        // Switch component
        initSwitch() {
            utils.all('[data-fc-switch]').forEach(switchEl => {
                const input = switchEl.querySelector('input[type="checkbox"]');
                if (input) {
                    input.addEventListener('change', () => {
                        utils.toggleClass(switchEl, 'fc-switch-active', input.checked);
                    });
                }
            });
        },

        // Progress component
        initProgress() {
            utils.all('[data-fc-progress]').forEach(progress => {
                const value = progress.getAttribute('data-fc-progress') || 0;
                const bar = progress.querySelector('.fc-progress-bar');
                if (bar) {
                    bar.style.width = `${value}%`;
                }
            });
        },

        // Skeleton component
        initSkeleton() {
            utils.all('[data-fc-skeleton]').forEach(skeleton => {
                const type = skeleton.getAttribute('data-fc-skeleton') || 'text';
                utils.addClass(skeleton, `fc-skeleton-${type}`);
            });
        },

        // Stepper component
        initStepper() {
            utils.all('[data-fc-stepper]').forEach(stepper => {
                const steps = stepper.querySelectorAll('[data-fc-step]');
                const nextBtn = stepper.querySelector('[data-fc-stepper-next]');
                const prevBtn = stepper.querySelector('[data-fc-stepper-prev]');
                
                let currentStep = 0;
                
                const showStep = (index) => {
                    steps.forEach((step, i) => {
                        if (i === index) {
                            utils.addClass(step, 'fc-step-active');
                        } else {
                            utils.removeClass(step, 'fc-step-active');
                        }
                    });
                };
                
                if (nextBtn) {
                    nextBtn.addEventListener('click', () => {
                        if (currentStep < steps.length - 1) {
                            currentStep++;
                            showStep(currentStep);
                        }
                    });
                }
                
                if (prevBtn) {
                    prevBtn.addEventListener('click', () => {
                        if (currentStep > 0) {
                            currentStep--;
                            showStep(currentStep);
                        }
                    });
                }
                
                // Show first step by default
                showStep(0);
            });
        }
    };

    // Public API
    const API = {
        // Initialize FlexaCore
        init(options = {}) {
            // Merge options with default config
            Object.assign(config, options);
            
            // Initialize theme
            ThemeManager.init();
            
            // Initialize components if autoInit is enabled
            if (config.autoInit) {
                this.initComponents();
            }
            
            // Dispatch ready event
            window.dispatchEvent(new CustomEvent('flexacore-ready'));
            
            return this;
        },

        // Initialize all components
        initComponents() {
            if (config.components.modal) Components.initModal();
            if (config.components.dropdown) Components.initDropdown();
            if (config.components.tooltip) Components.initTooltip();
            if (config.components.toast) Components.initToast();
            if (config.components.tabs) Components.initTabs();
            if (config.components.switch) Components.initSwitch();
            if (config.components.progress) Components.initProgress();
            if (config.components.skeleton) Components.initSkeleton();
            if (config.components.stepper) Components.initStepper();
        },

        // Theme management
        theme: {
            apply: (theme) => ThemeManager.apply(theme),
            toggle: () => ThemeManager.toggle(),
            get: () => ThemeManager.get()
        },

        // Component methods
        modal: {
            show: (modal) => Components.showModal(modal),
            hide: (modal) => Components.hideModal(modal)
        },

        toast: {
            show: (message, type, duration) => Components.showToast(message, type, duration)
        },

        // Utility methods
        utils: utils,

        // Configuration
        config: config,

        // Version
        version: config.version
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => API.init());
    } else {
        API.init();
    }

    // Expose API globally
    window.FlexaCore = API;

    // Shorthand for common methods
    window.FC = {
        init: API.init.bind(API),
        theme: API.theme,
        modal: API.modal,
        toast: API.toast,
        utils: API.utils,
        version: API.version
    };

})(window, document); 