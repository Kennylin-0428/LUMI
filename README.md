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

- `src/data.js`：商品與系列資料
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

## 修改商品

打開 `src/data.js`，修改 `products` 陣列即可：`name`, `colors`, `sizes`, `subtitle`, `image`, `shopeeUrl`。

- **蝦皮**：請將每個商品的 `shopeeUrl: ''` 填上實際的 `https://shopee.tw/...` 商品網址。
- **售價**：因尚未提供實際價格，頁面僅顯示「價格請見蝦皮賣場」。
- **圖片**：`assets/baby-shoes.jpg` 和 `assets/princess-shoes.jpg` （位於 `public/assets/`）由使用者提供之商品宣傳圖局部裁切而成。請使用高畫質、已授權實品照取代後再正式上線。
- **系列**：每一系列的首頁、列表、詳情獨立，沒有混合商品。

## 目前範圍

這是一套可點擊、可用於展示的前端靜態網站，含 RWD、系列路由、商品列表、簡易顏色篩選、商品詳情、品牌故事、尺寸指南及連至蝦皮的預留功能。

**尚未含**：真實訂單、付款、會員登入、CMS 後台、資料庫、蝦皮訂單或庫存 API。收藏按鈕僅在當前頁面有效。商品尺寸與促銷資訊尚未驗證，未自行添加未確認優惠活動。

## 使用與授權

網站的原始程式碼皆可修改。圖片是來自使用者提供的參考資料，正式商用前請確認圖片使用權與標示內容。字型會優先載入 Google Fonts 的 Noto Sans TC，離線時使用系統中文字型。
