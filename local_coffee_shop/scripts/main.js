// Hamburger menu toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
  });
  
  // Track last visit using localStorage
  const visitMessage = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("lastVisit");
  
  if (lastVisit) {
    const lastDate = new Date(lastVisit);
    const now = new Date();
    const diffTime = Math.abs(now - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    visitMessage.textContent = `Welcome back! It's been ${diffDays} day(s) since your last visit.`;
  } else {
    visitMessage.textContent = "Welcome to Bright Haven! This is your first visit.";
  }
  
  localStorage.setItem("lastVisit", new Date().toISOString());
  
  // Load menu items dynamically from JSON
  async function loadMenu() {
    try {
      const response = await fetch("data/menu.json");
      const data = await response.json();
      const menuContainer = document.querySelector(".menu-preview");
  
      data.menu.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <strong>$${item.price.toFixed(2)}</strong>
        `;
        menuContainer.appendChild(div);
      });
    } catch (error) {
      console.error("Error loading menu:", error);
    }
  }
  
  loadMenu();
  


  // Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

fadeElements.forEach(el => observer.observe(el));
