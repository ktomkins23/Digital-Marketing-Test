document.addEventListener("DOMContentLoaded", function () {

    const navigation = document.getElementById("main-navigation");

    if (!navigation) {
        console.error("Navigation container not found.");
        return;
    }


    // ============================================
    // WEBSITE PAGES
    // ============================================

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
        },
        {
            name: "Projects",
            url: "projects.html"
        }
    ];


    // ============================================
    // CREATE NAVIGATION
    // ============================================

    const navLinks = document.createElement("div");

    navLinks.className = "nav-links";


    pages.forEach(function (page) {

        const link = document.createElement("a");

        link.href = page.url;
        link.textContent = page.name;

        navLinks.appendChild(link);

    });


    // ============================================
    // CREATE SEARCH AREA
    // ============================================

    const searchContainer = document.createElement("div");

    searchContainer.className = "nav-search";


    searchContainer.innerHTML = `
        <input
            type="text"
            id="site-search"
            placeholder="Search website..."
            aria-label="Search website"
            autocomplete="off"
        >
    `;


    // Add navigation and search to the nav
    navigation.appendChild(navLinks);
    navigation.appendChild(searchContainer);


    // ============================================
    // CURRENT PAGE
    // ============================================

    let currentPage = window.location.pathname
        .split("/")
        .pop();

    if (currentPage === "") {
        currentPage = "index.html";
    }


    const links = navigation.querySelectorAll(".nav-links a");


    links.forEach(function (link) {

        if (link.getAttribute("href") === currentPage) {

            link.classList.add("active");

        }

    });


    // ============================================
    // SEARCH DATA
    // ============================================
    // This allows the search to work even if you
    // open the HTML files directly on your computer.

    const searchData = [

        {
            page: "index.html",
            name: "Home",
            text: `
                Kaden website welcome Iowa State University
                Business Marketing education interests music guitar
                CDs technology business marketing SmartSip
            `
        },

        {
            page: "profile.html",
            name: "Profile",
            text: `
                Kaden profile Iowa State University Business Marketing
                graduation May 2027 education communication problem solving
                technology teamwork business student
            `
        },

        {
            page: "about.html",
            name: "About Me",
            text: `
                Kaden about me guitar music CDs collecting outdoors
                business interests work experience Premier Pools Spas
                Echo Valley Country Club The Printers bindery operator
                service technician grounds crew
            `
        },

        {
            page: "projects.html",
            name: "Projects",
            text: `
                SmartSip smart water bottle hydration sensors app
                stainless steel 20 oz 32 oz 40 oz technology business
                AgTech agriculture technology data analytics automation
                artificial intelligence Aviation Professional Flight
                personal website HTML CSS JavaScript
            `
        }

    ];


    // ============================================
    // SEARCH RESULTS CONTAINER
    // ============================================

    const searchResults = document.createElement("div");

    searchResults.className = "search-results";

    searchResults.style.display = "none";

    searchContainer.appendChild(searchResults);


    const searchInput =
        document.getElementById("site-search");


    // ============================================
    // SEARCH FUNCTION
    // ============================================

    function searchWebsite() {

        const searchTerm =
            searchInput.value.trim().toLowerCase();


        searchResults.innerHTML = "";


        // Nothing entered
        if (searchTerm === "") {

            searchResults.style.display = "none";

            return;

        }


        // Search every page
        const results = searchData.filter(function (page) {

            return page.text
                .toLowerCase()
                .includes(searchTerm);

        });


        // Show results
        searchResults.style.display = "block";


        // No results
        if (results.length === 0) {

            searchResults.innerHTML = `
                <div class="no-results">
                    No pages found for "${searchTerm}".
                </div>
            `;

            return;
        }


        // Create result links
        results.forEach(function (page) {

            const result = document.createElement("a");

            result.href = page.page;

            result.className = "search-result";

            result.innerHTML = `
                <strong>${page.name}</strong>
                <span>Search result</span>
            `;

            searchResults.appendChild(result);

        });

    }


    // ============================================
    // SEARCH AS USER TYPES
    // ============================================

    searchInput.addEventListener(
        "input",
        searchWebsite
    );


    // ============================================
    // CLOSE RESULTS WHEN CLICKING ELSEWHERE
    // ============================================

    document.addEventListener(
        "click",
        function (event) {

            if (!searchContainer.contains(event.target)) {

                searchResults.style.display = "none";

            }

        }
    );


    // ============================================
    // KEEP RESULTS OPEN WHEN CLICKED
    // ============================================

    searchContainer.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );

});
