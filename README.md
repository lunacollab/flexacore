# FlexaCore - Universal UI Framework

Universal UI Framework for CDN, React, Angular, Vue, Svelte with complete TypeScript support.

## 🚀 Installation

### NPM
```bash
npm install flexacore-ui-dev
```

### CDN (Vanilla JS)
```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/flexacore-ui-dev@latest/dist/flexacore.min.css">

<!-- JavaScript -->
<script src="https://unpkg.com/flexacore-ui-dev@latest/dist/flexacore-framework.min.js"></script>
<script>
  // Initialize FlexaCore
  FlexaCore.init();
  
  // Switch theme
  FlexaCore.themeManager.setTheme('dark');
</script>
```

## 📦 Usage

### React + TypeScript
```tsx
import { FCButton, FCModal, FCProvider } from 'flexacore-ui-dev/react';

function App() {
  return (
    <FCProvider>
      <FCButton variant="primary" onClick={() => console.log('clicked')}>
        Click me
      </FCButton>
      <FCModal open={true} onClose={() => {}}>
        <h2>Modal Content</h2>
      </FCModal>
    </FCProvider>
  );
}
```

### Angular
```typescript
import { FlexaCoreModule } from 'flexacore-ui-dev/angular';

@NgModule({
  imports: [FlexaCoreModule.forRoot()],
  // ...
})
export class AppModule { }
```

```html
<fc-button variant="primary" (onClick)="handleClick()">
  Click me
</fc-button>

<fc-modal [open]="modalOpen" (close)="closeModal()">
  <h2>Modal Content</h2>
</fc-modal>
```

### Vue 3 + TypeScript
```vue
<template>
  <FcButton variant="primary" @click="handleClick">
    Click me
  </FcButton>
  
  <FcModal :open="modalOpen" @close="closeModal">
    <h2>Modal Content</h2>
  </FcModal>
</template>

<script setup lang="ts">
import { FcButton, FcModal } from 'flexacore-ui-dev/vue';

const modalOpen = ref(false);
const handleClick = () => console.log('clicked');
const closeModal = () => modalOpen.value = false;
</script>
```

### Svelte
```svelte
<script>
  import { FCButton, FCModal } from 'flexacore-ui-dev/svelte';
  
  let modalOpen = false;
  
  function handleClick() {
    console.log('clicked');
  }
  
  function closeModal() {
    modalOpen = false;
  }
</script>

<FCButton variant="primary" on:click={handleClick}>
  Click me
</FCButton>

<FCModal open={modalOpen} on:close={closeModal}>
  <h2>Modal Content</h2>
</FCModal>
```

## 🎨 Components

### Available Components
- **FCButton** - Button with variants, sizes, states
- **FCModal** - Modal dialog with backdrop, animations
- **FCToast** - Toast notifications with auto-close
- **FCTabs** - Tab navigation with content switching
- **FCSwitch** - Toggle switch component
- **FCProgress** - Progress bar with variants
- **FCSkeleton** - Loading skeleton with animations
- **FCStepper** - Multi-step wizard
- **FCForm** - Form wrapper with layouts
- **FCInput** - Input field with validation
- **FCTextarea** - Textarea with resizing
- **FCSelect** - Select dropdown with options
- **FCBadge** - Badge with variants, sizes
- **FCAlert** - Alert messages with dismissible
- **FCTooltip** - Tooltip with positioning
- **FCDropdown** - Dropdown menu
- **FCCard** - Card container with header/footer

### Standardized Props
All components have standardized props:
- `variant`: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- Event handlers: `onClick`, `onChange`, `onClose`, etc.

## 🎯 Build & Development

### Build All
```bash
npm run build
```

### Build Individual Parts
```bash
# CDN only
npm run build:cdn

# Framework components
npm run build:framework

# Universal framework (React, Angular, Vue, Svelte)
npm run build:universal

# Themes
npm run build:themes
```

