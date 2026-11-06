# LUMI 露米｜React 版

## 開啟方式

本專案使用 React + Vite + React Router（HashRouter，網址維持 `#/...` 格式）。需要 Node.js 18 以上。

```bash
npm install      # 安裝套件
npm run dev      # 開發模式，瀏覽器開啟終端機顯示的網址
npm run build    # 產生 dist/，可部署到 GitHub Pages、Cloudflare Pages、Netlify
npm run preview  # 預覽 build 結果
```

## 專案結構

- `src/products.json`：商品資料（由後台編輯）
- `src/data.js`：系列資料、商品資料載入
- `src/admin/`：商品後台頁面
- `vite-plugin-admin.js`：後台存檔與圖片上傳 API（僅開發模式）
- `src/App.jsx`：路由設定
- `src/pages/`：各頁面（首頁、系列介紹、商品列表、商品詳情等）
- `src/components/`：共用元件（Header、Footer、麵包屑、商品卡片等）
- `src/styles.css`：全站樣式
- `public/assets/`：圖片

## 網站架構

- `#/` 首頁
- `#/collections` 系列總覽
- `#/baby` 寶寶鞋系列介紹
- `#/baby/products` 寶寶鞋商品列表
- `#/baby/product/baby-candy` 寶寶鞋商品詳情
- `#/princess` 公主鞋系列介紹
- `#/princess/products` 公主鞋商品列表
- `#/princess/product/princess-lace` 公主鞋商品詳情
- `#/story` 品牌故事
- `#/size-guide` 尺寸指南
- `#/sitemap` 網站架構圖
- `#/admin` 商品後台（僅 `npm run dev`）

## 商品後台

執行 `npm run dev` 後開啟 `http://localhost:5173/#/admin`（以終端機顯示的網址為準），即可新增、編輯、刪除與排序商品：

- **基本資訊**：商品名稱、副標題、分類、售價 (NT$)、料號、網址 ID、蝦皮連結
- **標籤 / 樣式**：顏色選項、可選尺碼、售完尺碼
- **商品圖片**：主圖上傳、加入更多圖片、圖片列表（排序、設為主圖、移除）
- **商品描述**：商品描述、材質、保養方式

存檔會直接寫入 `src/products.json`，上傳的圖片存到 `public/assets/products/`。
後台 API 由 `vite-plugin-admin.js` 提供，**只在開發模式運作**；正式網站是靜態檔案，`#/admin` 只會顯示提示。
改完商品後請 commit `src/products.json` 與新圖片，再 `npm run build` 部署。

- **蝦皮**：請將每個商品的 `shopeeUrl: ''` 填上實際的 `https://shopee.tw/...` 商品網址。
- **售價**：後台售價留空時，頁面顯示「價格請見蝦皮賣場」。
- **圖片**：`assets/baby-shoes.jpg` 和 `assets/princess-shoes.jpg` （位於 `public/assets/`）由使用者提供之商品宣傳圖局部裁切而成。請使用高畫質、已授權實品照取代後再正式上線。
- **系列**：每一系列的首頁、列表、詳情獨立，沒有混合商品。

## 目前範圍

這是一套可點擊、可用於展示的前端靜態網站，含 RWD、系列路由、商品列表、簡易顏色篩選、商品詳情、品牌故事、尺寸指南及連至蝦皮的預留功能。

**尚未含**：真實訂單、付款、會員登入、線上後台與資料庫（目前後台僅限本機使用）、蝦皮訂單或庫存 API。收藏按鈕僅在當前頁面有效。商品尺寸與促銷資訊尚未驗證，未自行添加未確認優惠活動。

## 使用與授權

網站的原始程式碼皆可修改。圖片是來自使用者提供的參考資料，正式商用前請確認圖片使用權與標示內容。字型會優先載入 Google Fonts 的 Noto Sans TC，離線時使用系統中文字型。

## 合作洽詢頁面

合作頁位於 `/partnership`，提供通路合作、代理經銷與品牌聯名介紹。
預設表單會下載洽詢文字檔，不會傳送資料或顯示已送出。
若要改為準備寄給合作信箱的郵件，在本機 `.env.local` 設定：

```dotenv
VITE_PARTNERSHIP_EMAIL=your-partnership@example.com
```

請替換成正式信箱，再重新啟動開發伺服器或執行建置。此設定會公開於前端；只填公開聯絡信箱。
設定後會開啟訪客的郵件程式，由訪客確認並寄出；目前沒有伺服器收件或資料儲存功能。
