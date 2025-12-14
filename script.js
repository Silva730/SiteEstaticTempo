async function getWeather() {
  const city = document.getElementById('city').value;
  const weatherDiv = document.getElementById('weather');
  const animationDiv = document.getElementById('animation');

  animationDiv.innerHTML = '';

  if (!city) {
    weatherDiv.innerHTML = 'Digite uma cidade!';
    return;
  }

  try {
    const response = await fetch(`/weather/${city}`);
    if (!response.ok) throw new Error('Cidade não encontrada');

    const data = await response.json();
    weatherDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>${data.weather[0].description}</p>
      <p>Temperatura: ${data.main.temp}°C</p>
      <p>Sensação térmica: ${data.main.feels_like}°C</p>
      <p>Humidade: ${data.main.humidity}%</p>
    `;


    const weatherMain = data.weather[0].main.toLowerCase();

    if (weatherMain.includes('clear')) {
      const sun = document.createElement('div');
      sun.className = 'sun';
      animationDiv.appendChild(sun);
      document.body.style.background = 'linear-gradient(#87CEEB, #50BFE6)';
    } 
    if (weatherMain.includes('cloud')) {
      for (let i = 0; i < 3; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.top = `${50 + i * 30}px`;
        cloud.style.animationDuration = `${50 + i*10}s`;
        animationDiv.appendChild(cloud);
      }
      document.body.style.background = 'linear-gradient(#B0C4DE, #778899)';
    }
    if (weatherMain.includes('rain')) {
      for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.className = 'raindrop';
        drop.style.left = `${Math.random() * window.innerWidth}px`;
        drop.style.animationDuration = `${0.5 + Math.random()}s`;
        animationDiv.appendChild(drop);
      }
      document.body.style.background = 'linear-gradient(#4B79A1, #283E51)';
    }

  } catch (err) {
    weatherDiv.innerHTML = err.message;
  }
}
