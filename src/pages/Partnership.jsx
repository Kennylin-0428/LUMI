import { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs.jsx';

// 設定正式合作信箱後，表單會改為開啟使用者的郵件程式。
const CONTACT_EMAIL = import.meta.env.VITE_PARTNERSHIP_EMAIL?.trim() || '';
const OPTIONS = [
  ['shop', '通路合作', '實體選品店、親子空間與零售通路，一起讓更多家庭遇見 LUMI 的可愛日常。'],
  ['parcel', '代理經銷', '歡迎分享您的經營區域與通路規劃，與我們聊聊商品選品及經銷合作的可能。'],
  ['hearts', '品牌聯名', '從限定企劃到風格聯名，讓不同的靈感相遇，一起創造值得珍藏的小美好。'],
];

function PartnershipIcon({ type }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" focusable="false">
      {type === 'shop' && <>
        <path d="M8 18v15h24V18" fill="#fffaf6" />
        <path d="M9 8h22l4 9c0 4-6 5-8 1-1 4-6 4-7 0-1 4-6 4-7 0-2 4-8 3-8-1Z" fill="#f4cbd6" />
        <path d="m15 8-2 10m7-10v10m5-10 2 10" />
        <path d="M12 24h6v9h-6z" fill="#f7e5d6" /><rect x="23" y="24" width="5" height="5" rx="1.5" fill="#f4dfe7" />
        <path d="M18 4h4M20 2v4" />
      </>}
      {type === 'parcel' && <>
        <path d="m7 13 13-6 13 6v17l-13 6-13-6Z" fill="#fffaf6" />
        <path d="m7 13 13 6 13-6M20 19v17" />
        <path d="m14 10 13 6v6l-5 2v-6L9 12" fill="#c4ddeb" />
        <path d="M11 24h.1m5 2h.1m-5 2q2 3 5 2" strokeWidth="2" />
        <path d="M30 5h6m-3-3v6" />
      </>}
      {type === 'hearts' && <>
        <path d="M21 13c-4-8-15-5-15 3 0 6 8 11 15 15 7-4 13-9 13-15 0-8-10-11-13-3Z" fill="#f4d0df" />
        <path d="M25 20c-3-5-10-3-10 2 0 4 5 8 10 11 5-3 10-7 10-11 0-5-7-7-10-2Z" fill="#e7dcf3" />
        <path d="M20 24h.1m9 0h.1m-7 3q2 2 4 0M6 6h6M9 3v6m23 0h4m-2-2v4" />
      </>}
    </svg>
  );
}

