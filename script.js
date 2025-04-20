// ta clé API
const apiKey = '1462047a';

const seriesTitles = [
  'Breaking Bad',
  'Game of Thrones',
  'Stranger Things',
  'Money Heist',
  'The Walking Dead',
  'Friends'
];

const movieTitles = [
  'Inception',
  'The Dark Knight',
  'Interstellar',
  'Avengers',
  'Titanic',
  'Joker'
];

const featuredTitles = [
  'Breaking Bad',
  'Game of Thrones',
  'Stranger Things',
  'Money Heist',
  'Interstellar',
  'Avengers',
  'Titanic',
  'Joker',
  'Inception',
  'The Dark Knight',
];

async function fetchMovieData(title) {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erreur de requête réseau');
    const data = await response.json();
    if (data.Response === 'True') return data;
    console.warn(`Titre non trouvé : ${title}`);
    return null;
  } catch (error) {
    console.error('Erreur :', error);
    return null;
  }
}

// -----------------------------------------
// 1) LISTE PAR DÉFAUT / SÉRIES / FILMS
// -----------------------------------------
async function displayMoviesList(titles) {
  const moviesContainer = document.getElementById('moviesContainer');
  moviesContainer.innerHTML = '';

  for (const title of titles) {
    const movie = await fetchMovieData(title);
    if (!movie) continue;

    // ← ICI : génère un prix aléatoire entre 3.00€ et 5.00€
    const price = (Math.random() * 2 + 3).toFixed(2) + '€';

    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.addEventListener('click', () => {
      window.location.href = `details.html?id=${movie.imdbID}`;
    });

    movieCard.innerHTML = `
      <img 
        src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'}" 
        alt="${movie.Title}"
      />
      <div class="movie-price">${price}</div>         <!-- ← ICI on injecte le prix -->
      <div class="movie-info">
        <h3>${movie.Title}</h3>
        <p>${movie.Plot}</p>
      </div>
    `;

    moviesContainer.appendChild(movieCard);
  }
}

// gestion des onglets
const homeLink    = document.getElementById('homeLink');
const seriesLink  = document.getElementById('seriesLink');
const moviesLink  = document.getElementById('moviesLink');

homeLink.addEventListener('click', e => { e.preventDefault(); displayMoviesList(featuredTitles); });
seriesLink.addEventListener('click', e => { e.preventDefault(); displayMoviesList(seriesTitles); });
moviesLink.addEventListener('click', e => { e.preventDefault(); displayMoviesList(movieTitles); });

// -----------------------------------------
// 2) RECHERCHE AU CLIC
// -----------------------------------------
document.getElementById('searchBtn').addEventListener('click', async () => {
  const title = document.getElementById('movieTitle').value.trim();
  if (!title) {
    alert('Veuillez entrer un titre');
    return;
  }

  const movie = await fetchMovieData(title);
  const moviesContainer = document.getElementById('moviesContainer');
  moviesContainer.innerHTML = '';

  if (!movie) {
    alert(`Aucun résultat pour "${title}"`);
    return;
  }

  // ← ICI aussi : prix aléatoire
  const price = (Math.random() * 2 + 3).toFixed(2) + '€';

  const movieCard = document.createElement('div');
  movieCard.className = 'movie-card';
  movieCard.addEventListener('click', () => {
    window.location.href = `details.html?id=${movie.imdbID}`;
  });

  movieCard.innerHTML = `
    <img 
      src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'}"
      alt="${movie.Title}"
    />
    <div class="movie-price">${price}</div>       <!-- ← ICI le prix aussi -->
    <div class="movie-info">
      <h3>${movie.Title}</h3>
      <p>${movie.Plot}</p>
    </div>
  `;

  moviesContainer.appendChild(movieCard);
});

// Affiche la liste “featured” au chargement
displayMoviesList(featuredTitles);
