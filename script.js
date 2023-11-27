// document.addEventListener('DOMContentLoaded', function () {
//     const movieList = document.getElementById('movieList');
  
// //  const apiKey = config.apiKey;
//  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`;
  

//     fetch('/api/getApiKey')
//       .then(response => response.json())
//       .then(data => {
       
//         if (data.results) {
  
//           data.results.forEach((movie, index) => {
//             const movieCard = document.createElement('div');
//             movieCard.classList.add('movie-card');
  
//             const movieLink = document.createElement('a');
//             movieLink.href = `movie-details.html?movie_id=${movie.id}`;
//             movieLink.target = '_blank'; 
  
//             const img = document.createElement('img');
//             img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
//             img.alt = movie.title;
  
//             movieLink.appendChild(img);
  
//             const title = document.createElement('h3');
//             title.textContent = movie.title;
  
//             movieCard.appendChild(movieLink); 
//             movieCard.appendChild(title);
  
//             movieList.appendChild(movieCard);
//           });
//         } else {
//           console.error('Error fetching movies: No "results" property in the response');
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching movies:', error);
//       });
//   });
  

  document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/getApiKey')
      .then(response => response.json())
      .then(data => {
        const apiKey = data.apiKey;
        const movieList = document.getElementById('movieList');
  
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`;
  
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
  
            movieList.appendChild(movieCard);
          });
        } else {
          console.error('Error fetching movies: No "results" property in the response');
        }
      })
      .catch(error => {
        console.error('Error fetching API key:', error);
      });
  });
  