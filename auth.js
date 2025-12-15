// Auth state
let currentUser = null;
let token = localStorage.getItem('token');

// DOM Elements
const loginBtns = document.querySelectorAll('.btn-login');
const signupBtns = document.querySelectorAll('.btn-signup');
// Dùng nút đầu tiên cho việc ẩn/hiện theo trạng thái đăng nhập (thường là nút trên header)
const loginBtn = loginBtns[0];
const signupBtn = signupBtns[0];
const userMenu = document.querySelector('.user-menu');
const usernameSpan = document.querySelector('.username');
const logoutBtn = document.querySelector('.btn-logout');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');

// API Base URL (Update this with your actual backend URL)
const API_URL = 'http://localhost:5000/api';

// Update UI based on auth state
function updateAuthUI() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Trang index luôn hiển thị nút đăng nhập / đăng ký
    if (currentPage === 'index.html') {
        if (loginBtn) {
            loginBtn.style.display = 'inline-flex';
        }
        if (signupBtn) {
            signupBtn.style.display = 'inline-flex';
        }
        // Trang index không có userMenu, nên không xử lý phần đó
        return;
    }

    if (currentUser) {
        // User is logged in
        if (loginBtn) {
            loginBtn.style.display = 'none';
        }
        if (signupBtn) {
            signupBtn.style.display = 'none';
        }
        if (userMenu) {
            userMenu.style.display = 'flex';
        }
        if (usernameSpan && currentUser.username) {
            usernameSpan.textContent = currentUser.username;
        }
    } else {
        // User is not logged in
        if (loginBtn) {
            loginBtn.style.display = 'block';
        }
        if (signupBtn) {
            signupBtn.style.display = 'block';
        }
        if (userMenu) {
            userMenu.style.display = 'none';
        }
    }
}

// Hiển thị thông báo lỗi
function showError(element, message) {
    let errorElement = element.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        element.parentNode.insertBefore(errorElement, element.nextSibling);
    }
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Clear error messages
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
    });
}

// Login function (fake hoàn toàn trên frontend)
async function login(email, password) {
    // Tài khoản mặc định trên frontend
    if (email === 'admin1@gmail.com' && password === '123456') {
        currentUser = { username: 'admin1', email };
        // Lưu token giả để các trang khác nhận biết đã đăng nhập
        localStorage.setItem('token', 'dummy-admin-token');
        token = 'dummy-admin-token';
        updateAuthUI();
        return { success: true };
    }

    // Cho phép đăng nhập fake với bất kỳ email/password nào hợp lệ
    if (email && password) {
        const usernameFromEmail = email.split('@')[0] || 'user';
        currentUser = { username: usernameFromEmail, email };
        localStorage.setItem('token', 'dummy-user-token');
        token = 'dummy-user-token';
        updateAuthUI();
        return { success: true };
    }

    return { success: false, error: 'Đăng nhập không thành công' };
}

// Register function (fake hoàn toàn trên frontend)
async function register(username, email, password) {
    // Chỉ kiểm tra đơn giản dữ liệu đầu vào
    if (!username || !email || !password) {
        return { success: false, error: 'Vui lòng điền đầy đủ thông tin' };
    }

    if (password.length < 6) {
        return { success: false, error: 'Mật khẩu phải có ít nhất 6 ký tự' };
    }

    // Đăng ký fake: có thể lưu sơ trong localStorage nếu cần
    const fakeUsers = JSON.parse(localStorage.getItem('fakeUsers') || '[]');
    const exists = fakeUsers.find(u => u.email === email);
    if (exists) {
        return { success: false, error: 'Email đã được sử dụng (fake)' };
    }

    fakeUsers.push({ username, email, password });
    localStorage.setItem('fakeUsers', JSON.stringify(fakeUsers));

    return { success: true };
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    currentUser = null;
    updateAuthUI();
    // Redirect to login page
    window.location.href = 'index.html';
}

// Check if user is logged in on page load (fake, chỉ dựa vào localStorage)
async function checkAuth() {
    token = localStorage.getItem('token');

    if (token) {
        try {
            // Lấy thông tin user fake từ localStorage nếu có
            const fakeUsers = JSON.parse(localStorage.getItem('fakeUsers') || '[]');
            // Ưu tiên admin nếu token admin
            if (token === 'dummy-admin-token') {
                currentUser = { username: 'admin1', email: 'admin1@gmail.com' };
            } else {
                // Lấy user đầu tiên trong danh sách fakeUsers làm currentUser
                if (fakeUsers.length > 0) {
                    const u = fakeUsers[0];
                    currentUser = { username: u.username, email: u.email };
                }
            }
        } catch (error) {
            console.error('Auth check error (fake):', error);
            localStorage.removeItem('token');
            currentUser = null;
        }
    } else {
        currentUser = null;
    }

    updateAuthUI();

    // Nếu chưa đăng nhập và không ở trang đăng nhập thì chuyển về index.html
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (!currentUser && currentPage !== 'index.html') {
        window.location.href = 'index.html';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();

    // Open login modal từ tất cả các nút Đăng Nhập
    loginBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            clearErrors();
            loginModal.classList.add('show');
        });
    });

    // Open signup modal từ tất cả các nút Đăng Ký
    signupBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            clearErrors();
            signupModal.classList.add('show');
        });
    });

    // Close modals when clicking the X
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
                clearErrors();
            }
        });
    });

    // Close modal when clicking outside the content
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
            clearErrors();
        }
    });

    // Login form submission
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrors();

            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;

            // Kiểm tra dữ liệu nhập chi tiết
            if (!email && !password) {
                showError(e.target, 'Bạn chưa nhập thông tin');
                return;
            }

            if (!email) {
                showError(e.target, 'Bạn chưa nhập tên');
                return;
            }

            if (!password) {
                showError(e.target, 'Bạn chưa nhập mật khẩu');
                return;
            }

            const result = await login(email, password);
            
            if (result.success) {
                if (loginModal) {
                    loginModal.classList.remove('show');
                }
                loginForm.reset();
                // Đăng nhập thành công -> vào trang cửa hàng
                window.location.href = 'shop.html';
            } else {
                showError(e.target, result.error);
            }
        });
    }

    // Signup form submission
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrors();
            
            const username = document.getElementById('signup-username').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value;
            
            // Kiểm tra dữ liệu nhập
            if (!username || !email || !password) {
                showError(e.target, 'Vui lòng điền đầy đủ thông tin');
                return;
            }
            
            if (password.length < 6) {
                showError(document.getElementById('signup-password'), 'Mật khẩu phải có ít nhất 6 ký tự');
                return;
            }
            
            const result = await register(username, email, password);
            
            if (result.success) {
                // Auto login after successful registration
                const loginResult = await login(email, password);
                if (loginResult.success) {
                    if (signupModal) {
                        signupModal.classList.remove('show');
                    }
                    signupForm.reset();
                    // Sau khi đăng ký + đăng nhập tự động, chuyển tới cửa hàng
                    window.location.href = 'shop.html';
                } else {
                    showError(e.target, 'Đăng ký thành công nhưng đăng nhập thất bại. Vui lòng đăng nhập thủ công.');
                }
            } else {
                showError(e.target, result.error);
            }
        });
    }

    // Logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});
