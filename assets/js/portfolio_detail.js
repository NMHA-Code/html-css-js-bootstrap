const API = 'https://dummyjson.com/products?limit=12';
let products = [];

document.addEventListener('DOMContentLoaded', async () => {
  const innerbox = document.querySelector('.carousel-inner');

  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get('category');
  try {
    const res = await fetch(API);
    const data = await res.json();
    products = data.products || [];

    let filtered = products;
    if (categoryParam) {
      filtered = products.filter(p => p.category === categoryParam);
    }

    if (!Array.isArray(filtered) || filtered.length === 0) {
      innerbox.innerHTML = `
        <div class="carousel-item active">
          <img src="https://via.placeholder.com/1200x700?text=No+items" class="d-block w-100" alt="no items">
        </div>
      `;
      return;
    }

    // tạo các carousel-item; nhớ add 'active' cho item đầu
    innerbox.innerHTML = filtered.map((e, i) => `
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
        <img src="${e.images && e.images[0] ? e.images[0] : 'https://via.placeholder.com/1200x700?text=No+image'}"
             class="d-block" alt="${e.title || `slide-${i}`}">
      </div>
    `).join('');

  } catch (err) {
    console.error('Fetch error:', err);
    innerbox.innerHTML = `
      <div class="carousel-item active">
        <img src="https://via.placeholder.com/1200x700?text=Error+loading" class="d-block w-100" alt="error">
      </div>
    `;
  }
});