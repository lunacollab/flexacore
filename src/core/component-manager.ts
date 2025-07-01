// FlexaCore Universal Component Manager Plugin (TypeScript)
// Can be used in any environment: CDN, React, Angular, Vue, Svelte, NodeJS, ...
import { FlexaCoreEngine } from './engine';

export type FlexaComponentInit<T = any> = (options: T, engine: FlexaCoreEngine) => any;
export interface FlexaComponentDef {
  name: string;
  init: FlexaComponentInit;
}

export class ComponentManagerPlugin {
  name = 'component-manager';
  version = '2.0.0';
  components = new Map<string, FlexaComponentDef>();
  engine: FlexaCoreEngine | null = null;

  constructor() {}

  init(engine: FlexaCoreEngine) {
    this.engine = engine;
    // Không auto DOM, chỉ cung cấp API universal
  }

  registerComponent(name: string, def: FlexaComponentDef) {
    this.components.set(name, def);
    this.engine?.log?.(`Component "${name}" registered`);
  }

  getComponent(name: string) {
    return this.components.get(name);
  }

  getAllComponents() {
    return Array.from(this.components.entries());
  }

  getAPI() {
    return {
      registerComponent: this.registerComponent.bind(this),
      getComponent: this.getComponent.bind(this),
      getAllComponents: this.getAllComponents.bind(this)
    };
  }
}

// BaseComponent universal (không phụ thuộc DOM)
export class BaseComponent<T = any> {
  options: T;
  engine: FlexaCoreEngine;
  initialized = false;
  constructor(options: T, engine: FlexaCoreEngine) {
    this.options = options;
    this.engine = engine;
    this.init();
  }
  init() { this.initialized = true; }
  destroy() { this.initialized = false; }
} 