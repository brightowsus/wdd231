document.addEventListener("DOMContentLoaded", () => {
  const directory = document.getElementById("directory");

  async function fetchMembers() {
    try {
      const response = await fetch("data/members.json");
      const members = await response.json();
      displayMembers(members);
    } catch (error) {
      console.error("Error loading members:", error);
    }
  }

  function displayMembers(members) {
    directory.innerHTML = "";

    members.forEach(member => {
      const card = document.createElement("div");
      card.className = "member-card";
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Level:</strong> ${getMembershipLevel(member.membership)}</p>
        <p>${member.description}</p>
      `;
      directory.appendChild(card);
    });
  }

  function getMembershipLevel(level) {
    return level === 3 ? "Gold" : level === 2 ? "Silver" : "Member";
  }

  // View toggle
  document.getElementById("grid-view").addEventListener("click", () => {
    directory.classList.add("grid");
    directory.classList.remove("list");
  });

  document.getElementById("list-view").addEventListener("click", () => {
    directory.classList.add("list");
    directory.classList.remove("grid");
  });

  // Footer content
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const modifiedEl = document.getElementById("lastModified");
  if (modifiedEl) modifiedEl.textContent = "Last Modified: " + document.lastModified;

  // Fetch members
  fetchMembers();
});

