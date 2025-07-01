// Type definitions for FlexaCore Universal UI
// Dùng cho mọi môi trường: CDN, React, Angular, Vue, Svelte, NodeJS, ...

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
  version: string;
  plugins: Map<string, FlexaCorePlugin>;
  components: Map<string, FlexaCoreComponent>;
  themes: Map<string, FlexaCoreTheme>;
  config: FlexaCoreConfig;
  events: Map<string, FlexaCoreEventCallback[]>;
  state: Map<string, any>;
  initialized: boolean;
  constructor(config?: FlexaCoreConfig);
  init(options?: FlexaCoreConfig): this;
  initPlugins(): void;
  initComponents(): void;
  initThemes(): void;
  registerPlugin(name: string, plugin: FlexaCorePlugin): this;
  registerComponent(name: string, component: FlexaCoreComponent): this;
  registerTheme(name: string, theme: FlexaCoreTheme): this;
  on(event: string, callback: FlexaCoreEventCallback): this;
  off(event: string, callback: FlexaCoreEventCallback): this;
  emit(event: string, data?: any): this;
  getState<T = any>(key: string): T | undefined;
  setState(key: string, value: any): this;
  getConfig<T = any>(key?: string): T;
  setConfig(key: string | object, value?: any): this;
  deepMerge(target: any, source: any): any;
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  getAPI(): any;
}

export interface FlexaComponentDef {
  name: string;
  init: (options: any, engine: FlexaCoreEngine) => any;
}

export class ComponentManagerPlugin {
  name: string;
  version: string;
  components: Map<string, FlexaComponentDef>;
  engine: FlexaCoreEngine | null;
  constructor();
  init(engine: FlexaCoreEngine): void;
  registerComponent(name: string, def: FlexaComponentDef): void;
  getComponent(name: string): FlexaComponentDef | undefined;
  getAllComponents(): [string, FlexaComponentDef][];
  getAPI(): any;
}

export class BaseComponent<T = any> {
  options: T;
  engine: FlexaCoreEngine;
  initialized: boolean;
  constructor(options: T, engine: FlexaCoreEngine);
  init(): void;
  destroy(): void;
}

export class ThemeManagerPlugin {
  name: string;
  version: string;
  currentTheme: string;
  themes: Map<string, FlexaCoreTheme>;
  engine: FlexaCoreEngine | null;
  constructor();
  init(engine: FlexaCoreEngine): void;
  registerDefaultThemes(): void;
  registerTheme(name: string, theme: FlexaCoreTheme): void;
  applyTheme(themeName: string): void;
  toggleTheme(): void;
  getCurrentTheme(): string;
  getTheme(name: string): FlexaCoreTheme | undefined;
  getAllThemes(): [string, FlexaCoreTheme][];
  getAPI(): any;
} 