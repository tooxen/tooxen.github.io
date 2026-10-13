// 年份自動更新
document.getElementById('y').textContent = new Date().getFullYear();

// Navbar 滾動效果 (毛玻璃與背景)
const navbar = document.getElementById('mainNav');

// 初始化檢查 Navbar 樣式
function checkNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('glass-nav');
    navbar.classList.remove('navbar-top-mobile-solid');
  } else {
    navbar.classList.remove('glass-nav');
    // 如果是手機版且在頂部，可能需要給一個底色以防字體看不清楚，但目前設計 hero 區塊都是藍色底
    // 所以可以保持透明。
  }
}

window.addEventListener('scroll', checkNavbarScroll);
checkNavbarScroll(); // 頁面載入時觸發一次

// 滾動動畫 (Intersection Observer)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // 動畫只觸發一次
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up-element').forEach(el => {
  observer.observe(el);
});

// 點擊 Navbar 連結後自動收合選單 (手機版)
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const menuToggle = document.getElementById('navMain');
const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
navLinks.forEach((l) => {
  l.addEventListener('click', () => {
    if (menuToggle.classList.contains('show')) {
      bsCollapse.toggle();
    }
  });
});


// 複製 Email 功能
const copyEmailBtn = document.getElementById('copyEmailBtn');

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  
  // 避免出現滾動
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = 'service@tooxen.app';
    
    const originalText = copyEmailBtn.dataset.originalText || copyEmailBtn.innerText;
    copyEmailBtn.dataset.originalText = originalText;
    
    const showCopiedFeedback = () => {
      copyEmailBtn.innerText = '已複製！';
      setTimeout(() => {
        copyEmailBtn.innerText = originalText;
      }, 2000);
    };

    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(email);
      showCopiedFeedback();
      return;
    }
    
    navigator.clipboard.writeText(email).then(() => {
      showCopiedFeedback();
    }).catch(err => {
      console.error('Clipboard API failed: ', err);
      fallbackCopyTextToClipboard(email);
      showCopiedFeedback();
    });
  });
}

