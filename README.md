# FlexaCore 🚀

**Thư viện CSS/UI hiện đại nhất** - Kết hợp sức mạnh của Tailwind CSS và vẻ đẹp của ShadCN UI.

[![npm version](https://badge.fury.io/js/flexacore.svg)](https://badge.fury.io/js/flexacore)
[![npm downloads](https://img.shields.io/npm/dm/flexacore.svg)](https://www.npmjs.com/package/flexacore)
[![CDN](https://img.shields.io/badge/CDN-jsDelivr-blue.svg)](https://cdn.jsdelivr.net/npm/flexacore)
[![CDN](https://img.shields.io/badge/CDN-unpkg-orange.svg)](https://unpkg.com/flexacore)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/lunacollab/flexacore)

## ✨ Tính năng nổi bật

- 🎨 **200+ Utility Classes** - Mạnh mẽ như Tailwind CSS
- 🧩 **20+ Components** - Đẹp sẵn sàng sử dụng
- 🌙 **Dark Mode** - Tự động và manual toggle
- 🌍 **RTL Support** - Hỗ trợ đa ngôn ngữ
- 📱 **Responsive** - Mobile-first design
- ♿ **Accessibility** - WCAG 2.1 compliant
- 🖨️ **Print Styles** - Tối ưu cho in ấn
- ⚡ **Zero Config** - Plug-and-play
- 🎭 **Theming** - CSS Variables dễ tùy chỉnh

## 🚀 Cài đặt

### NPM
```bash
npm install flexacore
```

### Yarn
```bash
yarn add flexacore
```

### CDN
```html
<!-- jsDelivr (Recommended) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flexacore@latest/dist/flexacore.min.css">

<!-- unpkg -->
<link rel="stylesheet" href="https://unpkg.com/flexacore@latest/dist/flexacore.min.css">

<!-- Specific version -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flexacore@1.0.0/dist/flexacore.min.css">
```

### Download
Tải trực tiếp từ [Releases](https://github.com/lunacollab/flexacore/releases)

## 📖 Sử dụng

### Basic Setup
```html
<!DOCTYPE html>
<html lang="vi">
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

### Import trong JavaScript/TypeScript
```javascript
// ES6 Modules
import 'flexacore/dist/flexacore.css';

// CommonJS
require('flexacore/dist/flexacore.css');
```

### SCSS Import
```scss
// Import toàn bộ
@use 'flexacore';

// Import từng phần
@use 'flexacore/utilities';
@use 'flexacore/components';
@use 'flexacore/themes';
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
        <option>Vietnam</option>
        <option>USA</option>
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

FlexaCore được thiết kế với accessibility trong tâm trí:

- ✅ **Keyboard Navigation** - Tất cả components hỗ trợ keyboard
- ✅ **Screen Readers** - ARIA labels và semantic HTML
- ✅ **Color Contrast** - WCAG 2.1 AA compliant
- ✅ **Focus Management** - Visible focus indicators
- ✅ **Reduced Motion** - Respects `prefers-reduced-motion`

## 🖨️ Print Styles

FlexaCore bao gồm print styles tối ưu:

```html
<div class="print-only">Chỉ hiển thị khi in</div>
<div class="no-print">Không hiển thị khi in</div>
<div class="avoid-break">Tránh ngắt trang</div>
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

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng đọc [Contributing Guide](CONTRIBUTING.md) để biết thêm chi tiết.

### Development Setup
```bash
npm install
npm run dev
npm test
```

## 📄 License

MIT License - xem [LICENSE](LICENSE) để biết thêm chi tiết.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) - Inspiration cho utility classes
- [ShadCN UI](https://ui.shadcn.com/) - Inspiration cho component design
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) - Modern CSS theming

## 📞 Support

- 📧 Email: support@flexacore.dev
- 💬 Discord: [FlexaCore Community](https://discord.gg/flexacore)
- 🐛 Issues: [GitHub Issues](https://github.com/flexacore/flexacore/issues)
- 📖 Docs: [Documentation](https://docs.flexacore.dev)

---

**FlexaCore** - Xây dựng UI hiện đại, nhanh chóng và đẹp mắt! 🎨✨ 