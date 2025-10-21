const API = 'https://dummyjson.com/products?limit=12';
const portfolios_type = document.querySelector('.portfolios__type');
const portfolios_item = document.querySelector('.portfolios__item');

let categories = [];
let products = [];
const productCategory = [];
document.addEventListener('DOMContentLoaded', init);

async function init() {
  if(!portfolios_item || portfolios_item === null){
    return;
  }
  try {
    const res = await fetch(API);
    const data = await res.json();
    products = data.products || [];

    categories = [...new Set(products.map(item => item.category))];

    portfolios_type.innerHTML = ['all', ...categories]
      .map(b => `<button type="button" class="brand-btn" data-brand="${b}">${b}</button>`)
      .join('');

    renderProducts(products);

    // Event delegation: 1 listener cho container
    portfolios_type.addEventListener('click', (e) => {
      const btn = e.target.closest('.brand-btn');
      if (!btn) return;
      e.preventDefault(); // ngăn hành vi mặc định (an toàn)

      // remove active từ tất cả, add active cho nút click
      const allBtns = portfolios_type.querySelectorAll('.brand-btn');
      allBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const brand = btn.dataset.brand;
      if (brand === 'all') {
        renderProducts(products);
      } else {
        const filtered = products.filter(p => p.category === brand);
        renderProducts(filtered);
         productCategory = filtered;
      }
    });

    // set nút "all" mặc định active (nếu tồn tại)
    const firstBtn = portfolios_type.querySelector('.brand-btn');
    if (firstBtn) firstBtn.classList.add('active');

  } catch (err) {
    console.error('Fetch error:', err);
    portfolios_item.innerHTML = '<p>Không tải được sản phẩm. Vui lòng thử lại sau.</p>';
  }
}

function renderProducts(list) {
  if (!Array.isArray(list) || list.length === 0) {
    portfolios_item.innerHTML = '<p>Không có sản phẩm phù hợp.</p>';
    return;
  }

   portfolios_item.innerHTML = list.map(p => `
    <div class="product-card" data-id="${p.id}" data-category="${p.category}">
      <a href="portfolio_detail.html?category=${encodeURIComponent(p.category)}&id=${p.id}">
        <img src="${p.images && p.images[0] ? p.images[0] : ''}" alt="${(p.title)}" />
        <span class="badges">${(p.category)}</span>
      </a>
    </div>
  `).join('');
}

const navLinks = document.querySelectorAll(".sider a");

navLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    // bỏ active ở tất cả link
    navLinks.forEach(l => l.classList.remove("active"));
    // thêm active cho link đang click
    this.classList.add("active");
  });
});
/* ==== Reveal on Scroll (paste vào cuối main.js) ==== */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const singleSelectors = [
      'header',                 // nếu bạn dùng header ở đầu
      '.isme',                  // hero
      '.barbox',                // title + description của mỗi section
      '.about__img',
      '.about__info',
      '.about__client-info',
      '.skill__progress-item-box',
      '.resume__box-item',
      '.contact__location',
      '.contact__forms',
      'footer',
      '.sider__avatar',
      '.sider__name',
      '.sider__link',
      '.sider__content-box'
    ];

    const containerSelectors = [
      '.grid',
      '.portfolios__item',
      '.about__client .row',
      '.skill__progress .row',
      '.resume__box',
      '.services .row',
      '.portfolios__type',
      '.portfolios__item'
    ];
    // Gán lớp reveal-hidden cho các phần tử tìm thấy
    try {
      const singles = document.querySelectorAll(singleSelectors.join(','));
      singles.forEach(el => {
        if (!el.classList.contains('reveal-hidden') && !el.classList.contains('reveal-show')) {
          el.classList.add('reveal-hidden');
        }
      });
      const containers = document.querySelectorAll(containerSelectors.join(','));
      containers.forEach(container => {
        const children = Array.from(container.children).filter(Boolean);
        children.forEach((ch, idx) => {
          if (!ch.classList.contains('reveal-hidden') && !ch.classList.contains('reveal-show')) {
            ch.classList.add('reveal-hidden');
            ch.style.setProperty('--i', idx);
          }
        });
      });
    } catch (err) {
      console.warn('Reveal setup error:', err);
    }
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-hidden').forEach(el => {
        el.classList.remove('reveal-hidden');
        el.classList.add('reveal-show');
      });
      return;
    }
    const options = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.25
    };
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const dd = el.getAttribute('data-delay');
          if (dd) el.style.setProperty('--delay', dd);

          el.classList.add('reveal-show');
          observer.unobserve(el);
        }
      });
    }, options);
    document.querySelectorAll('.reveal-hidden').forEach(el => io.observe(el));
  });
})();
