document.addEventListener('DOMContentLoaded', function () {
    const movieListContainer = document.getElementById('popular-movieList');
  
    // Example API endpoint for fetching popular movies from TMDb API
    const apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=504b92ed3451d4866b990aff01dad979';
  
    // Fetch data from the TMDb API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Check if 'results' property exists before attempting to iterate
        if (data.results) {
          // Map through the list of movies and create movie cards
          data.results.forEach((movie, index) => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
  
            // Create an anchor tag
            const movieLink = document.createElement('a');
            movieLink.href = `movie-details.html?movie_id=${movie.id}`; // Replace with your movie details page URL
            movieLink.target = '_blank'; // Open the link in a new tab (optional)
  
            // Create an image tag
            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            img.alt = movie.title;
  
            // Append the image tag to the anchor tag
            movieLink.appendChild(img);
  
            const title = document.createElement('h3');
            title.textContent = movie.title;
  
            movieCard.appendChild(movieLink); // Append the anchor tag to the movie card
            movieCard.appendChild(title);
  
            movieListContainer.appendChild(movieCard);
          });
        } else {
          console.error('Error fetching popular movies: No "results" property in the response');
        }
      })
      .catch(error => {
        console.error('Error fetching popular movies:', error);
      });
  });
  