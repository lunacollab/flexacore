# Contributing to FlexaCore 🚀

Cảm ơn bạn đã quan tâm đến việc đóng góp cho FlexaCore! Chúng tôi hoan nghênh mọi đóng góp từ cộng đồng.

## 🤝 Cách đóng góp

### Báo cáo lỗi (Bug Reports)
- Sử dụng [GitHub Issues](https://github.com/lunacollab/flexacore/issues)
- Mô tả chi tiết lỗi và cách tái hiện
- Bao gồm thông tin về browser, OS, version
- Thêm screenshot nếu có thể

### Đề xuất tính năng (Feature Requests)
- Tạo issue với label "enhancement"
- Mô tả rõ ràng tính năng mong muốn
- Giải thích lý do và use case
- Thảo luận với community

### Pull Requests
- Fork repository
- Tạo branch mới cho feature/fix
- Commit với message rõ ràng
- Test kỹ trước khi submit
- Cập nhật documentation nếu cần

## 🛠️ Development Setup

### Yêu cầu
- Node.js 16+
- npm 8+

### Cài đặt
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

### Scripts có sẵn
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:css    # Build CSS only
npm run build:min    # Build minified CSS
npm run watch        # Watch for changes
npm run lint         # Lint SCSS files
npm run lint:fix     # Fix linting issues
npm run test         # Run tests
npm run docs         # Start docs server
npm run demo         # Start demo server
```

## 📁 Cấu trúc Project

```
flexacore/
├── src/
│   ├── base/           # Reset, typography, variables
│   ├── utilities/      # Utility classes
│   ├── components/     # UI components
│   ├── layout/         # Layout components
│   ├── themes/         # Theme files
│   └── main.scss       # Entry point
├── demo/               # Demo site
├── docs/               # Documentation
├── dist/               # Built files
└── package.json
```

## 🎨 Coding Standards

### SCSS Guidelines
- Sử dụng BEM methodology
- Tổ chức code theo thứ tự: variables, mixins, base styles, utilities, components
- Comment rõ ràng cho complex logic
- Sử dụng CSS custom properties cho theming

### Naming Conventions
```scss
// Components
.component-name { }
.component-name--variant { }
.component-name__element { }

// Utilities
.utility-name { }
.utility-name--modifier { }

// Variables
--fc-component-property: value;
```

### File Structure
```scss
// _component.scss
// 1. Variables
// 2. Mixins
// 3. Base styles
// 4. Variants
// 5. States
// 6. Responsive
// 7. RTL support
```

## 🧪 Testing

### Manual Testing
- Test trên nhiều browsers
- Kiểm tra responsive design
- Verify accessibility
- Test dark mode
- Test RTL support

### Automated Testing
```bash
npm run test          # Run all tests
npm run test:unit     # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:accessibility # Accessibility tests
```

## 📚 Documentation

### Cập nhật Docs
- Cập nhật README.md cho new features
- Thêm examples trong demo/
- Cập nhật API documentation
- Viết migration guides nếu cần

### Documentation Standards
- Sử dụng clear, concise language
- Include code examples
- Add screenshots cho UI components
- Maintain consistent formatting

## 🚀 Release Process

### Versioning
- Sử dụng [Semantic Versioning](https://semver.org/)
- Major: Breaking changes
- Minor: New features (backward compatible)
- Patch: Bug fixes

### Release Checklist
- [ ] Update version trong package.json
- [ ] Update CHANGELOG.md
- [ ] Run full test suite
- [ ] Build production files
- [ ] Create GitHub release
- [ ] Publish to npm
- [ ] Update CDN links

## 🤝 Community Guidelines

### Code of Conduct
- Tôn trọng mọi người
- Constructive feedback
- Help newcomers
- Follow project guidelines

### Communication
- GitHub Issues cho technical discussions
- Discord cho real-time chat
- Email cho private matters

## 🏷️ Issue Labels

- `bug` - Lỗi cần fix
- `enhancement` - Tính năng mới
- `documentation` - Cần cập nhật docs
- `good first issue` - Dễ cho beginners
- `help wanted` - Cần help từ community
- `priority: high` - Ưu tiên cao
- `priority: low` - Ưu tiên thấp

## 🎯 Roadmap

### Short Term (1-3 months)
- [ ] Performance optimizations
- [ ] Additional components
- [ ] Better documentation
- [ ] More examples

### Long Term (3-12 months)
- [ ] React/Vue components
- [ ] Design system tools
- [ ] Plugin ecosystem
- [ ] Enterprise features

## 📞 Getting Help

- 📧 Email: team@flexacore.dev
- 💬 Discord: [FlexaCore Community](https://discord.gg/flexacore)
- 🐛 Issues: [GitHub Issues](https://github.com/lunacollab/flexacore/issues)
- 📖 Docs: [Documentation](https://docs.flexacore.dev)

## 🙏 Acknowledgments

Cảm ơn tất cả contributors đã đóng góp cho FlexaCore! Mỗi contribution, dù nhỏ hay lớn, đều có giá trị và được đánh giá cao.

---

**Happy coding! 🎨✨** 