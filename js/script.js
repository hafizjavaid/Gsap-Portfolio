// BG ANIMATION EFFECT

function bgAnimation() {
    console.log("Hello");

    const rows = 7,
        cols = 10;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const div = document.createElement("div");
            div.className = `col-${j + 1}`;
            document.querySelector(".bg-animation-effect").appendChild(div);
        }
    }
}
bgAnimation();
let portfolioItems;
// ===================== Filter Portfolio Items

const filterBtnsContainer = document.querySelector(".portfolio-filter");

filterBtnsContainer.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("p-filter-btn") &&
        !e.target.classList.contains("active")
    ) {
        filterBtnsContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        hideScrolling();
        document.querySelector(".filter-status").classList.add("active");

        document.querySelector(
            ".filter-status p"
        ).innerHTML = `filtering <span>${e.target.innerHTML}</span> works`;

        setTimeout(() => {
            filterItems(e.target);
        }, 400);

        setTimeout(() => {
            document.querySelector(".filter-status").classList.remove("active");
            hideScrolling();
        }, 800);
    }
});

function filterItems(filterBtn) {
    const selectedCategory = filterBtn.getAttribute("data-filter");
    document.querySelectorAll(".portfolio-item").forEach((item) => {
        const category = item.getAttribute("data-cat").split(",");

        if (
            category.indexOf(selectedCategory) !== -1 ||
            selectedCategory === "all"
        ) {
            item.classList.add("show");
        } else {
            item.classList.remove("show");
        }
    });
    portfolioItems = document.querySelectorAll(".portfolio-item.show");
    console.log(portfolioItems);
}
filterItems(document.querySelector(".p-filter-btn.active"));

// ===================== Body Scrolling ================

function hideScrolling() {
    document.querySelector("body").classList.toggle("hideScroll");
}

// ===================== Filter Category Popup Active ================
let portfolioItemIndex;
document.addEventListener("click", (e) => {
    if (e.target.closest(".portfolio-item")) {
        const currentItem = e.target.closest(".portfolio-item");
        portfolioItemIndex = Array.from(portfolioItems).indexOf(currentItem);

        // console.log(portfolioItemIndex);
        togglePopup();
        portfolioItemDetails();
        updateNextPrev();
    }
});

function togglePopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open");
    hideScrolling();
}

document.querySelector(".pp-close-btn").addEventListener("click", togglePopup);

function portfolioItemDetails() {
    document.querySelector(".pp-thumbnail img").src = portfolioItems[
        portfolioItemIndex
    ].querySelector("img").src;

    document.querySelector(".pp-header h3").innerHTML = portfolioItems[
        portfolioItemIndex
    ].querySelector(".portfolio-item-title").innerHTML;

    document.querySelector(".pp-body").innerHTML = portfolioItems[
        portfolioItemIndex
    ].querySelector(".portfolio-item-details").innerHTML;

    document.querySelector(".pp-counter").innerHTML = `${
    portfolioItemIndex + 1
  } of ${portfolioItems.length} ( <span title="category"> ${
    document.querySelector(".p-filter-btn.active").innerHTML
  } </span>)`;
}

function updateNextPrev() {
    if (portfolioItemIndex !== 0) {
        document.querySelector(".pp-footer-left").classList.remove("hidden");

        document.querySelector(".pp-footer-left h3").innerHTML = portfolioItems[
            portfolioItemIndex - 1
        ].querySelector("h3").innerHTML;

        document.querySelector(".pp-footer-left img").src = portfolioItems[
            portfolioItemIndex - 1
        ].querySelector("img").src;
    } else {
        document.querySelector(".pp-footer-left").classList.add("hidden");
    }

    if (portfolioItemIndex !== portfolioItems.length - 1) {
        document.querySelector(".pp-footer-right").classList.remove("hidden");

        document.querySelector(".pp-footer-right h3").innerHTML = portfolioItems[
            portfolioItemIndex + 1
        ].querySelector("h3").innerHTML;

        document.querySelector(".pp-footer-right img").src = portfolioItems[
            portfolioItemIndex + 1
        ].querySelector("img").src;
    } else {
        document.querySelector(".pp-footer-right").classList.add("hidden");
    }
}

document.querySelector(".pp-prev-btn").addEventListener("click", () => {
    changePortfolioItem("prev");
});

document.querySelector(".pp-next-btn").addEventListener("click", () => {
    changePortfolioItem("next");
});

function changePortfolioItem(direction) {
    if (direction == "prev") {
        portfolioItemIndex--;
    } else {
        portfolioItemIndex++;
    }
    document.querySelector(".pp-overlay").classList.add(direction);

    setTimeout(() => {
        document.querySelector(".pp-inner").scrollTo(0, 0);
        portfolioItemDetails();
        updateNextPrev();
    }, 400);

    setTimeout(() => {
        document.querySelector(".pp-overlay").classList.remove(direction);
    }, 1000);
}

// =================== Toggle Contact Form

document.addEventListener("click", e => {

    if (e.target.classList.contains('toggle-contact')) {

        document.querySelector(".contact-form").classList.toggle("open");
        hideScrolling();

    }

})


// toggle Navbar===============

const navToggler = document.querySelector(".nav-toggler");

navToggler.addEventListener("click", toggleNav);

function toggleNav() {
    navToggler.classList.toggle("active");
    document.querySelector(".nav").classList.toggle("open")
    toggleOverlayEffect();
    hideScrolling();


}

// =================== Hide and Show Diff Sections

document.addEventListener("click", e => {

    if (e.target.classList.contains("link-item") && e.target.hash !== '') {
        const hash = e.target.hash;

        if (e.target.classList.contains("nav-item")) {
            activeSection(hash);
            toggleNav();
        } else {

            hideScrolling();
            toggleOverlayEffect();

            document.querySelector(".nav-toggler").classList.add("toggle-hide");
            setTimeout(() => {

                activeSection(hash);
                toggleOverlayEffect();
                hideScrolling();
                document.querySelector(".nav-toggler").classList.remove("toggle-hide");

            }, 950)
        }
    }

})

function activeSection(sectionID) {

    document.querySelector("section.active").classList.remove("active");
    document.querySelector(sectionID).classList.add("active");
    window.scrollTo(0, 0);

}

// ----------------- Toggle Overlay Effect

function toggleOverlayEffect() {

    document.querySelector('.overlay-effect').classList.toggle("active")
}

// Page Loader

window.addEventListener("load", () => {

    document.querySelector(".page-loader").classList.add("slide-right");

    setTimeout(() => {

        document.querySelector(".page-loader").style.display = 'none';

    }, 2000);
})