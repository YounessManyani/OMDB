// bag.js

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('bagContainer');
    const wrapper   = document.querySelector('.checkout-wrapper');
    let list        = JSON.parse(localStorage.getItem('myList') || '[]');
  
    // Fonction unique pour afficher la liste (ou le message vide)
    function renderList() {
      container.innerHTML = '';
  
      if (list.length === 0) {
        // Si la liste est vide, on masque le bouton checkout et on affiche un message
        wrapper.style.display = 'none';
        container.innerHTML = `
          <p style="color:#ccc; text-align:center; margin:2rem 0;">
            Votre liste est vide pour le moment.
          </p>
        `;
        return;
      }
  
      // Sinon, on réaffiche le bouton et on liste les items
      wrapper.style.display = 'block';
  
      // 1) Calcul du total
      const totalValue = list
        .reduce((sum, item) => sum + parseFloat(item.price), 0)
        .toFixed(2) + '€';
  
      // 2) Injection du total (ou mise à jour)
      let totalEl = document.getElementById('totalPrice');
      if (!totalEl) {
        totalEl = document.createElement('div');
        totalEl.id = 'totalPrice';
        totalEl.className = 'total-price';
        wrapper.parentNode.insertBefore(totalEl, wrapper);
      }
      totalEl.textContent = `Total : ${totalValue}`;
  
      // 3) Création des cartes
      list.forEach(item => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
          <img src="${item.Poster}" alt="${item.Title}" />
          <div class="movie-info">
            <div>
              <h3>${item.Title} (${item.Year})</h3>
              <p>Type : ${item.Type}</p>
              <p><strong>Prix :</strong> ${item.price}</p>
            </div>
            <button class="remove-button">Supprimer</button>
          </div>
        `;
  
        // Clic sur image ou titre → détails
        card.querySelector('img').addEventListener('click', () => {
          window.location.href = `details.html?id=${item.imdbID}`;
        });
        card.querySelector('h3').addEventListener('click', () => {
          window.location.href = `details.html?id=${item.imdbID}`;
        });
  
        // Bouton supprimer
        card.querySelector('.remove-button').addEventListener('click', () => {
          list = list.filter(i => i.imdbID !== item.imdbID);
          localStorage.setItem('myList', JSON.stringify(list));
          renderList();  // on réaffiche tout
        });
  
        container.appendChild(card);
      });
    }
  
    // Affichage initial
    renderList();
  
    // Checkout
    document.getElementById('checkoutBtn').addEventListener('click', () => {
      if (!list.length) {
        alert('Votre liste est vide !');
      } else {
        window.location.href = 'checkout.html';
      }
    });
  });
  