### Development
```bash
# Watch SCSS changes
npm run watch

# Demo server
npm run demo

# CDN test server
npm run cdn:test
```

## 📁 Project Structure

```
src/
├── core/           # Core engine, theme-manager, component-manager
├── react/          # React components + hooks + provider
├── angular/        # Angular components + module
├── vue/            # Vue components
├── svelte/         # Svelte components
├── types/          # TypeScript definitions
├── components/     # SCSS component styles
├── utilities/      # Utility classes
├── themes/         # Theme variations
└── base/           # Base styles, reset, variables
```

## 🌟 Features

- ✅ **Universal**: Support for CDN, React, Angular, Vue, Svelte
- ✅ **TypeScript**: Full type support for all frameworks
- ✅ **Theming**: Dark mode, light mode, high contrast
- ✅ **Responsive**: Mobile-first design
- ✅ **Accessible**: WCAG 2.1 compliant
- ✅ **Customizable**: Easy to customize themes, components
- ✅ **Modern**: ES2018+, modern CSS features
- ✅ **Lightweight**: Optimized bundle sizes

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🎨 CSS Framework Usage

### Basic Setup
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My App</title>
    <link rel="stylesheet" href="flexacore.css">
</head>
<body>
    <div class="container">
        <h1 class="text-3xl font-bold text-primary">Hello FlexaCore!</h1>
        <button class="btn btn-primary">Click me</button>
    </div>
</body>
</html>
```

### Import in JavaScript/TypeScript
```javascript
// ES6 Modules
import 'flexacore-ui-dev/dist/flexacore.css';

// CommonJS
require('flexacore-ui-dev/dist/flexacore.css');
```

### SCSS Import
```scss
// Import everything
@use 'flexacore-ui-dev';

// Import specific parts
@use 'flexacore-ui-dev/utilities';
@use 'flexacore-ui-dev/components';
@use 'flexacore-ui-dev/themes';
```

### Dark Mode
```html
<!-- Auto dark mode -->
<html data-theme="dark">

<!-- Manual toggle -->
<button onclick="document.documentElement.classList.toggle('dark')">
    Toggle Theme
</button>
```

### RTL Support
```html
<!-- RTL layout -->
<html dir="rtl">

<!-- RTL utilities -->
<div class="rtl-text-right">Right aligned in RTL</div>
```

## 🎨 Components

### Buttons
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-sm">Small</button>
<button class="btn btn-lg">Large</button>
```

### Cards
```html
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Card Title</h3>
    </div>
    <div class="card-body">
        <p>Card content goes here</p>
    </div>
    <div class="card-footer">
        <button class="btn btn-primary">Action</button>
    </div>
</div>
```

### Forms
```html
<div class="form-group">
    <label class="form-label">Email</label>
    <input type="email" class="input" placeholder="Enter email">
</div>

<div class="form-group">
    <label class="form-label">Country</label>
    <select class="select">
        <option>Select country</option>
        <option>United States</option>
        <option>United Kingdom</option>
    </select>
</div>
```

### Alerts
```html
<div class="alert alert-success">
    <div class="alert-icon">✅</div>
    <div class="alert-content">
        <h4 class="alert-title">Success!</h4>
        <p>Operation completed successfully.</p>
    </div>
</div>
```

### Badges & Avatars
```html
<span class="badge badge-primary">New</span>
<span class="badge badge-success">Active</span>

<div class="avatar">
    <img src="user.jpg" alt="User">
</div>
```

## 🛠️ Utilities

### Spacing
```html
<div class="p-4 m-2">Padding 4, Margin 2</div>
<div class="px-6 py-3">Horizontal padding 6, Vertical padding 3</div>
<div class="space-y-4">Vertical spacing between children</div>
```

### Flexbox
```html
<div class="flex justify-center items-center gap-4">
    <div>Item 1</div>
    <div>Item 2</div>
</div>
```

