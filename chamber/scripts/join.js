document.addEventListener('DOMContentLoaded', function () {
    // Set the current timestamp when the page loads
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const currentDate = new Date();
        timestampField.value = currentDate.toISOString();  // Sets the timestamp in ISO format
    }

    // Bootstrap Modal functionality (if using Bootstrap 5)
    const modals = document.querySelectorAll('[data-bs-toggle="modal"]');
    modals.forEach(modalTrigger => {
        modalTrigger.addEventListener('click', function () {
            const modalId = this.getAttribute('data-bs-target').substring(1); // Remove # from id
            const modal = document.getElementById(modalId);
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
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
