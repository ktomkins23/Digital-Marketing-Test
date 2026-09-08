/* =====================================
   WEBSITE NAVIGATION SYSTEM
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const navigation = document.getElementById("main-navigation");

    if (!navigation) {
        return;
    }


    /* =====================================
       NAVIGATION LINKS
    ===================================== */

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


    /* =====================================
       CREATE NAVIGATION LINKS
    ===================================== */

    pages.forEach(function (page) {

        const link = document.createElement("a");

        link.textContent = page.name;
        link.href = page.url;

        navigation.appendChild(link);

    });


    /* =====================================
       ADD SEARCH BAR
    ===================================== */

    const searchContainer = document.createElement("div");

    searchContainer.className = "nav-search";

    searchContainer.innerHTML = `
        <input
            type="text"
            id="site-search"
            placeholder="Search..."
            aria-label="Search website"
        >
    `;

    navigation.appendChild(searchContainer);


    /* =====================================
       HIGHLIGHT CURRENT PAGE
    ===================================== */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const links = navigation.querySelectorAll("a");

    links.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });


    /* =====================================
       SEARCH FUNCTION
    ===================================== */

    const searchInput =
        document.getElementById("site-search");

    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            const searchTerm =
                searchInput.value.trim().toLowerCase();

            if (searchTerm === "") {
                return;
            }


            /* Search through page names */

            const matchingPage = pages.find(function (page) {

                return page.name
                    .toLowerCase()
                    .includes(searchTerm);

            });


            if (matchingPage) {

                window.location.href =
                    matchingPage.url;

            } else {

                alert(
                    "No page found for: " + searchTerm
                );

            }

        }

    });

});
