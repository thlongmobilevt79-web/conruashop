// Animation on scroll
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('visible');
        }
    });
}

// Initialize animations
function initAnimations() {
    // Add loaded class to navbar after a short delay for better visual effect
    setTimeout(() => {
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.classList.add('loaded');
    }, 500);

    // Make hero section visible
    const hero = document.querySelector('.hero');
    if (hero) {
        setTimeout(() => {
            hero.classList.add('visible');
        }, 300);
    }

    // Initial check for elements in viewport
    animateOnScroll();

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);

    // Add smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add hover effect for game cards
function addHoverEffects() {
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(255, 105, 180, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
    });
}

// Sample game data
const games = [
    {
        id: 1,
        title: "The Last of Us™ Part I",
        price: 1399000,
        image: "images/df108e45b8df339b9e21c5906bde3371.jpg",
        category: "Sinh Tồn"
    },
    {
        id: 2,
        title: "ELDEN RING",
        price: 990000,
        image: "images/81bc56504d8c987deb8880fc6763913f.jpg",
        category: "SOULS-LIKE"
    },
    {
        id: 3,
        title: "Assassin’s Creed Shadows",
        price: 1190000,
        image: "images/694bba0380b7d9e07da29ca62ea181eb.jpg",
        category: "Ninja"
    },
    {
        id: 4,
        title: "Solo Leveling: ARISE OVERDRIVE",
        price: 790000,
        image: "images/ef6ba2ff386f80af53acb9a8164b0b59.jpg",
        category: "Chiến Thuật"
    },
    {
        id: 5,
        title: "Stray",
        price: 379000,
        image: "images/fc84ea0b1645920cd6dfb745d339b032.jpg",
        category: "Phiêu Lưu"
    },
    {
        id: 6,
        title: "Marvel’s Spider-Man Remastered",
        price: 499000,
        image: "images/ff0d0c6dac87c9089f360c9602400fc0.jpg",
        category: "Hành Động"
    }
];

// DOM Elements
const gameGrid = document.querySelector('.game-grid');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    addHoverEffects();
    displayGames();
    
    // Add cart icon to header
    const header = document.querySelector('header');
    if (header) {
        const cartIcon = document.createElement('div');
        cartIcon.className = 'cart-icon';
        cartIcon.innerHTML = '<i class="fas fa-shopping-cart"></i>';
        cartIcon.addEventListener('click', toggleCart);
        header.querySelector('.nav-links').appendChild(cartIcon);
    }
    
    // Add cart dropdown
    const cartDropdown = document.createElement('div');
    cartDropdown.className = 'cart-dropdown';
    cartDropdown.innerHTML = `
        <div class="cart-header">
            <h3>Giỏ hàng của bạn</h3>
            <button class="close-cart">&times;</button>
        </div>
        <div class="cart-items">
            <p class="empty-cart-message">Giỏ hàng của bạn đang trống</p>
        </div>
        <div class="cart-footer">
            <div class="cart-total">Tổng cộng: $0.00</div>
            <button class="btn-primary checkout-btn">Thanh toán</button>
        </div>
    `;
    document.body.appendChild(cartDropdown);
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        const cartDropdown = document.querySelector('.cart-dropdown');
        const cartIcon = document.querySelector('.cart-icon');
        if (cartDropdown && cartDropdown.classList.contains('active') && 
            !cartDropdown.contains(e.target) && !cartIcon.contains(e.target)) {
            cartDropdown.classList.remove('active');
        }
    });
    
    // Close button
    const closeCartBtn = document.querySelector('.close-cart');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            document.querySelector('.cart-dropdown').classList.remove('active');
        });
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                showNotification('Chức năng thanh toán đang được phát triển!');
            } else {
                showNotification('Vui lòng thêm sản phẩm vào giỏ hàng!');
            }
        });
    }
    
    // Add animation for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.style.transitionDelay = `${0.1 * index}s`;
    });
});

// Toggle cart dropdown
function toggleCart() {
    const cartDropdown = document.querySelector('.cart-dropdown');
    if (cartDropdown) {
        cartDropdown.classList.toggle('active');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation for game cards when they are added to the DOM
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            const gameCards = document.querySelectorAll('.game-card');
            gameCards.forEach((card, index) => {
                if (!card.classList.contains('animated')) {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
                    card.style.transitionDelay = `${0.1 * (index % 4)}s`;
                    card.classList.add('animated');
                    
                    // Trigger reflow
                    void card.offsetWidth;
                    
                    // Add visible class to trigger animation
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            });
        }
    });
});

// Start observing the game grid for changes
if (gameGrid) {
    observer.observe(gameGrid, { childList: true, subtree: true });
}

// Shopping cart state
let cart = [];

// Add to cart functionality with animation
function addToCart(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    // Add to cart array
    const existingItem = cart.find(item => item.id === gameId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...game,
            quantity: 1
        });
    }

    // Update cart UI
    updateCartUI();
    updateCartCount();
    showNotification('Đã thêm vào giỏ hàng!');
}

// Remove item from cart
function removeFromCart(gameId) {
    const itemIndex = cart.findIndex(item => item.id === gameId);
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        updateCartUI();
        updateCartCount();
    }
}

