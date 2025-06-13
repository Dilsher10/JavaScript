const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
    const button = accordion.querySelector(".question");
    const answer = accordion.querySelector(".answer");
    const icon = accordion.querySelector(".icon");

    button.addEventListener("click", () => {
        const isExpanded = button.getAttribute("aria-expanded") === "true";

        // Close all
        accordions.forEach((item) => {
            item.querySelector(".answer").classList.remove("active");
            item.querySelector(".icon").classList.remove("active");
            item.querySelector(".question").setAttribute("aria-expanded", "false");
        });

        // Open current if it was closed
        if (!isExpanded) {
            answer.classList.add("active");
            icon.classList.add("active");
            button.setAttribute("aria-expanded", "true");
        }
    });
});
