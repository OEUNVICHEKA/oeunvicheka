// ---------- GLOBAL CART STATE ----------
const cartStorageKey = 'northstar-cart-count';
window.cartCount = Number(window.localStorage?.getItem(cartStorageKey) || 0);

function updateCartPillCount() {
    const cartPills = document.querySelectorAll('.cart-pill-count');
    cartPills.forEach((pill) => {
        pill.textContent = String(window.cartCount);
    });
}

function persistCartCount() {
    window.localStorage?.setItem(cartStorageKey, String(window.cartCount));
    updateCartPillCount();
}

// ---------- LOGIN HANDLER (no database) ----------
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email')?.value || '';
    const password = document.getElementById('password')?.value || '';

    if (email && password) {
        alert(`✅ Demo login successful!\n\nEmail: ${email}\nPassword: ${password}\n\nNo database — this is a static demo.`);
    } else {
        alert('⚠️ Please fill in both fields.');
    }
}

// ---------- ADD TO CART ----------
function addToCart(productName, price) {
    window.cartCount += 1;
    persistCartCount();
    showCartNotification(productName, window.cartCount);
    console.log(`Added ${productName} for $${price}`);
}

// ---------- CART NOTIFICATION ----------
function showCartNotification(productName, count) {
    let notification = document.querySelector('.cart-notification');

    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'cart-notification';
        document.body.appendChild(notification);
    }

    notification.innerHTML = `${productName} added to cart <span class="cart-count">${count}</span>`;
    notification.classList.add('show');

    clearTimeout(showCartNotification.timer);
    showCartNotification.timer = setTimeout(() => {
        notification.classList.remove('show');
    }, 2200);
}

// ---------- REVEAL ANIMATIONS ----------
function initRevealAnimations() {
    const revealItems = document.querySelectorAll('.reveal');

    if (!revealItems.length) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
}

// ---------- HEADER SCROLL STATE ----------
function initHeaderScrollState() {
    const onScroll = () => {
        document.body.classList.toggle('scrolled', window.scrollY > 18);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

// ---------- CATEGORY FILTER HANDLER ----------
document.addEventListener('DOMContentLoaded', function() {
    updateCartPillCount();
    initHeaderScrollState();
    initRevealAnimations();

    const tabs = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.product-card');

    if (tabs.length && cards.length) {
        tabs.forEach((tab) => {
            tab.addEventListener('click', function() {
                const selectedCategory = this.dataset.category;

                tabs.forEach((btn) => btn.classList.remove('active'));
                this.classList.add('active');

                cards.forEach((card) => {
                    const shouldShow = selectedCategory === 'all' || card.dataset.category === selectedCategory;
                    card.style.display = shouldShow ? '' : 'none';
                });
            });
        });
    }

    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('📬 Message sent! (Demo — no data is stored).');
            this.reset();
        });
    }
});

console.log('✅ Website loaded — static HTML with no database.');