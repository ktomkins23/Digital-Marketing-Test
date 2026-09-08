// Create the navigation bar
document.addEventListener("DOMContentLoaded", function () {

    // Create navigation container
    const nav = document.createElement("nav");
    nav.className = "main-nav";

    // Navigation links
    nav.innerHTML = `
        <div class="nav-left">
            <a href="index.html">Home</a>
            <a href="profile.html">Profile</a>
            <a href="about.html">About Me</a>
        </div>

        <div class="nav-right">
            <input 
                type="text" 
                id="searchBar" 
                placeholder="Search..."
                aria-label="Search website"
            >
            <button id="searchButton">Search</button>
        </div>
    `;

    // Put navigation at the very top of the page
    document.body.prepend(nav);

    // Search functionality
    const searchBar = document.getElementById("searchBar");
    const searchButton = document.getElementById("searchButton");

    function searchWebsite() {
        const searchTerm = searchBar.value.toLowerCase().trim();

        if (searchTerm === "") {
            return;
        }

        // Search through the text on the current page
        const pageText = document.body.innerText.toLowerCase();

        if (pageText.includes(searchTerm)) {
            alert("Found '" + searchTerm + "' on this page!");
        } else {
            alert("Sorry, '" + searchTerm + "' was not found on this page.");
        }
    }

    // Search when button is clicked
    searchButton.addEventListener("click", searchWebsite);

    // Search when Enter is pressed
    searchBar.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchWebsite();
        }
    });
});
