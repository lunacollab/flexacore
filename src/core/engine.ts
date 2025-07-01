// FlexaCore Universal Core Engine (TypeScript)
// Có thể dùng cho mọi môi trường: CDN, React, Angular, Vue, Svelte, NodeJS, ...

export type FlexaCorePlugin = { init?: (engine: FlexaCoreEngine) => void };
export type FlexaCoreComponent = { init?: (engine: FlexaCoreEngine) => void };
export type FlexaCoreTheme = { apply?: (engine: FlexaCoreEngine) => void } & Record<string, any>;
export type FlexaCoreEventCallback = (data?: any) => void;

export interface FlexaCoreConfig {
  autoInit?: boolean;
  debug?: boolean;
  theme?: string;
  rtl?: boolean;
  locale?: string;
  breakpoints?: Record<string, number>;
  colors?: Record<string, string>;
  spacing?: Record<string, string>;
  typography?: {
    fontFamily?: Record<string, string[]>;
    fontSize?: Record<string, string>;
  };
  [key: string]: any;
}

export class FlexaCoreEngine {
  version = '2.0.0';
  plugins = new Map<string, FlexaCorePlugin>();
  components = new Map<string, FlexaCoreComponent>();
  themes = new Map<string, FlexaCoreTheme>();
  config: FlexaCoreConfig;
  events = new Map<string, FlexaCoreEventCallback[]>();
  state = new Map<string, any>();
  initialized = false;

  constructor(config: FlexaCoreConfig = {}) {
    this.config = this.deepMerge(this.getDefaultConfig(), config);
  }

  getDefaultConfig(): FlexaCoreConfig {
    return {
      autoInit: true,
      debug: false,
      theme: 'default',
      rtl: false,
      locale: 'en',
      breakpoints: {
        xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400
      },
      colors: {
        primary: '#007bff', secondary: '#6c757d', success: '#28a745', danger: '#dc3545',
        warning: '#ffc107', info: '#17a2b8', light: '#f8f9fa', dark: '#343a40'
      },
      spacing: {
        xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '3rem'
      },
      typography: {
        fontFamily: {
          sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
          serif: ['Georgia', 'Times', 'serif'],
          mono: ['SFMono-Regular', 'Monaco', 'Consolas', 'monospace']
        },
        fontSize: {
          xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem',
          '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem'
        }
      }
    };
  }

  init(options: FlexaCoreConfig = {}): this {
    if (this.initialized) return this;
    this.config = this.deepMerge(this.config, options);
    this.state.set('initialized', true);
    this.state.set('theme', this.config.theme);
    this.state.set('rtl', this.config.rtl);
    this.initPlugins();
    this.initComponents();
    this.initThemes();
    this.initialized = true;
    this.emit('ready', { engine: this });
    this.log('FlexaCore Engine initialized successfully');
    return this;
  }

  initPlugins() {
    this.plugins.forEach((plugin, name) => {
      if (typeof plugin.init === 'function') {
        try { plugin.init(this); this.log(`Plugin "${name}" initialized`); }
        catch (error) { this.error(`Failed to initialize plugin "${name}":`, error); }
      }
    });
  }

  initComponents() {
    this.components.forEach((component, name) => {
      if (typeof component.init === 'function') {
        try { component.init(this); this.log(`Component "${name}" initialized`); }
        catch (error) { this.error(`Failed to initialize component "${name}":`, error); }
      }
    });
  }

  initThemes() {
    const currentTheme = this.state.get('theme');
    const theme = this.themes.get(currentTheme);
    if (theme && typeof theme.apply === 'function') theme.apply(this);
  }

  registerPlugin(name: string, plugin: FlexaCorePlugin) {
    if (this.plugins.has(name)) this.warn(`Plugin "${name}" already registered, overwriting`);
    this.plugins.set(name, plugin);
    if (this.initialized && typeof plugin.init === 'function') plugin.init(this);
    this.log(`Plugin "${name}" registered`);
    return this;
  }

  registerComponent(name: string, component: FlexaCoreComponent) {
    if (this.components.has(name)) this.warn(`Component "${name}" already registered, overwriting`);
    this.components.set(name, component);
    if (this.initialized && typeof component.init === 'function') component.init(this);
    this.log(`Component "${name}" registered`);
    return this;
  }

  registerTheme(name: string, theme: FlexaCoreTheme) {
    if (this.themes.has(name)) this.warn(`Theme "${name}" already registered, overwriting`);
    this.themes.set(name, theme);
    this.log(`Theme "${name}" registered`);
    return this;
  }

  on(event: string, callback: FlexaCoreEventCallback) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event)!.push(callback);
    return this;
  }

  off(event: string, callback: FlexaCoreEventCallback) {
    if (this.events.has(event)) {
      const callbacks = this.events.get(event)!;
      const index = callbacks.indexOf(callback);
      if (index > -1) callbacks.splice(index, 1);
    }
    return this;
  }

  emit(event: string, data: any = {}) {
    if (this.events.has(event)) {
      this.events.get(event)!.forEach(callback => {
        try { callback(data); }
        catch (error) { this.error(`Error in event "${event}" callback:`, error); }
      });
    }
    return this;
  }

  getState<T = any>(key: string): T | undefined { return this.state.get(key); }
  setState(key: string, value: any) { this.state.set(key, value); this.emit('state-change', { key, value }); return this; }
  getConfig<T = any>(key?: string): T { return key ? this.config[key] : this.config as T; }
  setConfig(key: string | object, value?: any) {
    if (typeof key === 'object') this.config = this.deepMerge(this.config, key);
    else this.config[key] = value;
    this.emit('config-change', { key, value });
    return this;
  }
  deepMerge(target: any, source: any): any {
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
  log(...args: any[]) { if (this.config.debug) console.log('[FlexaCore]', ...args); }
  warn(...args: any[]) { if (this.config.debug) console.warn('[FlexaCore]', ...args); }
  error(...args: any[]) { console.error('[FlexaCore]', ...args); }
  getAPI(): any {
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