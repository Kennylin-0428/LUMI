import PillButton from '../components/PillButton.jsx';

export default function NotFound() {
  return (
    <div className="wrap section">
      <h1>找不到這個頁面</h1>
      <p>頁面可能已移動，請從系列總覽重新探索。</p>
      <PillButton to="/">回到首頁</PillButton>
    </div>
  );
}
