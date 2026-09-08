document.addEventListener("DOMContentLoaded", function () {

    const navigation =
        document.getElementById("main-navigation");


    if (!navigation) {

        console.error("Navigation container not found.");

        return;
    }


    /* =================================
       WEBSITE PAGES
    ================================= */

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


    /* =================================
       CREATE NAVIGATION LINKS
    ================================= */

    pages.forEach(function (page) {

        const link =
            document.createElement("a");

        link.textContent = page.name;

        link.href = page.url;

        navigation.appendChild(link);

    });


    /* =================================
       CREATE SEARCH BAR
    ================================= */

    const searchContainer =
        document.createElement("div");

    searchContainer.className =
        "nav-search";


    searchContainer.innerHTML = `
        <input
            type="text"
            id="site-search"
            placeholder="Search website..."
            aria-label="Search website"
        >
    `;


    navigation.appendChild(searchContainer);


    /* =================================
       CURRENT PAGE
    ================================= */

    let currentPage =
        window.location.pathname
            .split("/")
            .pop();


    if (currentPage === "") {

        currentPage = "index.html";

    }


    const links =
        navigation.querySelectorAll("a");


    links.forEach(function (link) {

        if (
            link.getAttribute("href")
            === currentPage
        ) {

            link.classList.add("active");

        }

    });


    /* =================================
       SEARCH
    ================================= */

    const searchInput =
        document.getElementById("site-search");


    let searchResults =
        document.createElement("div");

    searchResults.className =
        "search-results";

    searchResults.style.display = "none";

    searchContainer.appendChild(searchResults);


    searchInput.addEventListener(
        "input",
        async function () {

            const searchTerm =
                searchInput.value
                    .trim()
                    .toLowerCase();


            searchResults.innerHTML = "";


            if (searchTerm === "") {

                searchResults.style.display =
                    "none";

                return;

            }


            searchResults.style.display =
                "block";


            /* Search every page */

            const results = [];


            for (const page of pages) {

                try {

                    const response =
                        await fetch(page.url);


                    if (!response.ok) {

                        continue;

                    }


                    const html =
                        await response.text();


                    const parser =
                        new DOMParser();


                    const documentPage =
                        parser.parseFromString(
                            html,
                            "text/html"
                        );


                    const pageText =
                        documentPage.body
                            .innerText
                            .toLowerCase();


                    if (
                        pageText.includes(
                            searchTerm
                        )
                    ) {

                        results.push(page);

                    }

                }

                catch (error) {

                    console.error(
                        "Could not search " +
                        page.url,
                        error
                    );

                }

            }


            /* =================================
               DISPLAY RESULTS
            ================================= */

            if (results.length === 0) {

                searchResults.innerHTML = `
                    <div class="no-results">
                        No pages found.
                    </div>
                `;

                return;

            }


            results.forEach(function (page) {

                const result =
                    document.createElement("a");


                result.className =
                    "search-result";


                result.href =
                    page.url;


                result.textContent =
                    page.name;


                searchResults.appendChild(
                    result
                );

            });

        }
    );


    /* =================================
       CLOSE SEARCH RESULTS
       WHEN CLICKING ELSEWHERE
    ================================= */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !searchContainer.contains(
                    event.target
                )
            ) {

                searchResults.style.display =
                    "none";

            }

        }
    );

});
