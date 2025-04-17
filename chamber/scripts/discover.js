// Function to display the last visit message
function showLastVisitMessage() {
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = new Date();
    const messageElement = document.createElement('div');
    messageElement.classList.add('visitor-message');
    messageElement.setAttribute('aria-live', 'polite');

    if (!lastVisit) {
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const timeDiff = currentDate - lastVisitDate;
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

        messageElement.textContent =
            daysDiff === 0
                ? "Back so soon! Awesome!"
                : `You last visited ${daysDiff} ${daysDiff === 1 ? "day" : "days"} ago.`;
    }

    document.body.insertBefore(messageElement, document.body.firstChild);
    localStorage.setItem('lastVisit', currentDate.getTime().toString());
}

// Function to dynamically load cards from JSON
async function loadCards() {
    try {
        const response = await fetch('data/items.json');
        if (!response.ok) throw new Error('Failed to load data');

        const data = await response.json();
        const gridContainer = document.getElementById('discover');
        if (!gridContainer) return;

        data.items.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.gridArea = `card${index + 1}`;

            card.innerHTML = `
                <figure>
                    <img src="images/${item.image}" alt="${item.title}" loading="lazy" width="400" height="250">
                </figure>
                <h2>${item.title}</h2>
                <address>${item.address}</address>
                <p>${item.description}</p>
                <button aria-label="Learn more about ${item.title}">Learn More</button>
            `;
            gridContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading cards:', error);
    }
}

loadCards();
showLastVisitMessage();
