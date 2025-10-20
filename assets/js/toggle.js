document.addEventListener('DOMContentLoaded', () => {
			const toggle = document.getElementById('siderToggleBtn');
			const sider = document.querySelector('.sider');
			if (toggle && sider) {
				toggle.addEventListener('click', () => {
					sider.classList.toggle('active');
                    console.log('cai');
				});
			}
		});