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