// Update cart UI
function updateCartUI() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    
    if (!cartItems) return;
    
    // Clear current items
    cartItems.innerHTML = '';
    
    // Add all items to cart
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h4>${item.title}</h4>
                <p>$${item.price.toFixed(2)} × ${item.quantity} = $${itemTotal.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">Xóa</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Update total
    if (cartTotal) {
        cartTotal.textContent = `Tổng cộng: $${total.toFixed(2)}`;
    }
    
    // Add event listeners to new buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const gameId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(gameId);
        });
    });
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const gameId = parseInt(e.target.getAttribute('data-id'));
            if (e.target.classList.contains('plus')) {
                const item = cart.find(item => item.id === gameId);
                if (item) {
                    item.quantity += 1;
                    updateCartUI();
                    updateCartCount();
                }
            } else if (e.target.classList.contains('minus')) {
                const item = cart.find(item => item.id === gameId);
                if (item && item.quantity > 1) {
                    item.quantity -= 1;
                    updateCartUI();
                    updateCartCount();
                }
            }
        });
    });
}

// Update cart count in header
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        const countBadge = cartIcon.querySelector('.cart-count') || document.createElement('span');
        if (cartCount > 0) {
            countBadge.className = 'cart-count';
            countBadge.textContent = cartCount;
            if (!cartIcon.contains(countBadge)) {
                cartIcon.appendChild(countBadge);
            }
        } else if (cartIcon.contains(countBadge)) {
            cartIcon.removeChild(countBadge);
        }
    }
}

// Display games
function displayGames(gamesToShow = games) {
    if (!gameGrid) return;
    
    gameGrid.innerHTML = '';
    
    gamesToShow.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <img src="${game.image}" alt="${game.title}" class="game-image">
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-category">${game.category}</p>
                <p class="game-price">${game.price.toLocaleString('vi-VN')}₫</p>
                <button class="btn-primary add-to-cart" data-id="${game.id}" type="button">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        gameGrid.appendChild(gameCard);
    });
    
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const gameId = parseInt(e.target.closest('.add-to-cart').getAttribute('data-id'));
            addToCart(gameId);
            
            
            const button = e.target.closest('.add-to-cart');
            button.classList.add('added');
            setTimeout(() => button.classList.remove('added'), 1000);
        });
    });
}

// Filter games by category
function filterGames(category) {
    if (category === 'all') {
        displayGames();
        return;
    }
    const filteredGames = games.filter(game => game.category === category);
    displayGames(filteredGames);
}

// Add event listeners for category filtering
document.addEventListener('DOMContentLoaded', () => {
    // Display all games on page load
    displayGames();
    
    // Add click event to category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.querySelector('h3').textContent;
            filterGames(category);
            
            // Update active state
            categoryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });
    
    // Add hover effect to game cards
    gameGrid.addEventListener('mouseover', (e) => {
        const gameCard = e.target.closest('.game-card');
        if (gameCard) {
            gameCard.style.transform = 'translateY(-10px)';
            gameCard.style.boxShadow = '0 10px 20px rgba(255, 105, 180, 0.3)';
        }
    });
    
    gameGrid.addEventListener('mouseout', (e) => {
        const gameCard = e.target.closest('.game-card');
        if (gameCard) {
            gameCard.style.transform = 'translateY(0)';
            gameCard.style.boxShadow = 'none';
        }
    });
});

// Add to cart functionality with animation
function addToCart(gameId) {
    const button = event.target;
    const game = games.find(g => g.id === gameId);
    
    if (button && game) {
        // Add visual feedback
        button.textContent = 'Added!';
        button.style.backgroundColor = '#4CAF50';
        
        // Create flying cart animation
        const cartIcon = document.createElement('div');
        cartIcon.innerHTML = '';
        cartIcon.style.position = 'fixed';
        cartIcon.style.fontSize = '24px';
        cartIcon.style.zIndex = '9999';
        cartIcon.style.pointerEvents = 'none';
        
        const rect = button.getBoundingClientRect();
        const cartRect = document.querySelector('.cart-icon')?.getBoundingClientRect() || { left: window.innerWidth - 50, top: 20 };
        
        cartIcon.style.left = rect.left + 'px';
        cartIcon.style.top = rect.top + 'px';
        
        document.body.appendChild(cartIcon);
        
        // Animate to cart
        const animation = cartIcon.animate([
            { left: rect.left + 'px', top: rect.top + 'px', opacity: 1 },
            { left: cartRect.left + 'px', top: cartRect.top + 'px', opacity: 0, transform: 'scale(0.5)' }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => {
            document.body.removeChild(cartIcon);
            // Reset button after animation
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.style.backgroundColor = '';
            }, 1000);
        };
        
        // Implementation for adding to cart
        console.log(`Added game ${gameId} to cart`);
    }
}

// Search functionality
const searchContainer = document.createElement('div');
searchContainer.className = 'search-container';

const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search games...';
searchInput.className = 'search-input';

searchContainer.appendChild(searchInput);

// Insert search before user actions in navbar
const navbar = document.querySelector('.navbar');
const userActions = document.querySelector('.user-actions');
if (navbar && userActions) {
    navbar.insertBefore(searchContainer, userActions);
}

// Debounce search for better performance
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.trim().toLowerCase();
        const filteredGames = searchTerm === '' 
            ? games 
            : games.filter(game => 
                game.title.toLowerCase().includes(searchTerm) || 
                game.category.toLowerCase().includes(searchTerm)
            );
        displayGames(filteredGames);
    }, 300);
});
