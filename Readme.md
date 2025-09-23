# Notes App - PWA (React + Vite)

Ứng dụng **Notes App** là một Progressive Web App (PWA) được xây dựng bằng **React + Vite**, cho phép người dùng viết và lưu ghi chú nhanh chóng với hỗ trợ Markdown cơ bản. Ứng dụng có thể hoạt động **offline**, lưu dữ liệu cục bộ bằng IndexedDB, và có khả năng cài đặt như một ứng dụng di động/desktop.

---

## ✨ Tính năng chính
- 📝 Viết và chỉnh sửa ghi chú nhanh.
- 🔤 Hỗ trợ **Markdown cơ bản** (sử dụng thư viện `marked`).
- 💾 Lưu trữ dữ liệu cục bộ với **IndexedDB**.
- 📦 Cache assets với **Service Worker** để hoạt động **offline**.
- 📱 Có thể **cài đặt PWA** trên điện thoại và máy tính.

---

## 📂 Cấu trúc thư mục
```
pwa-notes-app/
├─ public/
│  ├─ manifest.webmanifest   # Thông tin PWA
│  └─ icons/                 # Icon ứng dụng
├─ src/
│  ├─ App.jsx                # Giao diện chính
│  ├─ main.jsx               # Điểm khởi chạy React
│  ├─ idb.js                 # Helper IndexedDB
│  └─ styles.css             # CSS cơ bản
├─ sw.js                     # Service Worker
├─ index.html
├─ vite.config.js
├─ package.json
└─ README.md
```

---

## 🚀 Cài đặt và chạy

### 1. Clone repo
```bash
git clone https://github.com/your-username/pwa-notes-app.git
cd pwa-notes-app
```

### 2. Cài dependencies
```bash
npm install
```

### 3. Chạy development server
```bash
npm run dev
```
Truy cập [http://localhost:5173](http://localhost:5173)

### 4. Build production
```bash
npm run build
```

### 5. Preview build
```bash
npm run preview
```

---

## 📱 Cài đặt như ứng dụng
- Truy cập bằng trình duyệt **Chrome/Edge/Firefox (Android)** hoặc **Safari (iOS)**.
- Chọn **“Add to Home Screen” / “Install App”**.
- Ứng dụng sẽ chạy ở chế độ **standalone**, giống app gốc.

---

## ⚙️ Công nghệ sử dụng
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Marked](https://marked.js.org/) – render Markdown
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Workbox](https://developer.chrome.com/docs/workbox) – caching PWA

---

## 📌 Ghi chú
- Service Worker chỉ hoạt động trên **HTTPS** hoặc **localhost**.
- Dữ liệu hiện chỉ lưu ở **IndexedDB** (cục bộ), chưa có đồng bộ cloud.
