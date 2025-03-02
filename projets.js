document.addEventListener("DOMContentLoaded", function () {
    const carouselContainer = document.querySelector(".carousel-container");
    const carousel = document.querySelector(".carousel");
    const cards = document.querySelectorAll(".card-container");
    const buttons = document.querySelectorAll(".buttons button");

    let currentCardIndex = 0;
    let isScrolling = false;

    function smoothScrollTo(element, targetPosition, duration) {
        let startPosition = element.scrollLeft;
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            let timeElapsed = currentTime - startTime;
            let progress = Math.min(timeElapsed / duration, 1);
            let ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            element.scrollLeft = startPosition + (targetPosition - startPosition) * ease;

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                isScrolling = false;
            }
        }

        requestAnimationFrame(animation);
    }

    function scrollToCard(index) {
        if (index >= 0 && index < cards.length) {
            currentCardIndex = index;
            let targetPosition = cards[index].offsetLeft - carousel.offsetLeft;
            isScrolling = true;
            smoothScrollTo(carousel, targetPosition, 800); // 800ms pour un effet fluide
            updateActiveButton();
        }
    }

    function updateActiveButton() {
        buttons.forEach((button, index) => {
            if (index === currentCardIndex) {
                button.style.backgroundColor = "#b24c63";
                button.style.transform = "scale(1.5)";
            } else {
                button.style.backgroundColor = "#d67d91";
                button.style.transform = "scale(1)";
            }
        });
    }

    function handleScroll(event) {
        event.preventDefault();

        if (isScrolling) return; // Empêche un scroll trop rapide

        const currentCard = cards[currentCardIndex];
        const imgContainer = currentCard.querySelector(".img-container");

        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            // SCROLL VERTICAL (Images)
            if (event.deltaY > 0) { // Scroll vers le bas
                if (imgContainer.scrollTop + imgContainer.clientHeight < imgContainer.scrollHeight) {
                    imgContainer.scrollBy({ top: 100, behavior: "smooth" }); // Scroll vertical plus lent
                } else {
                    if (currentCardIndex < cards.length - 1) {
                        currentCardIndex++;
                        scrollToCard(currentCardIndex);
                    }
                }
            } else { // Scroll vers le haut
                if (imgContainer.scrollTop > 0) {
                    imgContainer.scrollBy({ top: -100, behavior: "smooth" }); // Scroll vertical plus lent
                } else {
                    if (currentCardIndex > 0) {
                        currentCardIndex--;
                        scrollToCard(currentCardIndex);
                    }
                }
            }
        }
    }

    // Ajout de l'écouteur de scroll uniquement sur le carrousel
    carouselContainer.addEventListener("wheel", handleScroll, { passive: false });

    // Désactiver le scroll de la page entière
    document.body.style.overflow = "hidden";

    // Boutons pour naviguer directement
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            scrollToCard(index);
        });
    });

    updateActiveButton();
});
