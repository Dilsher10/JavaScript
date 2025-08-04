document.addEventListener("DOMContentLoaded", () => {
    // Get all tabs and the tablist container
    const tabs = document.querySelectorAll('[role="tab"]');

    // Loop through each tab
    tabs.forEach(tab => {
        // Click event to activate tab
        tab.addEventListener("click", () => {
            activateTab(tab);
        });

        // Keyboard navigation using arrow keys
        tab.addEventListener("keydown", (e) => {
            const index = Array.from(tabs).indexOf(tab);
            if (e.key === "ArrowRight") {
                let nextIndex = index + 1;
                if (nextIndex >= tabs.length) {
                    nextIndex = 0;
                }
                const nextTab = tabs[nextIndex];
                nextTab.focus();
                activateTab(nextTab);
            } else if (e.key === "ArrowLeft") {
                let prevIndex = index - 1;
                if (prevIndex < 0) {
                    prevIndex = tabs.length - 1;
                }
                const prevTab = tabs[prevIndex];
                prevTab.focus();
                activateTab(prevTab);
            }
        });
    });




    function activateTab(tab) {
        // Deactivate all tabs
        tabs.forEach(t => {
            t.setAttribute("aria-selected", false);
        });

        // Activate current tab
        tab.setAttribute("aria-selected", true);

        // Hide all panels
        const panels = document.querySelectorAll('[role="tabpanel"]');
        panels.forEach(panel => {
            panel.hidden = true;
        });

        // Show the panel linked to the active tab
        const target = document.getElementById(tab.getAttribute("aria-controls"));
        target.hidden = false;
    }
});
