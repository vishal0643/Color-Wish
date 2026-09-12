# Color-Wish CDN Frontend Assets

Production-ready, framework-free frontend engine for the **Color-Wish** Children's SVG Coloring Platform.

---

## 📁 Repository Structure

```
color-wish/
├── css/
│   └── color-wish.css     # Main Design System & Component Styles
├── js/
│   ├── color-wish.js      # App Core, Navigation & DOM Helpers
│   ├── svg-editor.js     # Interactive SVG Vector Coloring Engine
│   └── coloring-book.js   # Local Storage Favorites & Printable Book
├── assets/
│   └── logo.png          # Place your 425x425 transparent PNG logo here
└── README.md
```

---

## 🚀 CDN Integration via jsDelivr

Host these files in your GitHub repository and import them directly via jsDelivr CDN.

### Standard main-branch link:
```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/color-wish@main/css/color-wish.css" />

<!-- JS Engine -->
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/color-wish@main/js/color-wish.js"></script>
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/color-wish@main/js/svg-editor.js"></script>
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/color-wish@main/js/coloring-book.js"></script>
```

---

## 📌 Blogger Data Attributes Syntax

| Attribute | Purpose |
|---|---|
| `data-cw-search` | Input query field binding |
| `data-cw-category` | Category filter selection chip |
| `data-cw-card` | Gallery card container |
| `data-cw-title` | Title string for gallery filtering |
| `data-cw-year` | Automatic footer copyright year update |
