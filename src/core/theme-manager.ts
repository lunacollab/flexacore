// FlexaCore Universal Theme Manager Plugin (TypeScript)
// Có thể dùng cho mọi môi trường: CDN, React, Angular, Vue, Svelte, NodeJS, ...
import { FlexaCoreEngine, FlexaCoreTheme } from './engine';

export class ThemeManagerPlugin {
  name = 'theme-manager';
  version = '2.0.0';
  currentTheme = 'default';
  themes = new Map<string, FlexaCoreTheme>();
  engine: FlexaCoreEngine | null = null;

  constructor() {}

  init(engine: FlexaCoreEngine) {
    this.engine = engine;
    this.registerDefaultThemes();
    // Không auto DOM, chỉ cung cấp API universal
  }

  registerDefaultThemes() {
    this.registerTheme('default', {
      name: 'Default',
      colors: {
        primary: '#007bff', secondary: '#6c757d', success: '#28a745', danger: '#dc3545',
        warning: '#ffc107', info: '#17a2b8', light: '#f8f9fa', dark: '#343a40',
        background: '#ffffff', surface: '#ffffff', text: '#212529', textSecondary: '#6c757d',
        border: '#dee2e6', shadow: 'rgba(0, 0, 0, 0.1)'
      },
      typography: { fontFamily: 'sans', fontSize: 'base', lineHeight: 1.5 },
      spacing: { base: '1rem', small: '0.5rem', large: '1.5rem' },
      borderRadius: { small: '0.25rem', base: '0.375rem', large: '0.5rem' },
      shadows: {
        small: '0 1px 3px rgba(0, 0, 0, 0.1)', base: '0 4px 6px rgba(0, 0, 0, 0.1)', large: '0 10px 15px rgba(0, 0, 0, 0.1)'
      }
    });
    this.registerTheme('dark', {
      name: 'Dark',
      colors: {
        primary: '#0d6efd', secondary: '#6c757d', success: '#198754', danger: '#dc3545',
        warning: '#ffc107', info: '#0dcaf0', light: '#212529', dark: '#f8f9fa',
        background: '#121212', surface: '#1e1e1e', text: '#ffffff', textSecondary: '#adb5bd',
        border: '#343a40', shadow: 'rgba(0, 0, 0, 0.3)'
      },
      typography: { fontFamily: 'sans', fontSize: 'base', lineHeight: 1.5 },
      spacing: { base: '1rem', small: '0.5rem', large: '1.5rem' },
      borderRadius: { small: '0.25rem', base: '0.375rem', large: '0.5rem' },
      shadows: {
        small: '0 1px 3px rgba(0, 0, 0, 0.3)', base: '0 4px 6px rgba(0, 0, 0, 0.3)', large: '0 10px 15px rgba(0, 0, 0, 0.3)'
      }
    });
    this.registerTheme('light', {
      name: 'Light',
      colors: {
        primary: '#0d6efd', secondary: '#6c757d', success: '#198754', danger: '#dc3545',
        warning: '#ffc107', info: '#0dcaf0', light: '#f8f9fa', dark: '#212529',
        background: '#ffffff', surface: '#f8f9fa', text: '#212529', textSecondary: '#6c757d',
        border: '#dee2e6', shadow: 'rgba(0, 0, 0, 0.05)'
      },
      typography: { fontFamily: 'sans', fontSize: 'base', lineHeight: 1.6 },
      spacing: { base: '1rem', small: '0.5rem', large: '1.5rem' },
      borderRadius: { small: '0.25rem', base: '0.375rem', large: '0.5rem' },
      shadows: {
        small: '0 1px 3px rgba(0, 0, 0, 0.05)', base: '0 4px 6px rgba(0, 0, 0, 0.05)', large: '0 10px 15px rgba(0, 0, 0, 0.05)'
      }
    });
    this.registerTheme('high-contrast', {
      name: 'High Contrast',
      colors: {
        primary: '#000000', secondary: '#333333', success: '#006600', danger: '#cc0000',
        warning: '#cc6600', info: '#0066cc', light: '#ffffff', dark: '#000000',
        background: '#ffffff', surface: '#ffffff', text: '#000000', textSecondary: '#333333',
        border: '#000000', shadow: 'rgba(0, 0, 0, 0.5)'
      },
      typography: { fontFamily: 'sans', fontSize: 'lg', lineHeight: 1.4 },
      spacing: { base: '1.25rem', small: '0.75rem', large: '2rem' },
      borderRadius: { small: '0', base: '0', large: '0' },
      shadows: {
        small: '2px 2px 0 rgba(0, 0, 0, 0.5)', base: '4px 4px 0 rgba(0, 0, 0, 0.5)', large: '6px 6px 0 rgba(0, 0, 0, 0.5)'
      }
    });
  }

  registerTheme(name: string, theme: FlexaCoreTheme) {
    this.themes.set(name, { ...theme, name: theme.name || name });
    this.engine?.log?.(`Theme "${name}" registered`);
  }

  applyTheme(themeName: string) {
    const theme = this.themes.get(themeName);
    if (!theme) {
      this.engine?.warn?.(`Theme "${themeName}" not found`);
      return;
    }
    this.currentTheme = themeName;
    this.engine?.setState?.('theme', themeName);
    this.engine?.emit?.('theme-change', { theme: themeName, themeData: theme });
    this.engine?.log?.(`Theme "${themeName}" applied`);
  }

  toggleTheme() {
    const themes = Array.from(this.themes.keys());
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    this.applyTheme(themes[nextIndex]);
  }

  getCurrentTheme() { return this.currentTheme; }
  getTheme(name: string) { return this.themes.get(name); }
  getAllThemes() { return Array.from(this.themes.entries()); }
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