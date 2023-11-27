document.addEventListener('DOMContentLoaded', function () {
    const movieListContainer = document.getElementById('indian-movieList');
  
 const apiKey = config.apiKey;
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=hi`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.results) {
          data.results.forEach((movie, index) => {
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
  
            movieListContainer.appendChild(movieCard);
          });
  
          autoScroll(movieListContainer);
        } else {
          console.error('Error fetching Indian movies: No "results" property in the response');
        }
      })
      .catch(error => {
        console.error('Error fetching Indian movies:', error);
      });
  });
  
  function autoScroll(container) {
    setInterval(function () {
      container.scrollLeft += 5; 
    }, 50); 
  }
  