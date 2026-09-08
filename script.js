document.addEventListener("DOMContentLoaded", function () {

    // Find the navigation container
    const navigation = document.getElementById("main-navigation");

    // Stop if the navigation container doesn't exist
    if (!navigation) {
        console.error("Navigation container not found.");
        return;
    }


    // ================================
    // WEBSITE PAGES
    // ================================

    const pages = [
        {
            name: "Home",
            url: "index.html"
        },

        {
            name: "Profile",
            url: "profile.html"
        },

        {
            name: "About Me",
            url: "about.html"
        }
    ];


    // ================================
    // CREATE NAVIGATION LINKS
    // ================================

    pages.forEach(function (page) {

        const link = document.createElement("a");

        link.textContent = page.name;

        link.href = page.url;

        navigation.appendChild(link);

    });


    // ================================
    // CREATE SEARCH BAR
    // ================================

    const searchContainer = document.createElement("div");

    searchContainer.className = "nav-search";


    const searchInput = document.createElement("input");

    searchInput.type = "text";

    searchInput.id = "site-search";

    searchInput.placeholder = "Search...";

    searchContainer.appendChild(searchInput);

    navigation.appendChild(searchContainer);


    // ================================
    // HIGHLIGHT CURRENT PAGE
    // ================================

    let currentPage =
        window.location.pathname.split("/").pop();


    // GitHub Pages sometimes gives the homepage
    // an empty filename, so treat it as index.html

    if (currentPage === "") {
        currentPage = "index.html";
    }


    const links = navigation.querySelectorAll("a");


    links.forEach(function (link) {

        if (link.getAttribute("href") === currentPage) {

            link.classList.add("active");

        }

    });


    // ================================
    // SEARCH
    // ================================

    searchInput.addEventListener("keydown", function (event) {

        if (event.key !== "Enter") {
            return;
        }


        const searchTerm =
            searchInput.value.trim().toLowerCase();


        if (searchTerm === "") {
            return;
        }


        const matchingPage = pages.find(function (page) {

            return page.name
                .toLowerCase()
                .includes(searchTerm);

        });


        if (matchingPage) {

            window.location.href = matchingPage.url;

        } else {

            alert("No page found for: " + searchTerm);

        }

    });

});
