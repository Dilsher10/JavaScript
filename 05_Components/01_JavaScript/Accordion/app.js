const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {

    const button = accordion.querySelector(".question");
    const answer = accordion.querySelector(".answer");
    const icon = accordion.querySelector(".icon");


    const closeAll = () => {
        accordions.forEach((acc) => {
            const btn = acc.querySelector(".question");
            const ans = acc.querySelector(".answer");
            const icn = acc.querySelector(".icon");

            btn.setAttribute("aria-expanded", "false");
            ans.setAttribute("aria-hidden", "true");
            ans.classList.remove("active");
            icn.classList.remove("active");
        });
    };


    const toggleAccordion = () => {
        
        const isExpanded = button.getAttribute("aria-expanded") === "true";

        closeAll();

        if (!isExpanded) {
            button.setAttribute("aria-expanded", "true");
            answer.setAttribute("aria-hidden", "false");
            answer.classList.add("active");
            icon.classList.add("active");
        }
    };

    // Mouse click
    button.addEventListener("click", toggleAccordion);

    // Keyboard support
    button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleAccordion();
        }
    });


});
