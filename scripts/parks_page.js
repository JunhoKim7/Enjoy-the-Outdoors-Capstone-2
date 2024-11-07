function addPark(parkTypeName, parkTypeSelect) {
    parkTypeSelect.appendChild(new Option(parkTypeName));
}
function addLocation(text, target) {
    target.appendChild(new Option(text));
}

function Park(parkObject) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${parkObject.LocationID}</td>
        <td>${parkObject.LocationName}</td>
        <td>${parkObject.Address}</td>
        <td>${parkObject.City}</td>
        <td>${parkObject.State}</td>
        <td>${parkObject.ZipCode}</td>
        <td>${parkObject.Phone}</td>
        <td>${parkObject.Fax}</td>
        <td>${parkObject.Latitude}</td>
        <td>${parkObject.Longitude}</td>
    `;
    return row;
}

function renderParks() {
    const results = document.getElementById("results");
    const selectedType = document.getElementById("parkTypeSelect").value;
    const selectedLocation = document.getElementById("parkLocationSelect").value;
    results.innerHTML = ""; // Clear previous results

    let filtered = nationalParksArray;
    if (selectedType) {
        filtered = filtered.filter(p => p.LocationName.toLowerCase().includes(selectedType.toLowerCase()));
    }
    if (selectedLocation) {
        filtered = filtered.filter(p => p.State.toLowerCase() === selectedLocation.toLowerCase());
    }

    // If there are results, display them in a table
    if (filtered.length > 0) {
        const table = document.createElement("table");
        table.classList.add("results-table");
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Location ID</th>
                    <th>Location Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip Code</th>
                    <th>Phone</th>
                    <th>Fax</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        
        const tbody = table.querySelector("tbody");
        filtered.forEach(park => tbody.appendChild(Park(park)));
        
        results.appendChild(table);
    } else {
        results.innerHTML = "No results found matching the filter.";
    }
}

function onContent() {
    const parkTypeSelect = document.getElementById("parkTypeSelect");
    const parkLocationSelect = document.getElementById("parkLocationSelect");
    const results = document.getElementById("results");
    parkTypesArray.forEach(parkTypeName => addPark(parkTypeName, parkTypeSelect));
    locationsArray.forEach(parkLocationName => addLocation(parkLocationName, parkLocationSelect))
    filterButton.addEventListener("click", renderParks);
    parkTypeSelect.addEventListener("change", renderParks);
    parkLocationSelect.addEventListener("change", renderParks);
}

document.addEventListener("DOMContentLoaded", onContent);