// 服務卡片詳細說明 Modal 資料與互動
const serviceDetails = {
  web: {
    title: '網頁設計 (Web Design)',
    icon: 'images/services-web.svg',
    category: '品牌形象與體驗',
    tagline: '量身打造兼具視覺美感與商業轉換的高品質官方網站與形象頁面。',
    highlights: [
      { title: 'RWD 響應式佈局', desc: '完美適配手機、平板、桌面螢幕，提供無縫流暢的跨裝置體驗。' },
      { title: '現代 UI/UX 設計', desc: '以使用者為核心的直覺操作介面，精緻動畫細節提升品牌形象。' },
      { title: 'SEO 搜尋引擎優化', desc: '符合最新搜尋引擎爬蟲規範架構，讓潛在客戶能更輕鬆找到您。' },
      { title: '極致效能載入', desc: '輕量化代碼與資源優化，打造秒開極速體驗，降低跳出率。' }
    ],
    description: '無論是企業形象官網、產品登陸頁（Landing Page）還是活動專頁，我們均提供由設計稿到前端工程實作的一站式專業交付。'
  },
  app: {
    title: '手機應用 (Mobile App)',
    icon: 'images/services-app.svg',
    category: '行動裝置解決方案',
    tagline: '打造直覺流暢、高互動性的 iOS 與 Android 原生 / 跨平台行動應用程式。',
    highlights: [
      { title: '跨平台開發技術', desc: '採用高效成熟的跨平台框架，節省開發週期並維持一致雙平台體驗。' },
      { title: '極致流暢操作', desc: '原生級的手勢操作與互動反應，打造令人愛不釋手的手機使用體驗。' },
      { title: '雲端推播與即時同步', desc: '整合 Firebase、即時推播通知、生物辨識登入與在地化快取功能。' },
      { title: '雙商店上架輔導', desc: '協助通過 App Store 與 Google Play 審查規範，順利上架發布。' }
    ],
    description: '從概念發想、UI Prototype 原型驗證到前後端 API 串接與應用商店發行，陪您一同將好點子化為口袋裡的隨身利器。'
  },
  programming: {
    title: '程式設計 (Programming)',
    icon: 'images/services-programing.svg',
    category: '核心邏輯與演算法',
    tagline: '依據業務需求撰寫嚴謹、可維護且具擴展性的客製化商業邏輯與自動化腳本。',
    highlights: [
      { title: '客製化邏輯開發', desc: '針對特殊業務流程訂製演算法與計算引擎，擺脫套版框架限制。' },
      { title: '自動化排程與爬蟲', desc: '資料擷取、定期報表產出、跨平台資料同步自動化腳本撰寫。' },
      { title: '整潔代碼架構', desc: '遵循業界最佳實踐（Clean Code / SOLID），確保日後可維護性。' },
      { title: '單元測試與穩定度', desc: '關鍵邏輯覆蓋自動化測試，確保商業規則計算精確無誤。' }
    ],
    description: '解決現有軟體無法滿足的特殊業務痛點，透過量身打造的程式碼精準擊中核心需求。'
  },
  develop: {
    title: '系統開發 (System Development)',
    icon: 'images/services-develop.svg',
    category: '架構與企業後台',
    tagline: '建構高可用性後端系統、API 微服務、企業 ERP/CRM 與專屬數據管理平台。',
    highlights: [
      { title: '模組化系統架構', desc: '微服務或結構化單體設計，便於未來隨業務增長平滑彈性擴展。' },
      { title: '安全權限與驗證', desc: 'RBAC 角色權限管理、JWT / OAuth 安全認證、防範 SQL Injection 與 XSS。' },
      { title: '高效能資料庫設計', desc: '優化關聯式與非關聯式資料庫結構，兼顧查詢效率與資料一致性。' },
      { title: '開放式 RESTful / GraphQL API', desc: '規範化標準介面，方便整合第三方服務或內部其他系統。' }
    ],
    description: '專為企業運營賦能，將內部複雜的審核、進銷存、會員或訂單流程數位化，全面提升營運效率。'
  },
  tech: {
    title: '技術諮詢 (Technical Consultation)',
    icon: 'images/services-tech.svg',
    category: '專業顧問與診斷',
    tagline: '為您的數位轉型、技術選型、系統瓶頸與資訊安全架構提供全方位專業洞見。',
    highlights: [
      { title: '技術選型與架構評估', desc: '協助新創或既有團隊選擇最適合專案規模、預算與未來成長的技術堆疊。' },
      { title: '效能瓶頸診斷', desc: '深入分析資料庫慢查詢、高併發卡頓或前端渲染效能，提供優化解方。' },
      { title: '資訊安全檢視', desc: '針對基礎架構、傳輸加密與敏感資料保護進行體檢與建議。' },
      { title: '外包規格驗收輔導', desc: '協助非技術背景客戶梳理規格書（RFP）、釐清需求邊界並參與驗收把關。' }
    ],
    description: '省去盲目試錯的時間與成本，讓資深工程師成為您的堅實技術後盾與顧問智囊。'
  },
  management: {
    title: '專案管理 (Project Management)',
    icon: 'images/services-management.svg',
    category: '敏捷交付與品管',
    tagline: '導入敏捷開發思維，嚴格把關專案時程、里程碑、溝通協調與最終交付成果。',
    highlights: [
      { title: '需求梳理與拆解', desc: '將模糊的想法具體轉化為可執行的 User Stories 與敏捷衝刺（Sprint）計劃。' },
      { title: '透明化時程追蹤', desc: '運用看板工具清晰呈現專案進度，定期雙向同步，進度一目了然。' },
      { title: '跨領域溝通協調', desc: '擔任設計師、工程師與業務利害關係人間的橋樑，確保目標一致。' },
      { title: '嚴格品質把關 (QA)', desc: '制定端到端測試計劃與驗收清單，確保如期如質上線交付。' }
    ],
    description: '讓軟體開發過程不再充滿未知與延宕，以專業的管理流程護航專案順利落地落地。'
  }
};

const modalElement = document.getElementById('serviceDetailModal');
if (modalElement && typeof bootstrap !== 'undefined') {
  const serviceModal = new bootstrap.Modal(modalElement);
  const modalLabel = document.getElementById('serviceModalLabel');
  const modalCategory = document.getElementById('modalCategory');
  const modalIcon = document.getElementById('modalIcon');
  const modalTagline = document.getElementById('modalTagline');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalDescription = document.getElementById('modalDescription');

  function openServiceModal(serviceKey) {
    const data = serviceDetails[serviceKey];
    if (!data) return;

    modalLabel.textContent = data.title;
    modalCategory.textContent = data.category;
    modalIcon.src = data.icon;
    modalIcon.alt = data.title;
    modalTagline.textContent = data.tagline;
    modalDescription.textContent = data.description;

    modalHighlights.innerHTML = data.highlights.map(h => `
      <div class="col-md-6">
        <div class="p-3 modal-highlight-card h-100">
          <div class="modal-highlight-title mb-1" style="font-size: 0.95rem;">${h.title}</div>
          <div class="small modal-highlight-desc" style="line-height: 1.5;">${h.desc}</div>
        </div>
      </div>
    `).join('');

    serviceModal.show();
  }

  document.querySelectorAll('.service-card[data-service]').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-service');
      openServiceModal(key);
    });

    // 支援鍵盤 Enter / Space 操作無障礙
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const key = card.getAttribute('data-service');
        openServiceModal(key);
      }
    });
  });
}

