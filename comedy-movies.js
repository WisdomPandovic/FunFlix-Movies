document.addEventListener('DOMContentLoaded', function () {
  fetch('/api/getApiKey')
    .then(response => response.json())
    .then(data => {
      const apiKey = data.apiKey;
      const comedyList = document.getElementById('comedyList'); 

      const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(movieData => {
          if (movieData.results) {
            movieData.results.forEach((movie, index) => {
              const movieCard = document.createElement('div');
              movieCard.classList.add('movie-card');

              const movieLink = document.createElement('a');
              movieLink.href = `movie-details.html?movie_id=${movie.id}`;
              movieLink.target = '_blank';

              const img = document.createElement('img');
              img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
              img.alt = movie.title;

              movieLink.appendChild(img);

              const title = document.createElement('h3');
              title.textContent = movie.title;

              movieCard.appendChild(movieLink);
              movieCard.appendChild(title);

              comedyList.appendChild(movieCard);
            });
          } else {
            console.error('Error fetching comedy movies: No "results" property in the response');
          }
        })
        .catch(error => {
          console.error('Error fetching comedy movies:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching API key:', error);
    });
});
