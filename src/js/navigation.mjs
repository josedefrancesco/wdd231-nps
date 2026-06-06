export function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  const navMenu = document.querySelector(".global-nav");

  if (!menuButton || !navMenu) return;

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    
    menuButton.setAttribute("aria-expanded", !isExpanded);
    navMenu.classList.toggle("show");
  });
}