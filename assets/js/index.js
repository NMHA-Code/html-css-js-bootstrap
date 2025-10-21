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