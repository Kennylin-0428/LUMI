import { Link, Route, Routes } from 'react-router-dom';
import ProductAdminList from './ProductAdminList.jsx';
import ProductForm from './ProductForm.jsx';
import './admin.css';

export default function AdminApp() {
  return (
    <div className="admin">
      <header className="admin-header">
        <Link to="/admin" className="admin-brand">
          LUMI <span>商品後台</span>
        </Link>
        <Link to="/" className="admin-link">← 回到前台</Link>
      </header>
      <main className="admin-main">
        {import.meta.env.DEV ? (
          <Routes>
            <Route index element={<ProductAdminList />} />
            <Route path="new" element={<ProductForm />} />
            <Route path="edit/:productId" element={<ProductForm />} />
            <Route path="*" element={<p className="admin-empty">找不到此頁面。</p>} />
          </Routes>
        ) : (
          <div className="admin-card admin-offline">
            <h1>後台只能在本機使用</h1>
            <p>
              這個網站是靜態網站，沒有伺服器可以儲存資料。請在專案資料夾執行 <code>npm run dev</code>，
              開啟終端機顯示的網址並前往 <code>#/admin</code> 編輯商品，完成後再重新 build 與部署。
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
