/**
 * FlexaCore Component Manager Plugin
 * Advanced component management with auto-initialization
 * Version: 2.0.0
 */

(function(window, document) {
    'use strict';

    // Component Base Class
    class BaseComponent {
        constructor(element, options, engine) {
            this.element = element;
            this.options = options;
            this.engine = engine;
            this.initialized = false;
            this.events = new Map();
            
            this.init();
        }

        init() {
            this.initialized = true;
            this.setupEventListeners();
        }

        setupEventListeners() {
            // Override in subclasses
        }

        destroy() {
            this.initialized = false;
            this.events.forEach((listener, event) => {
                this.element.removeEventListener(event, listener);
            });
            this.events.clear();
        }

        on(event, callback) {
            this.events.set(event, callback);
            this.element.addEventListener(event, callback);
        }

        emit(event, data = {}) {
            this.element.dispatchEvent(new CustomEvent(`fc-${event}`, { 
                detail: { ...data, component: this } 
            }));
        }
    }

    // Modal Component
    class ModalComponent extends BaseComponent {
        setupEventListeners() {
            const trigger = document.querySelector(`[data-fc-modal-trigger="${this.element.id}"]`);
            const closeBtn = this.element.querySelector('[data-fc-modal-close]');
            
            if (trigger) {
                this.on('click', (e) => {
                    if (e.target === trigger) {
                        this.show();
                    }
                });
            }
            
            if (closeBtn) {
                this.on('click', (e) => {
                    if (e.target === closeBtn) {
                        this.hide();
                    }
                });
            }
            
            // Close on backdrop click
            this.on('click', (e) => {
                if (e.target === this.element) {
                    this.hide();
                }
            });
        }

        show() {
            this.element.classList.add('fc-modal-active');
            document.body.classList.add('fc-modal-open');
            this.emit('show');
        }

        hide() {
            this.element.classList.remove('fc-modal-active');
            document.body.classList.remove('fc-modal-open');
            this.emit('hide');
        }
    }

    // Dropdown Component
    class DropdownComponent extends BaseComponent {
        setupEventListeners() {
            const trigger = this.element.querySelector('[data-fc-dropdown-trigger]');
            const menu = this.element.querySelector('[data-fc-dropdown-menu]');
            
            if (trigger && menu) {
                this.on('click', (e) => {
                    if (e.target === trigger) {
                        e.stopPropagation();
                        this.toggle();
                    }
                });
            }
            
            // Close on outside click
            document.addEventListener('click', (e) => {
                if (!this.element.contains(e.target)) {
                    this.hide();
                }
            });
        }

        toggle() {
            const menu = this.element.querySelector('[data-fc-dropdown-menu]');
            if (menu) {
                menu.classList.toggle('fc-dropdown-active');
                this.emit('toggle', { active: menu.classList.contains('fc-dropdown-active') });
            }
        }

        show() {
            const menu = this.element.querySelector('[data-fc-dropdown-menu]');
            if (menu) {
                menu.classList.add('fc-dropdown-active');
                this.emit('show');
            }
        }

        hide() {
            const menu = this.element.querySelector('[data-fc-dropdown-menu]');
            if (menu) {
                menu.classList.remove('fc-dropdown-active');
                this.emit('hide');
            }
        }
    }

    // Tooltip Component
    class TooltipComponent extends BaseComponent {
        setupEventListeners() {
            const tooltip = this.createTooltip();
            
            this.on('mouseenter', () => {
                this.show(tooltip);
            });
            
            this.on('mouseleave', () => {
                this.hide(tooltip);
            });
        }

        createTooltip() {
            const tooltip = document.createElement('div');
            tooltip.className = 'fc-tooltip';
            tooltip.textContent = this.element.getAttribute('data-fc-tooltip');
            document.body.appendChild(tooltip);
            return tooltip;
        }

        show(tooltip) {
            const rect = this.element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
            tooltip.classList.add('fc-tooltip-active');
            this.emit('show');
        }

        hide(tooltip) {
            tooltip.classList.remove('fc-tooltip-active');
            this.emit('hide');
        }
    }

    // Toast Component
    class ToastComponent extends BaseComponent {
        setupEventListeners() {
            // Toast components are typically created dynamically
        }

        show(message, type = 'info', duration = 3000) {
            const container = this.getToastContainer();
            const toast = this.createToast(message, type);
            
            container.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('fc-toast-active');
            }, 100);
            
            setTimeout(() => {
                this.hide(toast);
            }, duration);
            
            this.emit('show', { message, type });
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

        hide(toast) {
            toast.classList.remove('fc-toast-active');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
            this.emit('hide');
        }
    }

    // Tabs Component
    class TabsComponent extends BaseComponent {
        setupEventListeners() {
            const tabs = this.element.querySelectorAll('[data-fc-tab]');
            const contents = this.element.querySelectorAll('[data-fc-tab-content]');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const target = tab.getAttribute('data-fc-tab');
                    this.showTab(target);
                });
            });
            
            // Show first tab by default
            if (tabs.length > 0) {
                this.showTab(tabs[0].getAttribute('data-fc-tab'));
            }
        }

        showTab(target) {
            const tabs = this.element.querySelectorAll('[data-fc-tab]');
            const contents = this.element.querySelectorAll('[data-fc-tab-content]');
            
            tabs.forEach(tab => {
                tab.classList.remove('fc-tab-active');
            });
            
            contents.forEach(content => {
                content.classList.remove('fc-tab-content-active');
            });
            
            const activeTab = this.element.querySelector(`[data-fc-tab="${target}"]`);
            const activeContent = this.element.querySelector(`[data-fc-tab-content="${target}"]`);
            
            if (activeTab) activeTab.classList.add('fc-tab-active');
            if (activeContent) activeContent.classList.add('fc-tab-content-active');
            
            this.emit('tab-change', { target });
        }
    }

    // Switch Component
    class SwitchComponent extends BaseComponent {
        setupEventListeners() {
            const input = this.element.querySelector('input[type="checkbox"]');
            if (input) {
                input.addEventListener('change', () => {
                    this.element.classList.toggle('fc-switch-active', input.checked);
                    this.emit('change', { checked: input.checked });
                });
            }
        }
    }

    // Progress Component
    class ProgressComponent extends BaseComponent {
        setupEventListeners() {
            this.updateProgress();
        }

        updateProgress() {
            const value = this.element.getAttribute('data-fc-progress') || 0;
            const bar = this.element.querySelector('.fc-progress-bar');
            if (bar) {
                bar.style.width = `${value}%`;
            }
        }

        setProgress(value) {
            this.element.setAttribute('data-fc-progress', value);
            this.updateProgress();
            this.emit('progress-change', { value });
        }
    }

    // Skeleton Component
    class SkeletonComponent extends BaseComponent {
        setupEventListeners() {
            const type = this.element.getAttribute('data-fc-skeleton') || 'text';
            this.element.classList.add(`fc-skeleton-${type}`);
        }
    }

    // Stepper Component
    class StepperComponent extends BaseComponent {
        setupEventListeners() {
            const steps = this.element.querySelectorAll('[data-fc-step]');
            const nextBtn = this.element.querySelector('[data-fc-stepper-next]');
            const prevBtn = this.element.querySelector('[data-fc-stepper-prev]');
            
            this.currentStep = 0;
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    this.nextStep();
                });
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    this.prevStep();
                });
            }
            
            this.showStep(0);
        }

        showStep(index) {
            const steps = this.element.querySelectorAll('[data-fc-step]');
            steps.forEach((step, i) => {
                if (i === index) {
                    step.classList.add('fc-step-active');
                } else {
                    step.classList.remove('fc-step-active');
                }
            });
        }

        nextStep() {
            const steps = this.element.querySelectorAll('[data-fc-step]');
            if (this.currentStep < steps.length - 1) {
                this.currentStep++;
                this.showStep(this.currentStep);
                this.emit('step-change', { step: this.currentStep });
            }
        }

        prevStep() {
            if (this.currentStep > 0) {
                this.currentStep--;
                this.showStep(this.currentStep);
                this.emit('step-change', { step: this.currentStep });
            }
        }
    }

    // Form Component
    class FormComponent extends BaseComponent {
        setupEventListeners() {
            this.on('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }

        handleSubmit() {
            const formData = new FormData(this.element);
            const data = Object.fromEntries(formData);
            this.emit('submit', { data });
        }
    }

    // Component Manager Plugin
    class ComponentManagerPlugin {
        constructor() {
            this.name = 'component-manager';
            this.version = '2.0.0';
            this.components = new Map();
            this.instances = new Map();
            this.engine = null;
            this.observer = null;
        }

        init(engine) {
            this.engine = engine;
            
            // Register default components
            this.registerDefaultComponents();
            
            // Initialize component system
            this.initComponentSystem();
            
            // Set up mutation observer for dynamic content
            this.setupMutationObserver();
            
            // Initialize existing components
            this.initExistingComponents();
            
            this.engine.log('Component Manager Plugin initialized');
        }

        registerDefaultComponents() {
            // Modal Component
            this.registerComponent('modal', {
                name: 'Modal',
                selector: '[data-fc-modal]',
                init: (element, options = {}) => {
                    return new ModalComponent(element, options, this.engine);
                }
            });

            // Dropdown Component
            this.registerComponent('dropdown', {
                name: 'Dropdown',
                selector: '[data-fc-dropdown]',
                init: (element, options = {}) => {
                    return new DropdownComponent(element, options, this.engine);
                }
            });

            // Tooltip Component
            this.registerComponent('tooltip', {
                name: 'Tooltip',
                selector: '[data-fc-tooltip]',
                init: (element, options = {}) => {
                    return new TooltipComponent(element, options, this.engine);
                }
            });

            // Toast Component
            this.registerComponent('toast', {
                name: 'Toast',
                selector: '[data-fc-toast]',
                init: (element, options = {}) => {
                    return new ToastComponent(element, options, this.engine);
                }
            });

            // Tabs Component
            this.registerComponent('tabs', {
                name: 'Tabs',
                selector: '[data-fc-tabs]',
                init: (element, options = {}) => {
                    return new TabsComponent(element, options, this.engine);
                }
            });

            // Switch Component
            this.registerComponent('switch', {
                name: 'Switch',
                selector: '[data-fc-switch]',
                init: (element, options = {}) => {
                    return new SwitchComponent(element, options, this.engine);
                }
            });

            // Progress Component
            this.registerComponent('progress', {
                name: 'Progress',
                selector: '[data-fc-progress]',
                init: (element, options = {}) => {
                    return new ProgressComponent(element, options, this.engine);
                }
            });

            // Skeleton Component
            this.registerComponent('skeleton', {
                name: 'Skeleton',
                selector: '[data-fc-skeleton]',
                init: (element, options = {}) => {
                    return new SkeletonComponent(element, options, this.engine);
                }
            });

            // Stepper Component
            this.registerComponent('stepper', {
                name: 'Stepper',
                selector: '[data-fc-stepper]',
                init: (element, options = {}) => {
                    return new StepperComponent(element, options, this.engine);
                }
            });

            // Form Component
            this.registerComponent('form', {
                name: 'Form',
                selector: '[data-fc-form]',
                init: (element, options = {}) => {
                    return new FormComponent(element, options, this.engine);
                }
            });
        }

        initComponentSystem() {
            // Create component container
            this.createComponentContainer();
            
            // Set up component events
            this.setupComponentEvents();
        }

        createComponentContainer() {
            // Create global component container
            if (!document.getElementById('fc-component-container')) {
                const container = document.createElement('div');
                container.id = 'fc-component-container';
                container.style.display = 'none';
                document.body.appendChild(container);
            }
        }

        setupComponentEvents() {
            // Listen for component events
            this.engine.on('component-init', (data) => {
                this.engine.log(`Component "${data.name}" initialized`);
            });
            
            this.engine.on('component-destroy', (data) => {
                this.engine.log(`Component "${data.name}" destroyed`);
            });
        }

        setupMutationObserver() {
            // Observe DOM changes for dynamic components
            this.observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                this.initComponentsInElement(node);
                            }
                        });
                    }
                });
            });
            
            this.observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        initExistingComponents() {
            this.initComponentsInElement(document.body);
        }

        initComponentsInElement(element) {
            this.components.forEach((component, name) => {
                const elements = element.querySelectorAll ? 
                    element.querySelectorAll(component.selector) : 
                    (element.matches && element.matches(component.selector) ? [element] : []);
                
                elements.forEach((el) => {
                    if (!this.instances.has(el)) {
                        try {
                            const instance = component.init(el, this.getComponentOptions(el));
                            this.instances.set(el, { component: name, instance });
                            this.engine.emit('component-init', { name, element: el, instance });
                        } catch (error) {
                            this.engine.error(`Failed to initialize component "${name}":`, error);
                        }
                    }
                });
            });
        }

        getComponentOptions(element) {
            const options = {};
            
            // Get data attributes
            Array.from(element.attributes).forEach(attr => {
                if (attr.name.startsWith('data-fc-')) {
                    const key = attr.name.replace('data-fc-', '');
                    let value = attr.value;
                    
                    // Try to parse JSON
                    try {
                        value = JSON.parse(value);
                    } catch (e) {
                        // Keep as string if not valid JSON
                    }
                    
                    options[key] = value;
                }
            });
            
            return options;
        }

        registerComponent(name, component) {
            this.components.set(name, component);
            this.engine.log(`Component "${name}" registered`);
        }

        getComponent(name) {
            return this.components.get(name);
        }

        getAllComponents() {
            return Array.from(this.components.entries());
        }

        getInstance(element) {
            const instance = this.instances.get(element);
            return instance ? instance.instance : null;
        }

        destroyComponent(element) {
            const instance = this.instances.get(element);
            if (instance && instance.instance.destroy) {
                instance.instance.destroy();
                this.instances.delete(element);
                this.engine.emit('component-destroy', { name: instance.component, element });
            }
        }

        // Public API
        getAPI() {
            return {
                registerComponent: this.registerComponent.bind(this),
                getComponent: this.getComponent.bind(this),
                getAllComponents: this.getAllComponents.bind(this),
                getInstance: this.getInstance.bind(this),
                destroyComponent: this.destroyComponent.bind(this)
            };
        }
    }

    // Register plugin with engine
    if (window.flexacore) {
        const plugin = new ComponentManagerPlugin();
        window.flexacore.registerPlugin('component-manager', plugin);
        
        // Expose component API globally
        window.FCComponents = plugin.getAPI();
    }

})(window, document); 