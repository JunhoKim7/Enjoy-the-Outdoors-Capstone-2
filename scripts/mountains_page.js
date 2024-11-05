document.addEventListener("DOMContentLoaded", () => {
    const results = document.getElementById("results");
    const button = document.getElementById("button");
    const mountainsSelect = document.getElementById("mountainsSelect");

    // Populate the dropdown with mountain options
    mountainsArray.forEach(m => mountainsSelect.appendChild(new Option(m.name)));

    mountainsSelect.addEventListener("change", e => {
        const selectedIndex = mountainsSelect.selectedIndex;

        // If a valid selection is made
        if (selectedIndex) {
            const m = mountainsArray[selectedIndex - 1];

            // Display mountain details
            const coords = m.coords.lat.toFixed(3) + ", " + m.coords.lng.toFixed(3);
            results.innerHTML = `
                <h1>${m.name}</h1>                
                Elevation: <b>${m.elevation}</b><br>
                Effort: <b>${m.effort}</b><br>
                Coordinates: <b>(${coords})</b><br><br>
                ${m.desc}<br><br>
            `;

            // Add mountain image if available
            if (m.img) {
                const i = document.createElement("img");
                i.alt = "Mountain Image";
                i.src = "data/images/" + m.img;
                results.appendChild(i);
            }

            // Function to fetch sunset and sunrise times
            async function getSunsetForMountain(lat, lng) {
                const response = await fetch(
                    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
                );
                const data = await response.json();
                return data.results; // Only return the 'results' part
            }

            // Button to show sunrise and sunset times
            const sunbtn = document.createElement("button");
            sunbtn.innerHTML = "Show Times";
            sunbtn.style.marginTop = "10px";
            sunbtn.addEventListener("click", async () => {
                const sunData = await getSunsetForMountain(m.coords.lat, m.coords.lng);
                if (sunData) {
                    const sunInfo = document.createElement("p");
                    sunbtn.classList.add("btn");
                    sunInfo.innerHTML = `<br>Sunrise: ${sunData.sunrise} UTC<br>Sunset: ${sunData.sunset} UTC`;
                    results.appendChild(sunInfo);
                    sunbtn.disabled = true; // Disable button after use
                }
            });

            // Add the button to the results
            button.appendChild(sunbtn);
            
        }
    });
});
