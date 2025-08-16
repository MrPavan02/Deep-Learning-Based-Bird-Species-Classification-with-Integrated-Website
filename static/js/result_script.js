document.addEventListener("DOMContentLoaded", function () {
    const birdName = document.getElementById("bird-name").innerText;
    const descBox = document.getElementById("bird-description");

    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(birdName)}&utf8=&format=json&origin=*`)
        .then(response => response.json())
        .then(data => {
            if (data.query.search.length > 0) {
                const pageTitle = data.query.search[0].title;
                fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`)
                    .then(res => res.json())
                    .then(summary => {
                        if (summary.extract) {
                            descBox.innerHTML = `<p><strong>About the Bird:</strong><br>${summary.extract}</p>`;
                        } else {
                            descBox.innerHTML = `<p><strong>About the Bird:</strong><br><em>Description not found.</em></p>`;
                        }
                    });
            } else {
                descBox.innerHTML = `<p><strong>About the Bird:</strong><br><em>No relevant Wikipedia page found.</em></p>`;
            }
        })
        .catch(err => {
            console.error("Error fetching Wikipedia data:", err);
            descBox.innerHTML = `<p><strong>About the Bird:</strong><br><em>Error loading description.</em></p>`;
        });
});