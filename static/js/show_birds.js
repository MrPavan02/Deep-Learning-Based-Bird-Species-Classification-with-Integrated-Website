let allBirds = [];

function filterBirds() {
  const searchText = document.getElementById('searchBar').value.toLowerCase();
  const filteredResultsDiv = document.getElementById('filtered-results');

  if (searchText === '') {
    filteredResultsDiv.style.display = 'none';
    filteredResultsDiv.innerHTML = '';
    document.getElementById('bird-marquee-wrapper').style.display = 'block';
    return;
  }

  const filtered = allBirds.filter(name => name.toLowerCase().includes(searchText));

  document.getElementById('bird-marquee-wrapper').style.display = 'none';
  filteredResultsDiv.style.display = 'block';
  filteredResultsDiv.innerHTML = '';

  if (filtered.length === 0) {
    filteredResultsDiv.innerHTML = '<p>No matching birds found.</p>';
    return;
  }

  filtered.forEach(name => {
    const link = document.createElement('a');
    link.href = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name)} bird`;
    link.className = 'bird-name';
    link.target = '_blank';
    link.textContent = name;
    filteredResultsDiv.appendChild(link);
  });
}

fetch('/get_bird_names')
  .then(res => res.json())
  .then(birdNames => {
    allBirds = birdNames;
    const shuffled = shuffleArray(birdNames);
    displayBirdsMarqueeRows(shuffled);
  })
  .catch(err => {
    console.error('Error fetching bird names:', err);
  });

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function displayBirdsMarqueeRows(birdNames) {
  const container = document.getElementById('bird-marquee-wrapper');
  container.innerHTML = '';

  const rowHeight = 40;
  const availableHeight = container.clientHeight;
  const rows = Math.floor(availableHeight / rowHeight);
  const birdsPerRow = Math.ceil(birdNames.length / rows);

  for (let i = 0; i < rows; i++) {
    const rowBirds = birdNames.slice(i * birdsPerRow, (i + 1) * birdsPerRow);
    const row = document.createElement('div');
    row.className = 'bird-row';
    if (i % 2 !== 0) row.classList.add('even');

    rowBirds.forEach(name => {
      const link = document.createElement('a');
      link.href = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name)} bird`;
      link.className = 'bird-name';
      link.target = '_blank';
      link.textContent = name;
      row.appendChild(link);
    });

    container.appendChild(row);
  }
}

function showRandomBird() {
  if (allBirds.length === 0) return;

  const randomIndex = Math.floor(Math.random() * allBirds.length);
  const bird = allBirds[randomIndex];

  document.getElementById('bird-marquee-wrapper').style.display = 'none';
  document.getElementById('random-bird').style.display = 'block';
  document.getElementById('cancelBtn').style.display = 'inline-block';

  const randomBirdDiv = document.getElementById('random-bird');
  randomBirdDiv.innerHTML = '';
  const link = document.createElement('a');
  link.href = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(bird)} bird`;
  link.target = '_blank';
  link.textContent = `🔍 ${bird}`;
  randomBirdDiv.appendChild(link);
}

function cancelRandom() {
  document.getElementById('random-bird').style.display = 'none';
  document.getElementById('bird-marquee-wrapper').style.display = 'block';
  document.getElementById('cancelBtn').style.display = 'none';
}
