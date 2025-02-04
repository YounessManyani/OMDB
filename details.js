
const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('id');

const apiKey = '1462047a';

async function fetchMovieDetails() {
  if (!imdbID) {
    alert('Aucun film sélectionné.');
    return;
  }

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erreur lors de la requête pour les détails du film');
    }

    const data = await response.json();
    if (data.Response === 'True') {
      displayMovieDetails(data);
    } else {
      alert("Impossible de récupérer les détails du film.");
    }
  } catch (error) {
    console.error('Erreur:', error);
    alert('Une erreur est survenue lors de la récupération des détails');
  }
}


function displayMovieDetails(movie) {
  const detailContainer = document.getElementById('detailContainer');

  detailContainer.innerHTML = `
    <div class="left-column">
      <img
        src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}"
        alt="${movie.Title}"
      />
    </div>
    <div class="right-column">
      <h2>${movie.Title} (${movie.Year})</h2>
      <p><strong>Genre : </strong>${movie.Genre}</p>
      <p><strong>Durée : </strong>${movie.Runtime}</p>
      <p><strong>Sortie : </strong>${movie.Released}</p>
      <p><strong>Réalisateur : </strong>${movie.Director}</p>
      <p><strong>Acteurs : </strong>${movie.Actors}</p>
      <p><strong>Langue : </strong>${movie.Language}</p>
      <p><strong>Note IMDB : </strong>${movie.imdbRating}</p>
      <p><strong>Synopsis : </strong>${movie.Plot}</p>
    </div>
  `;
}

function goBack() {
  window.history.back();
}

fetchMovieDetails();
