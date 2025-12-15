document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Simple validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showError(contactForm, 'Vui lòng điền đầy đủ thông tin');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showError(contactForm, 'Vui lòng nhập địa chỉ email hợp lệ');
                return;
            }
            
            try {
                console.log('Form submitted:', formData);

                // Tạo link mở Gmail compose
                const to = encodeURIComponent(formData.email);
                const subject = encodeURIComponent(formData.subject);
                const body = encodeURIComponent(
                    `Người gửi: ${formData.name}\n\n` +
                    `Thông tin liên hệ: ${formData.subject}\n\n` +
                    `Nội dung: \n${formData.message}`
                );

                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;

                // Mở Gmail trong tab hiện tại
                window.location.href = gmailUrl;

                // Reset form sau khi chuyển hướng
                contactForm.reset();

            } catch (error) {
                console.error('Error:', error);
                showError(contactForm, 'Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau.');
            }
        });
    }
    
    // Helper function to show error messages
    function showError(formElement, message) {
        // Remove any existing error messages
        const existingError = formElement.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Create and show new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message show form-error';
        errorElement.textContent = message;
        
        // Insert the error message before the submit button
        const submitButton = formElement.querySelector('button[type="submit"]');
        formElement.insertBefore(errorElement, submitButton);
    }
});
