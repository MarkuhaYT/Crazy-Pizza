// НАВИГАЦИЯ ПО САЙТУ (SPA)
function navigate(pageId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
    document.getElementById(pageId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// СЛАЙДЕР АКЦИЙ
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
if(slides.length > 0) {
    slides[0].classList.add('active');
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000); // Меняем каждые 4 секунды
}

// ГЕНЕРАЦИЯ МЕНЮ (Заглушки категорий)
const categories = [
    { name: "Десерты", img: "https://placehold.co/300x200/e9c46a/white?text=Десерт" },
    { name: "Пицца", img: "https://placehold.co/300x200/e63946/white?text=Пицца" },
    { name: "Лапша", img: "https://placehold.co/300x200/f4a261/white?text=Лапша" },
    { name: "Роллы", img: "https://placehold.co/300x200/2a9d8f/white?text=Роллы" },
    { name: "Акции На Роллы", img: "https://placehold.co/300x200/e76f51/white?text=Сет" },
    { name: "Горячие Роллы", img: "https://placehold.co/300x200/264653/white?text=Темпура" },
    { name: "Запечённые Роллы", img: "https://placehold.co/300x200/e9c46a/white?text=Запеченные" },
    { name: "Бургеры", img: "https://placehold.co/300x200/8ab17d/white?text=Бургер" },
    { name: "Сендвичи", img: "https://placehold.co/300x200/f4a261/white?text=Сендвич" },
    { name: "Блюда Во Фритюре", img: "https://placehold.co/300x200/e63946/white?text=Фритюр" },
    { name: "Салаты", img: "https://placehold.co/300x200/2a9d8f/white?text=Салат" },
    { name: "Напитки", img: "https://placehold.co/300x200/264653/white?text=Напиток" }
];

const menuContainer = document.getElementById('menu-container');

categories.forEach(cat => {
    // Создаем карточку товара (Стеклянную)
    const div = document.createElement('div');
    div.className = 'menu-item glass';
    // Назначаем фейковую цену от 200 до 800 руб
    const price = Math.floor(Math.random() * 600) + 200; 
    
    div.innerHTML = `
        <img src="${cat.img}" alt="${cat.name}">
        <h3>${cat.name}</h3>
        <p>Описание для позиции: Вкуснейший продукт из категории ${cat.name.toLowerCase()}.</p>
        <div class="price">${price} ₽</div>
        <button class="btn-primary" onclick="addToCart('${cat.name}', ${price})">В корзину</button>
    `;
    menuContainer.appendChild(div);
});

// СИСТЕМА КОРЗИНЫ
let cart = [];

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    // Маленькая анимация кнопки корзины
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => cartIcon.style.transform = 'scale(1)', 200);
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const itemsContainer = document.getElementById('cart-items');
    itemsContainer.innerHTML = '';
    
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        itemsContainer.innerHTML += `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #ccc; padding-bottom:5px;">
                <span>${item.name}</span>
                <span>${item.price} ₽</span>
            </div>
        `;
    });
    document.getElementById('total-price').innerText = total;
}

// ЛОГИКА АВТОРИЗАЦИИ (Визуал)
let isLoginMode = true;
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    const title = document.getElementById('auth-title');
    const switchText = document.getElementById('auth-switch-text');
    const btn = document.querySelector('#authForm button');
    
    if(isLoginMode) {
        title.innerText = "Вход в аккаунт";
        btn.innerText = "Войти";
        switchText.innerHTML = `Нет аккаунта? <a href="#" onclick="toggleAuthMode()">Зарегистрироваться!</a>`;
    } else {
        title.innerText = "Регистрация";
        btn.innerText = "Создать аккаунт";
        switchText.innerHTML = `Уже есть аккаунт? <a href="#" onclick="toggleAuthMode()">Войти</a>`;
    }
}

function forgotPassword() {
    alert("Письмо с инструкцией по восстановлению отправлено на вашу почту!");
}