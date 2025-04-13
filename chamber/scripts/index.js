
// Fetch members for spotlights 
fetch('data/member.json')
.then(response => response.json())
.then(members => {
  const eligibleMembers = members.filter(member => ['gold', 'silver'].includes(member.membership.toLowerCase()));
  const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  const spotlightContainer = document.querySelector('.spotlight-grid');
  selected.forEach(member => {
    const card = document.createElement('article');
    card.classList.add('spotlight');
    card.innerHTML = `
      <img src="${member.logo}" alt="${member.name} Logo">
      <h3>${member.name}</h3>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      <p><strong>Membership Level:</strong> ${member.membership.charAt(0).toUpperCase() + member.membership.slice(1)}</p>
    `;
    spotlightContainer.appendChild(card);
  });
})
.catch(error => {
  console.error('Error loading member data:', error);
});
