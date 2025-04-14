document.addEventListener('DOMContentLoaded', function () {
    // Set the current timestamp when the page loads
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const currentDate = new Date();
        timestampField.value = currentDate.toISOString();  // Sets the timestamp in ISO format
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Open modal
        document.querySelectorAll('.open-modal').forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                const modalId = link.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'block';
                }
            });
        });
    
        // Close modal
        document.querySelectorAll('.modal button').forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });
    
        // Close modal when clicking outside the modal content
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', event => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    });
    
    // Optionally: prevent form submission if timestamp is missing
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        if (!timestampField.value) {
            alert("Something went wrong. Please try again.");
            event.preventDefault(); // Prevent form submission
        }
    });
});
