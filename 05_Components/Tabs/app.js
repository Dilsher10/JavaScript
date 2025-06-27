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
            const index = Array.prototype.indexOf.call(tabs, tab);
            if (e.key === "ArrowRight") {
                // Move to next tab
                const next = tabs[(index + 1) % tabs.length];
                next.focus();
                activateTab(next);
            } else if (e.key === "ArrowLeft") {
                // Move to previous tab
                const prev = tabs[(index - 1 + tabs.length) % tabs.length];
                prev.focus();
                activateTab(prev);
            }
        });
    });

    /**
     * Activates the given tab:
     * - Updates aria-selected
     * - Shows the correct panel
     */
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