### Grid
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div>Grid Item 1</div>
    <div>Grid Item 2</div>
    <div>Grid Item 3</div>
</div>
```

### Colors
```html
<div class="bg-primary text-white">Primary background</div>
<div class="bg-success text-white">Success background</div>
<div class="text-danger">Danger text</div>
<div class="border border-gray-300">Gray border</div>
```

### Typography
```html
<h1 class="text-4xl font-bold">Large Heading</h1>
<p class="text-lg text-gray-600">Large paragraph text</p>
<span class="font-semibold">Semibold text</span>
```

### Shadows & Effects
```html
<div class="shadow-lg">Large shadow</div>
<div class="shadow-primary">Primary colored shadow</div>
<div class="backdrop-blur-md">Backdrop blur</div>
```

### Animations
```html
<div class="animate-fade-in">Fade in animation</div>
<div class="animate-slide-in-up">Slide up animation</div>
<div class="animate-pulse">Pulse animation</div>
```

## 📐 Layout

### Container
```html
<div class="container">Default container</div>
<div class="container-lg">Large container</div>
<div class="container-fluid">Full width container</div>
```

### Masonry
```html
<div class="masonry masonry-3">
    <div class="masonry-item">Item 1</div>
    <div class="masonry-item">Item 2</div>
    <div class="masonry-item">Item 3</div>
</div>
```

### Columns
```html
<div class="columns columns-2">
    <p>Column 1 content</p>
    <p>Column 2 content</p>
</div>
```

## 🎭 Theming

### CSS Variables
```css
:root {
    --fc-primary: #3b82f6;
    --fc-secondary: #64748b;
    --fc-success: #22c55e;
    --fc-warning: #f59e0b;
    --fc-danger: #ef4444;
    --fc-radius: 0.375rem;
    --fc-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}
```

### Custom Theme
```css
[data-theme="custom"] {
    --fc-primary: #8b5cf6;
    --fc-surface: #f8fafc;
    --fc-text-primary: #1e293b;
}
```

## 📱 Responsive

### Breakpoints
- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+
- `xl`: 1280px+
- `2xl`: 1536px+

### Responsive Utilities
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <div>Responsive grid</div>
</div>

<div class="text-sm md:text-base lg:text-lg">
    Responsive text size
</div>

<div class="hidden md:block">
    Hidden on mobile, visible on desktop
</div>
```

## ♿ Accessibility

FlexaCore is designed with accessibility in mind:

- ✅ **Keyboard Navigation** - All components support keyboard
- ✅ **Screen Readers** - ARIA labels and semantic HTML
- ✅ **Color Contrast** - WCAG 2.1 AA compliant
- ✅ **Focus Management** - Visible focus indicators
- ✅ **Reduced Motion** - Respects `prefers-reduced-motion`

## 🖨️ Print Styles

FlexaCore includes optimized print styles:

```html
<div class="print-only">Only visible when printing</div>
<div class="no-print">Hidden when printing</div>
<div class="avoid-break">Avoid page breaks</div>
```

## 🚀 Build & Development

### Development
```bash
# Clone repository
git clone https://github.com/flexacore/flexacore.git
cd flexacore

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Custom Build
```bash
# Build with custom theme
npm run build:custom

# Build with specific components only
npm run build:components

# Build utilities only
npm run build:utilities
```

## 📦 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🤝 Contributing

We welcome all contributions! Please read the [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
```bash
npm install
npm run dev
npm test
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) - Inspiration for utility classes
- [ShadCN UI](https://ui.shadcn.com/) - Inspiration for component design
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) - Modern CSS theming

## 📞 Support

- 📧 Email: support@flexacore.dev
- 🐛 Issues: [GitHub Issues](https://github.com/flexacore/flexacore/issues)
- 📖 Docs: [Documentation](https://docs.flexacore.dev) (Coming soon)

---

**FlexaCore** - Building modern, fast, and beautiful UIs! 🎨✨ 