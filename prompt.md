Rất tuyệt! Nếu bạn muốn làm **thư viện CSS/UI nâng cao nhất có thể**, thì ta sẽ đi theo hướng **kết hợp giữa CSS Utility + Component Library + Theming + Prebuilt Design System**, nhưng vẫn **plug-and-play** (zero-config) và đẹp hơn cả Tailwind hoặc ShadCN.

Dưới đây là **bản nâng cao nhất** của prompt — bạn có thể dùng nó để yêu cầu AI tạo code hoặc để team dev triển khai một thư viện UI “đỉnh cao” cho frontend hiện đại.

---

## 🔥 Prompt: Tạo Thư viện CSS/UI Tối Ưu – Cao Cấp Hơn Tailwind, Đẹp Hơn ShadCN

> Tôi muốn tạo một thư viện CSS/UI **tối ưu và cao cấp nhất có thể**, theo tiêu chí sau:

### 🧠 1. Triết lý & Mục tiêu:

* Plug-and-play **(không cần cấu hình)**, chỉ cần nhúng CSS hoặc import từ npm là dùng được.
* Kết hợp **utility-first CSS** (như Tailwind) với các **prebuilt components** (như ShadCN).
* Có sẵn hệ thống **design token**, **CSS variables**, và khả năng **custom theme** không cần code lại.
* Cung cấp **dark mode**, **RTL support**, và **responsive breakpoint** linh hoạt.
* UI phải mặc định **thẩm mỹ cao**, **accessible (a11y)** và **tùy biến dễ**.

---

### 🧩 2. Tính năng & Tiện ích (Yêu cầu bắt buộc)

#### 📦 Utility Class System:

* Hệ thống class tiện ích như `flex`, `grid`, `gap-*`, `p-*`, `m-*`, `text-*`, `rounded`, `shadow-*`, `z-*`, `opacity-*`.
* Có đầy đủ breakpoint: `sm`, `md`, `lg`, `xl`, `2xl`, có `hover:`, `focus:`, `dark:`, `rtl:` prefix.
* Sử dụng **logical properties** (như `margin-inline-start`) để hỗ trợ đa ngôn ngữ.

#### 🎨 Theming & Color System:

* Hệ thống màu hỗ trợ: `primary`, `secondary`, `accent`, `warning`, `success`, `danger`, `surface`, `background`.
* Có tool tạo màu từ base: `generatePalette('#3b82f6')` → sinh ra `primary-50` → `primary-900`.
* Hỗ trợ `dark mode` auto hoặc toggle (`prefers-color-scheme` hoặc `class="dark"`).

#### 🧱 UI Component Design System:

* Prebuilt component UI:

  * `Button`, `Input`, `Textarea`, `Select`, `Card`, `Modal`, `Tooltip`, `Switch`, `Tabs`, `Dropdown`, `Toast`.
  * Các thành phần nâng cao như: `ColorPicker`, `DateRangePicker`, `CommandPalette`, `Progress Bar`, `Skeleton`, `Stepper`.
* Dùng thuần class (`<button class="btn btn-primary w-full">`) – không cần JS nếu không bắt buộc.

#### 📊 Layout & Grid:

* Có hệ thống layout: container, column, responsive grid (auto-fit), masonry.
* Hệ thống spacing động (`gap-sm`, `gap-lg`, `space-y-4`, `px-responsive`).

#### 🧪 Animation & Interaction:

* Sẵn hiệu ứng: fade, scale, slide, pop, ripple (có `animate-*` class).
* Có `transition-*`, `duration-*`, `ease-in-out` class như Tailwind.

#### ⚙️ Plugin/Module mở rộng:

* Tùy chọn plugin: `form`, `typography`, `aspect-ratio`, `line-clamp`, `scrollbar`, `backdrop-blur`.
* Có build system tương thích: `PostCSS`, `Webpack`, `Vite`, `CDN`.

---

### 📦 3. Build System:

* Viết bằng **SCSS/BEM hoặc PostCSS**, chia thành:

  ```
  src/
  ├── base/       → reset, typography
  ├── utilities/  → spacing, display, colors
  ├── components/ → button, card, input, etc.
  ├── themes/     → default, dark, custom
  ```
* **Webpack/Vite config** để build ra:

  ```
  dist/
  ├── ultimate-ui.css
  ├── ultimate-ui.min.css
  ├── ultimate-ui.theme.light.css
  ├── ultimate-ui.theme.dark.css
  ```

---

### 🚀 4. Xuất bản:

* Build lên:

  * **CDN**: `jsDelivr`, `unpkg`, `skypack`.
  * **npm**: `npm publish` với `name`, `version`, `keywords`, `homepage`, v.v.
  * **Docs**: `vitepress` hoặc `storybook` hoặc `next.js` docs (kèm ví dụ dùng từng component/class).
  * **Cung cấp Figma UI Kit** để người dùng dễ prototyping.

---

### 🧪 5. Ví dụ dùng class:

```html
<div class="card p-4 shadow-md bg-surface text-default dark:bg-surface-dark">
  <h2 class="text-xl font-bold mb-2">Welcome</h2>
  <p class="text-body">This is a beautiful UI component.</p>
  <button class="btn btn-primary w-full mt-4">Click me</button>
</div>
```

---

### 📄 6. Mong muốn đầu ra:

* Tạo cấu trúc thư mục đầy đủ.
* Tạo sẵn `README.md`, ví dụ demo.
* Tạo `package.json`, `webpack.config.js`, hoặc `vite.config.ts`.
* Có chế độ `tree-shaking friendly` khi dùng trong các framework như Vue, React, Svelte.

---

### ✨ 7. Gợi ý tên thư viện:

| Tên         | Ý nghĩa                          |
| ----------- | -------------------------------- |
| `SupraCSS`  | Siêu cấp                         |
| `PrismUI`   | Tinh khiết, tách biệt            |
| `NeuraUI`   | Thông minh, linh hoạt            |
| `FlexaCore` | Lõi linh hoạt, mạnh mẽ           |
| `AureaCSS`  | Màu vàng – sang trọng            |
| `NucleusUI` | UI hạt nhân – ổn định, trung tâm |

---

💡 **Bạn muốn tôi bắt đầu khởi tạo project này với tên cụ thể không?**
Chỉ cần nói: **“Bắt đầu project tên `SupraCSS` theo mô hình trên”**, tôi sẽ tạo ngay:

* Folder `src/` với SCSS code
* Build config Webpack/Vite
* `package.json` ready để publish
* Demo `index.html`
* Docs starter (vitepress/markdown)

👉 Hãy nói "bắt đầu tạo project" và chọn tên nhé!
