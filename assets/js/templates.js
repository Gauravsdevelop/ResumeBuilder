document.addEventListener("DOMContentLoaded", function() {
    const templates = document.querySelectorAll(".template");
    let delay = 0.1;
    templates.forEach(template => {
        setTimeout(() => {
            template.style.opacity = "1";
            template.style.transform = "translateY(0)";
        }, delay * 1000);
        delay += 0.1;
    });
});
