// checkout.js

document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Récupérer les valeurs
    const name    = document.getElementById('fullName').value.trim();
    const email   = document.getElementById('email').value.trim();
    const card    = document.getElementById('cardNumber').value.trim();
    const expiry  = document.getElementById('expiry').value.trim();
    const cvc     = document.getElementById('cvc').value.trim();
  
    // Validation basique
    if (!name || !email || !card || !expiry || !cvc) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
  
    // (Ici tu pourrais appeler un backend pour traiter le paiement)
  
    // Vidage de la liste et confirmation
    localStorage.removeItem('myList');
    alert('Merci, votre paiement a été pris en compte !');
  
    // Rediriger vers la page d’accueil ou un écran de confirmation
    window.location.href = 'index.html';
  });
  