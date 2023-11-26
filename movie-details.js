// document.addEventListener('DOMContentLoaded', function () {
//   const movieDetailsContainer = document.getElementById('movieDetails');

//   const urlParams = new URLSearchParams(window.location.search);
//   const movieId = urlParams.get('movie_id');

//  const apiKey = config.apiKey;
//  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`;

//   fetch(apiUrl)
//       .then(response => response.json())
//       .then(movie => {
//           const movieDetailsDiv = document.createElement('div');
//           movieDetailsDiv.classList.add('movie-details');

//           const title = document.createElement('h3');
//           title.textContent = movie.title;

//           const releaseDate = document.createElement('span');
//           releaseDate.textContent = `Release Date: ${movie.release_date}`;

//           const overview = document.createElement('p');
//           overview.textContent = movie.overview;

//           const genresContainer = document.createElement('p');
//           genresContainer.classList.add('genres-container');
//           genresContainer.innerHTML = `<span class="genres-label">Genres:</span> ${movie.genres.map(genre => genre.name).join(', ')}`;

//           const runtime = document.createElement('p');
//           runtime.textContent = `Runtime: ${movie.runtime} minutes`;

//           const rating = document.createElement('span');
//           rating.textContent = `Rating: ${movie.vote_average}/10`;

//           const additionalContainer = document.createElement('div');
//           additionalContainer.classList.add('additional-container');

//           const additionalImage = document.createElement('img');
//           additionalImage.classList.add('additional-image');
//           additionalImage.src = './Images/trailer.svg';
//           additionalImage.alt = 'Additional Image';

//           const additionalText = document.createElement('p');
//           additionalText.classList.add('additional-text');
//           additionalText.textContent = 'Watch Trailer'; 

//           additionalContainer.appendChild(additionalImage);
//           additionalContainer.appendChild(additionalText);

//           movieDetailsDiv.appendChild(title);
//           movieDetailsDiv.appendChild(releaseDate);
//           movieDetailsDiv.appendChild(overview);
//           movieDetailsDiv.appendChild(genresContainer);
//           movieDetailsDiv.appendChild(runtime);
//           movieDetailsDiv.appendChild(rating);
//           movieDetailsDiv.appendChild(additionalContainer);

//           movieDetailsContainer.appendChild(movieDetailsDiv);

//           const movieImage = document.createElement('img');
//           movieImage.classList.add('movie-image');
//           movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
//           movieImage.alt = movie.title;

//           movieDetailsContainer.appendChild(movieImage);
//       })
//       .catch(error => {
//           console.error('Error fetching movie details:', error);
//       });
// });


document.addEventListener('DOMContentLoaded', function () {
    const movieDetailsContainer = document.getElementById('movieDetails');

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movie_id');

    const apiKey = config.apiKey;
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

            // Check if 'genres' property exists and is an array
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
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
});

