// details.js

// 0) Récupérer l'ID du film dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const imdbID   = urlParams.get('id');
const apiKey   = '1462047a';

// 1) Requête OMDb pour les détails
async function fetchMovieDetails() {
  if (!imdbID) {
    alert("Aucun film sélectionné.");
    return;
  }
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`;
  try {
    const res  = await fetch(url);
    if (!res.ok) throw new Error("Erreur réseau");
    const data = await res.json();
    if (data.Response === "True") {
      displayMovieDetails(data);
    } else {
      alert("Impossible de récupérer les détails.");
    }
  } catch (err) {
    console.error(err);
    alert("Une erreur est survenue.");
  }
}

// 2) Affichage du film + prix + boutons
function displayMovieDetails(movie) {
  // Génère un prix aléatoire entre 3€ et 5€
  const price = (Math.random() * 2 + 3).toFixed(2) + ' €';

  const container = document.getElementById("detailContainer");
  container.innerHTML = `
    <div class="left-column">
      <img
        src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}"
        alt="${movie.Title}"
      />
    </div>
    <div class="right-column">
      <h2>${movie.Title} (${movie.Year})</h2>
      <p><strong>Genre :</strong> ${movie.Genre}</p>
      <p><strong>Durée :</strong> ${movie.Runtime}</p>
      <p><strong>Sortie :</strong> ${movie.Released}</p>
      <p><strong>Réalisateur :</strong> ${movie.Director}</p>
      <p><strong>Acteurs :</strong> ${movie.Actors}</p>
      <p><strong>Langue :</strong> ${movie.Language}</p>
      <p><strong>Note IMDB :</strong> ${movie.imdbRating}</p>
      <p><strong>Synopsis :</strong> ${movie.Plot}</p>

      <!-- Nouveau : affichage du prix -->
      <p class="detail-price"><strong>Prix :</strong> ${price}</p>

      <div class="button-row">
        <button class="watch-button">Regarder maintenant</button>
        <button id="addToCardBtn" class="add-card-button">+ Add to Card</button>
      </div>
    </div>
  `;

  // 3) Listener sur le bouton Add to Card
  document
    .getElementById("addToCardBtn")
    .addEventListener("click", () => addToCard(movie, price));
}

// 4) Fonction d’ajout au panier (localStorage)
function addToCard(movie, price) {
  const key = "myList";
  const list = JSON.parse(localStorage.getItem(key) || "[]");

  // 4.a) évite les doublons
  if (list.some(item => item.imdbID === movie.imdbID)) {
    alert(`${movie.Title} est déjà dans votre liste.`);
    return;
  }

  // 4.b) ajoute le film avec son prix
  list.push({
    imdbID: movie.imdbID,
    Title:  movie.Title,
    Poster: movie.Poster,
    Year:   movie.Year,
    Type:   movie.Type,
    price           // on stocke aussi le prix
  });

  localStorage.setItem(key, JSON.stringify(list));
  alert(`${movie.Title} a été ajouté à votre liste !`);
}

// 5) Bouton retour
function goBack() {
  window.history.back();
}

// 6) Lancement
fetchMovieDetails();
