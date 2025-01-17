// Votre clé API
const apiKey = '1462047a';

// Fonction pour rechercher un film par titre
async function fetchMovieData(title) {
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        if (data.Response === 'True') {
            return data;
        } else if (data.Error === 'Movie not found!') {
            displayMoviesList(['Inception', 'The Dark Knight', 'Interstellar', 'Avengers', 'Titanic', 'Joker']);
            alert('Film non trouvé');
            return null;
        } else {
            alert('Film non trouvé');
            return null;
        }
    } catch (error) {
        console.error('Erreur :', error);
        alert('Une erreur est survenue lors de la recherche');
        return null;
    }
}

// Fonction pour afficher un film
function displayMovie(movie) {
    const moviesContainer = document.getElementById('moviesContainer');
    moviesContainer.innerHTML = ''; // Efface le conteneur avant d'afficher le film

    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';

    movieCard.innerHTML = `
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.Plot}</p>
    `;

    moviesContainer.appendChild(movieCard);
}

// Fonction pour gérer la recherche et l'affichage
document.getElementById('searchBtn').addEventListener('click', async () => {
    const title = document.getElementById('movieTitle').value.trim();
    if (title === '') {
        alert('Veuillez entrer un titre');
        return;
    }
    const movie = await fetchMovieData(title);
    if (movie) {
        displayMovie(movie);
    }
});

// Afficher une liste de films (exemple avec des titres par défaut)
async function displayMoviesList(titles) {
    const moviesContainer = document.getElementById('moviesContainer');
    moviesContainer.innerHTML = ''; // Efface le conteneur

    for (const title of titles) {
        const movie = await fetchMovieData(title);
        if (movie) {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';

            movieCard.innerHTML = `
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p>${movie.Plot}</p>
            `;

            moviesContainer.appendChild(movieCard);
        }
    }
}

// Charger une liste de films par défaut
displayMoviesList(['Inception', 'The Dark Knight', 'Interstellar', 'Avengers', 'Titanic', 'Joker']);
