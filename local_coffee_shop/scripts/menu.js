async function loadMenu() {
    try {
      const response = await fetch('data/menus.json');
      const data = await response.json();
  
      const menu = data.menu; // Access the actual array inside the object
  
      if (!Array.isArray(menu)) {
        throw new Error('Menu data is not an array');
      }
  
      const menuContainer = document.querySelector('.menu-container');
  
      menu.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
  
        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <span class="price">$${item.price.toFixed(2)}</span>
        `;
  
        menuContainer.appendChild(card);
      });
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadMenu);
  