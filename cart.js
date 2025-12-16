// Shopping Cart Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage or create empty cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // DOM Elements
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const closeButtons = document.querySelectorAll('.close');
    
    // Sample game data (replace with your actual game data)
    const games = [
        { id: 1, title: 'Game 1', price: 29.99, image: 'images/7bd98674cda41bff89a77f381120abdc.jpg' },
        { id: 2, title: 'Game 2', price: 39.99, image: 'images/81bc56504d8c987deb8880fc6763913f.jpg' },
        { id: 3, title: 'Game 3', price: 49.99, image: 'images/df108e45b8df339b9e21c5906bde3371.jpg' },
        { id: 4, title: 'Game 4', price: 19.99, image: 'images/ef6ba2ff386f80af53acb9a8164b0b59.jpg' },
        { id: 5, title: 'Game 5', price: 59.99, image: 'images/fc84ea0b1645920cd6dfb745d339b032.jpg' },
        { id: 6, title: 'Game 6', price: 24.99, image: 'images/ff0d0c6dac87c9089f360c9602400fc0.jpg' }
    ];

    // Toggle cart modal
    cartButton.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        renderCart();
    });

    // Close modal when clicking on X
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Add to cart function (to be called when clicking Add to Cart button)
    function addToCart(gameId) {
        const game = games.find(g => g.id === gameId);
        if (!game) return;

        const existingItem = cart.find(item => item.id === gameId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: game.id,
                title: game.title,
                price: game.price,
                image: game.image,
                quantity: 1
            });
        }
        
        updateCart();
        showNotification(`Đã thêm ${game.title} vào giỏ hàng`);
    }

    // Remove item from cart
    function removeFromCart(gameId) {
        const index = cart.findIndex(item => item.id === gameId);
        if (index !== -1) {
            cart.splice(index, 1);
            updateCart();
        }
    }

    // Update cart in localStorage and UI
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }

    // Render cart items
    function renderCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Giỏ hàng của bạn đang trống</p>';
            cartTotal.textContent = '$0.00';
            return;
        }

        let itemsHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            itemsHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                    </div>
                    <button class="cart-item-remove" data-id="${item.id}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });

        cartItemsContainer.innerHTML = itemsHTML;
        cartTotal.textContent = `$${total.toFixed(2)}`;

        // Add event listeners to remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                const gameId = parseInt(e.currentTarget.getAttribute('data-id'));
                removeFromCart(gameId);
            });
        });
    }

    // Update cart count in the header
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = count;
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Add show class to trigger animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Initialize cart count on page load
    updateCartCount();
});

// Function to be called when clicking Add to Cart button
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.btn-add-to-cart, .add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const gameId = parseInt(e.currentTarget.getAttribute('data-game-id'));
            addToCart(gameId);
        });
    });
});
