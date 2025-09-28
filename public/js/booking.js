// public/js/booking.js - Cleaned and optimized version
document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("bookingForm");
    const loadingOverlay = document.getElementById("loadingOverlay");
    const successModal = document.getElementById("successModal");
    const closeModalBtn = document.querySelector(".close-modal");
    const eventDateInput = document.getElementById('eventDate');

    // Set minimum date to today
    eventDateInput.min = new Date().toISOString().split('T')[0];

    // Modal functions
    function openSuccessModal() {
        successModal.style.display = "flex";
        successModal.classList.add('active');
    }

    function closeSuccessModal() {
        successModal.style.display = "none";
        successModal.classList.remove('active');
    }

    // Close modal events
    closeModalBtn.addEventListener("click", closeSuccessModal);
    
    // Close modal when clicking outside
    successModal.addEventListener("click", (e) => {
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && successModal.style.display === "flex") {
            closeSuccessModal();
        }
    });

    // Make function globally available
    window.closeSuccessModal = closeSuccessModal;

    // Single form submission handler
    bookingForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Show loading overlay
        loadingOverlay.style.display = "flex";

        // Collect form data
        const formData = new FormData(bookingForm);
        const payload = Object.fromEntries(formData.entries());
        
        // Get all checked preferences
        payload.preferences = Array.from(document.querySelectorAll('input[name="preferences"]:checked'))
            .map(checkbox => checkbox.value);

        console.log('Submitting booking:', payload); // Debug log

        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            
            // Hide loading overlay
            loadingOverlay.style.display = "none";

            if (response.ok && data.ok) {
                // Success - show modal and reset form
                openSuccessModal();
                bookingForm.reset();
                
                // Debug log
                console.log('Booking submitted successfully:', data);
            } else {
                // Error handling
                const errorMessage = data.message || "An error occurred while submitting your request.";
                alert(errorMessage);
                console.error('Server error:', data);
            }
        } catch (error) {
            // Network error
            loadingOverlay.style.display = "none";
            alert("Network error. Please check your connection and try again.");
            console.error('Network error:', error);
        }
    });

    // Enhanced checkbox styling (visual feedback)
    const checkboxes = document.querySelectorAll('input[name="preferences"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.closest('.checkbox-label');
            if (this.checked) {
                label.style.borderColor = 'var(--primary-color)';
                label.style.backgroundColor = 'rgba(232, 117, 26, 0.1)';
            } else {
                label.style.borderColor = 'var(--border-color)';
                label.style.backgroundColor = 'var(--bg-highlight)';
            }
        });
    });

    // Form validation enhancements
    bookingForm.addEventListener('input', (e) => {
        const target = e.target;
        if (target.hasAttribute('required') && target.value.trim() !== '') {
            target.style.borderColor = 'var(--success-color, #28a745)';
        } else if (target.hasAttribute('required')) {
            target.style.borderColor = 'var(--error-color, #dc3545)';
        }
    });

    // Auto-format phone number
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            // Limit to 11 digits
            value = value.slice(0, 11);
            // Format as (XXX) XXX-XXXXX
            if (value.length > 0) {
                value = '(' + value;
                if (value.length > 3) {
                    value = value.slice(0, 4) + ') ' + value.slice(4);
                }
                if (value.length > 9) {
                    value = value.slice(0, 9) + '-' + value.slice(9);
                }
            }
            e.target.value = value;
        });
    }
});

// Optional: Add some utility functions
function formatDateForDisplay(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Example: If you want to show the formatted date in the success modal
function populateSuccessModal(data) {
    const modal = document.getElementById('successModal');
    if (modal) {
        const eventDateElement = modal.querySelector('#eventDateDisplay');
        if (eventDateElement && data.eventDate) {
            eventDateElement.textContent = formatDateForDisplay(data.eventDate);
        }
    }
}