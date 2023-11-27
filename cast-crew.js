function displayCastAndCrew(movieId) {
    const castCrewContainer = document.getElementById('cast-crew');
  
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
  
    fetch(creditsUrl)
      .then(response => response.json())
      .then(credits => {
        const castSection = document.createElement('div');
        castSection.innerHTML = '<h4>Cast</h4>';
        castSection.classList.add('cast-crew-section');
  
        credits.cast.slice(0, 5).forEach(actor => {
          const actorElement = createPersonCard(actor);
          castSection.appendChild(actorElement);
        });
  
        const crewSection = document.createElement('div');
        crewSection.innerHTML = '<h4>Crew</h4>';
        crewSection.classList.add('cast-crew-section');
  
        credits.crew.slice(0, 5).forEach(crewMember => {
          const crewElement = createPersonCard(crewMember);
          crewSection.appendChild(crewElement);
        });
  
        castCrewContainer.appendChild(castSection);
        castCrewContainer.appendChild(crewSection);
      })
      .catch(error => {
        console.error('Error fetching cast and crew details:', error);
      });
  }
  
  function createPersonCard(person) {
    const personElement = document.createElement('div');
    personElement.classList.add('person-card');
  
    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w200${person.profile_path}`;
    img.alt = person.name;
  
    const name = document.createElement('p');
    name.textContent = person.name;
  
    const role = document.createElement('p');
    role.textContent = person.character || person.job;
  
    personElement.appendChild(img);
    personElement.appendChild(name);
    personElement.appendChild(role);
  
    return personElement;
  }
  
  export { displayCastAndCrew };
  