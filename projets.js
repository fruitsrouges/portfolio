document.addEventListener("DOMContentLoaded", function () {
    const carouselContainer = document.querySelector(".carousel-container");
    const carousel = document.querySelector(".carousel");
    const cards = document.querySelectorAll(".card-container");
    const buttons = document.querySelectorAll(".buttons button");
    let currentCardIndex = 0;
    let isScrolling = false;
    let isCarouselComplete = false;

    function smoothScrollTo(element, targetPosition, duration, callback) {
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
                if (callback) callback();
            }
        }
        requestAnimationFrame(animation);
    }

    function scrollToCard(index) {
        if (index >= 0 && index < cards.length) {
            currentCardIndex = index;
            let targetPosition = cards[index].offsetLeft - carousel.offsetLeft - parseFloat(getComputedStyle(carousel).paddingLeft);
            isScrolling = true;
            updateActiveButton();
            smoothScrollTo(carousel, targetPosition, 2000, () => {
                if (currentCardIndex === cards.length - 1) {
                    const lastImgContainer = currentCard.querySelector(".img-container");
                    if (lastImgContainer.scrollTop + lastImgContainer.clientHeight >= lastImgContainer.scrollHeight) {
                        isCarouselComplete = true;
                        document.body.style.overflow = "auto";
                    }
                }
                
            });
        }
    }

    function updateActiveButton() {
        buttons.forEach((button, index) => {
            button.style.transition = "transform 2s ease, background-color 2s ease";
            button.style.backgroundColor = index === currentCardIndex ? "#b24c63" : "#d67d91";
            button.style.transform = index === currentCardIndex ? "scale(1.5)" : "scale(1)";
        });
    }

    function handleScroll(event) {
        if (isScrolling || isCarouselComplete) return;
        event.preventDefault();

        const currentCard = cards[currentCardIndex];
        const imgContainer = currentCard.querySelector(".img-container");

        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            if (event.deltaY > 0) {
                if (imgContainer.scrollTop + imgContainer.clientHeight < imgContainer.scrollHeight) {
                    imgContainer.scrollBy({ top: 50, behavior: "smooth" });
                } else if (!isScrolling && currentCardIndex < cards.length - 1) {
                    currentCardIndex++;
                    scrollToCard(currentCardIndex);
                } else if (currentCardIndex === cards.length - 1) {
                    isCarouselComplete = true;
                    document.body.style.overflow = "auto";
                }
            } else {
                if (imgContainer.scrollTop > 0) {
                    imgContainer.scrollBy({ top: -50, behavior: "smooth" });
                } else if (currentCardIndex > 0) {
                    currentCardIndex--;
                    scrollToCard(currentCardIndex);
                }
            }
        }
    }

    window.addEventListener("scroll", () => {
        if (window.scrollY === 0 && isCarouselComplete) {
            isCarouselComplete = false;
            document.body.style.overflow = "hidden";
        }
    });

    carousel.style.scrollBehavior = "smooth";
    carouselContainer.addEventListener("wheel", handleScroll, { passive: false });
    document.body.style.overflow = "hidden";

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            scrollToCard(index);
        });
    });

    updateActiveButton();
});
