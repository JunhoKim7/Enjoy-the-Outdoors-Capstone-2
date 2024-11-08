document.addEventListener("DOMContentLoaded", () => {
    const results = document.getElementById("results");
    const mountainsSelect = document.getElementById("mountainsSelect");

    
    mountainsArray.forEach(m => mountainsSelect.appendChild(new Option(m.name)));
    mountainsSelect.addEventListener("change", async () => {
        const selectedIndex = mountainsSelect.selectedIndex;
        results.innerHTML = "";

        if (selectedIndex) {
            const m = mountainsArray[selectedIndex - 1];
            const coords = m.coords.lat.toFixed(3) + ", " + m.coords.lng.toFixed(3);
            results.innerHTML = `
                <h1>${m.name}</h1>                
                Elevation: <b>${m.elevation}</b><br>
                Effort: <b>${m.effort}</b><br>
                Coordinates: <b>(${coords})</b><br><br>
                ${m.desc}<br><br>
            `;

        
            const sunbtn = document.createElement("button");
            sunbtn.innerHTML = "Show Times";
            sunbtn.style.marginTop = "10px";
            results.appendChild(sunbtn);
            if (m.img) {
                const img = document.createElement("img");
                img.alt = "Mountain Image";
                img.src = "data/images/" + m.img;
                img.style.display = "block";
                img.style.margin = "10px auto";
                results.appendChild(img);
            }

            sunbtn.addEventListener("click", async () => {
                sunbtn.disabled = true; 
                const sunData = await getSunsetForMountain(m.coords.lat, m.coords.lng);
                if (sunData) {
                    // const sunInfo = document.createElement("p");
                    // sunInfo.innerHTML = `<br>Sunrise: ${sunData.sunrise} UTC<br>Sunset: ${sunData.sunset} UTC`;
                    sunbtn.outerHTML = `<br>Sunrise: ${sunData.sunrise} UTC<br>Sunset: ${sunData.sunset} UTC` ;
                }
            });
        }
    });

    async function getSunsetForMountain(lat, lng) {
        try {
            const response = await fetch(
                `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
            );
            const data = await response.json();
            return data.results; 
        } catch (error) {
            console.error("Error fetching sunrise/sunset data:", error);
            return null;
        }
    }
});
