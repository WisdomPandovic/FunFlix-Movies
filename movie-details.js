document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;

    const movieDetailsContainer = document.getElementById('movieDetails');
    const castCrewContainer = document.getElementById('cast-crew');

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movie_id');

    fetch('/api/getApiKey')
        .then(response => response.json())
        .then(data => {
            const apiKey = data.apiKey;
            const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(movie => {
                    const movieDetailsDiv = document.createElement('div');
                    movieDetailsDiv.classList.add('movie-details');

                    const title = document.createElement('h3');
                    title.textContent = movie.title;

                    const releaseDate = document.createElement('span');
                    releaseDate.textContent = `Release Date: ${movie.release_date}`;

                    const overview = document.createElement('p');
                    overview.textContent = movie.overview;

                    const genresContainer = document.createElement('p');
                    genresContainer.classList.add('genres-container');

                    if (movie.genres && Array.isArray(movie.genres)) {
                        genresContainer.innerHTML = `<span class="genres-label">Genres:</span> ${movie.genres.map(genre => genre.name).join(', ')}`;
                    } else {
                        genresContainer.innerHTML = '<span class="genres-label">Genres:</span> N/A';
                    }

                    const runtime = document.createElement('p');
                    runtime.textContent = `Runtime: ${movie.runtime} minutes`;

                    const rating = document.createElement('span');
                    rating.textContent = `Rating: ${movie.vote_average}/10`;

                    const additionalContainer = document.createElement('div');
                    additionalContainer.classList.add('additional-container');

                    const additionalImage = document.createElement('img');
                    additionalImage.classList.add('additional-image');
                    additionalImage.src = './Images/trailer.svg';
                    additionalImage.alt = 'Additional Image';

                    const additionalText = document.createElement('p');
                    additionalText.classList.add('additional-text');
                    additionalText.textContent = 'Watch Trailer';

                    additionalContainer.appendChild(additionalImage);
                    additionalContainer.appendChild(additionalText);

                    movieDetailsDiv.appendChild(title);
                    movieDetailsDiv.appendChild(releaseDate);
                    movieDetailsDiv.appendChild(overview);
                    movieDetailsDiv.appendChild(genresContainer);
                    movieDetailsDiv.appendChild(runtime);
                    movieDetailsDiv.appendChild(rating);
                    movieDetailsDiv.appendChild(additionalContainer);

                    movieDetailsContainer.appendChild(movieDetailsDiv);

                    const movieImage = document.createElement('img');
                    movieImage.classList.add('movie-image');
                    movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                    movieImage.alt = movie.title;

                    movieDetailsContainer.appendChild(movieImage);

                    // Fetch and display cast and crew details
                    fetchCastAndCrewDetails(apiKey, movieId, castCrewContainer);
                })
                .catch(error => {
                    console.error('Error fetching movie details:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching API key:', error);
        });
});

// Function to fetch and display cast and crew details
function fetchCastAndCrewDetails(apiKey, movieId, castCrewContainer) {
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

    fetch(creditsUrl)
        .then(response => response.json())
        .then(creditsData => {
            if (creditsData.crew) {
                const director = creditsData.crew.find(member => member.job === 'Director');
                if (director) {
                    const directorDiv = document.createElement('div');
                    directorDiv.classList.add('crew-member');

                    const directorImage = document.createElement('img');
                    directorImage.src = director.profile_path
                        ? `https://image.tmdb.org/t/p/w500${director.profile_path}`
                        : 'path/to/your/fallback/image.jpg'; // Set a fallback image URL here
                    directorImage.alt = director.name;
                    directorImage.style.width = '100px'; // Adjust the size as needed
                    directorImage.classList.add('crew-image');

                    const directorInfo = document.createElement('p');
                    directorInfo.textContent = `Director: ${director.name}`;

                    directorDiv.appendChild(directorImage);
                    directorDiv.appendChild(directorInfo);

                    castCrewContainer.appendChild(directorDiv);
                }
            } else {
                console.error('Error fetching crew details: No "crew" property in the response');
            }

            if (creditsData.cast) {
                creditsData.cast.slice(0, 5).forEach(actor => {
                    const actorDiv = document.createElement('div');
                    actorDiv.classList.add('crew-member');

                    const actorImage = document.createElement('img');
                    actorImage.src = actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : 'path/to/your/fallback/image.jpg'; // Set a fallback image URL here
                    actorImage.alt = actor.name;
                    actorImage.style.width = '100px'; // Adjust the size as needed
                    actorImage.classList.add('crew-image');

                    const actorInfo = document.createElement('p');
                    actorInfo.textContent = `${actor.name} as ${actor.character}`;

                    actorDiv.appendChild(actorImage);
                    actorDiv.appendChild(actorInfo);

                    castCrewContainer.appendChild(actorDiv);
                });
            } else {
                console.error('Error fetching cast details: No "cast" property in the response');
            }
        })
        .catch(error => {
            console.error('Error fetching cast and crew details:', error);
        });
}