export default function Partnership() {
  const [notice, setNotice] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const message = event.currentTarget.elements.message;
    message.setCustomValidity(message.value.trim() ? '' : '請填寫您的合作想法。');
    if (!event.currentTarget.reportValidity()) return;
    const data = new FormData(event.currentTarget);
    const content = [
      'LUMI 露米｜合作洽詢',
      ...[['公司／機構名稱', 'company'], ['聯絡人姓名', 'name'], ['職稱', 'role'], ['聯絡電話', 'phone'], ['電子郵件', 'email'], ['合作類型', 'type'], ['合作說明', 'message']]
        .map(([label, key]) => `${label}：${data.get(key)?.trim() || '未填寫'}`),
    ].join('\n\n');
    if (CONTACT_EMAIL) {
      window.location.href = `mailto:${encodeURIComponent(CONTACT_EMAIL)}?subject=${encodeURIComponent(`LUMI 合作洽詢｜${data.get('company')}`)}&body=${encodeURIComponent(content)}`;
      setNotice('已準備郵件草稿，請在郵件程式中確認內容並寄出。若未開啟，請直接來信下方合作信箱。');
      return;
    }
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'LUMI-合作洽詢.txt';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice('合作洽詢內容已整理為下載檔案，尚未送出。您可保留檔案，待正式聯絡管道開放後提供給我們。');
  }

  return (
    <>
      <Breadcrumbs items={['合作洽詢']} />
      <section className="wrap">
        <div className="intro-hero partnership-hero">
          <div>
            <span className="eyebrow">LET’S GROW TOGETHER</span>
            <h1>一起，讓小小的每一步<br />有更多美好。</h1>
            <p>歡迎通路夥伴、代理商與品牌朋友，與 LUMI 露米聊聊合作，讓童趣與溫柔走進更多家庭的日常。</p>
            <div className="intro-highlights"><span>通路合作</span><span>代理經銷</span><span>品牌聯名</span></div>
          </div>
          <div className="partnership-note" aria-hidden="true">
            <span>♡</span><strong>Little steps,<br />lovely together.</strong><small>把可愛的靈感，一起變成日常。</small>
          </div>
        </div>
      </section>
      <section className="wrap section partnership-layout" aria-label="合作項目與洽詢表單">
        <aside className="partnership-about">
          <span className="eyebrow">OUR PARTNERSHIPS</span>
          <h2>攜手 LUMI，<br />一起走出新的可能。</h2>
          <p className="partnership-lead">每個好點子，都值得一段溫柔的開始。<br />從您的想法出發，找到適合彼此的合作方式。</p>
          <div className="partnership-options">
            {OPTIONS.map(([symbol, title, description]) => (
              <div className="partnership-option" key={title}>
                <span aria-hidden="true"><PartnershipIcon type={symbol} /></span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </div>
            ))}
          </div>
          <div className="partnership-contact">
            <span className="eyebrow">SAY HELLO</span>
            <h3>期待認識您與您的品牌</h3>
            {CONTACT_EMAIL ? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> : <p>合作聯絡管道準備中，歡迎先整理您的合作想法，下載保存洽詢內容。</p>}
          </div>
        </aside>
        <div className="partnership-form-card">
          <span className="eyebrow">A LOVELY BEGINNING</span>
          <h2>聊聊您的合作想法</h2>
          <p className="partnership-lead">留下品牌資訊與提案，讓我們更了解您。<br /><span aria-hidden="true">*</span> 為必填欄位</p>
          <form className="partnership-form" onSubmit={handleSubmit} onChange={() => setNotice('')}>
            <div className="partnership-fields">
              <label>公司／機構名稱 <span>*</span><input name="company" autoComplete="organization" placeholder="請輸入公司或品牌名稱" maxLength={120} required pattern=".*\S.*" /></label>
              <label>聯絡人姓名 <span>*</span><input name="name" autoComplete="name" placeholder="我們該如何稱呼您？" maxLength={80} required pattern=".*\S.*" /></label>
              <label>職稱<input name="role" autoComplete="organization-title" placeholder="例如：品牌企劃、採購經理" maxLength={80} /></label>
              <label>聯絡電話 <span>*</span><input name="phone" type="tel" autoComplete="tel" placeholder="請輸入方便聯繫的電話" maxLength={40} required pattern=".*\S.*" /></label>
            </div>
            <label>電子郵件 <span>*</span><input name="email" type="email" autoComplete="email" placeholder="hello@yourbrand.com" maxLength={254} required /></label>
            <label>合作類型 <span>*</span><select name="type" defaultValue="" required><option value="" disabled>請選擇合作類型</option>{OPTIONS.map(([, title]) => <option key={title}>{title}</option>)}<option>其他合作提案</option></select></label>
            <label>合作說明 <span>*</span><textarea name="message" rows={6} placeholder="與我們分享您的合作想法、通路規模、預計時程，或其他想讓 LUMI 知道的事⋯" maxLength={3000} required onChange={(event) => event.target.setCustomValidity('')} /></label>
            <p className="partnership-privacy">{CONTACT_EMAIL ? '表單將開啟您的郵件程式，經您確認寄出後，資料僅供本次合作洽詢使用。' : '目前提供洽詢內容下載，資料不會透過網站傳送。正式合作聯絡管道即將開放。'}</p>
            <button className="pill-btn" type="submit">{CONTACT_EMAIL ? '準備合作洽詢郵件' : '下載合作洽詢內容'} <span aria-hidden="true">↗</span></button>
            <p className="partnership-status" role="status">{notice}</p>
          </form>
        </div>
      </section>
    </>
  );
}
