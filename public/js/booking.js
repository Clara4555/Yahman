    // public/js/booking.js
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  const loadingOverlay = document.getElementById("loadingOverlay");
  const successModal = document.getElementById("successModal");
  const closeModalBtn = document.querySelector(".close-modal");

  function openSuccessModal() {
    successModal.style.display = "flex";
  }
  function closeSuccessModal() {
    successModal.style.display = "none";
  }
  window.closeSuccessModal = closeSuccessModal;
  closeModalBtn.addEventListener("click", closeSuccessModal);

  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    loadingOverlay.style.display = "flex";

    const formData = new FormData(bookingForm);
    const payload = Object.fromEntries(formData.entries());
    payload.preferences = formData.getAll("preferences");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      loadingOverlay.style.display = "none";

      if (res.ok && data.ok) {
        openSuccessModal();
        bookingForm.reset();
      } else {
        alert(data.message || "An error occurred while submitting your request.");
      }
    } catch (err) {
      loadingOverlay.style.display = "none";
      alert("Network error, please try again later.");
      console.error(err);
    }
  });
});

// Set minimum date to today
document.getElementById('eventDate').min = new Date().toISOString().split('T')[0];

// Form submission handling
document.getElementById('bookingForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const payload = Object.fromEntries(formData.entries());
            payload.preferences = formData.getAll('preferences');
            
            // Show loading
            document.getElementById('loadingOverlay').style.display = 'flex';
            
            try {
                const response = await fetch('/api/bookings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });
                
                const data = await response.json();
                
                // Hide loading
                document.getElementById('loadingOverlay').style.display = 'none';
                
                if (data.ok) {
                    // Show success modal
                    document.getElementById('successModal').style.display = 'flex';
                    this.reset();
                } else {
                    alert('Error: ' + data.message);
                }
            } catch (error) {
                document.getElementById('loadingOverlay').style.display = 'none';
                alert('Network error. Please try again.');
            }
        });

        function closeSuccessModal() {
            document.getElementById('successModal').style.display = 'none';
        }

        // Close modal when clicking X
        document.querySelector('.close-modal').addEventListener('click', closeSuccessModal);
  