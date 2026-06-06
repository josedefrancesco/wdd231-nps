import "../css/style.css";
import { getParkData, getInfoLinks } from "./parkService.mjs";
import parkInfoLinks from "./parkinfo.json" with { type: "json" };
import { setHeaderFooter, setParkIntro, setParkInfoLinks } from "./templates.mjs";

// Controls the mobile responsive navigation menu dropdown and states
function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  const globalNav = document.querySelector(".global-nav");

  // Safeguard: Exit if required navigation nodes do not exist in the DOM
  if (!menuButton || !globalNav) return;

  menuButton.addEventListener("click", (ev) => {
    let target = ev.target;

    // 1. Toggle the drop-down accordion transition layout
    globalNav.classList.toggle("show");

    // 2. Event Bubbling Fix: If an inner SVG or span is clicked, scale up to the BUTTON element
    if (target.tagName !== "BUTTON") {
      target = target.closest("button");
    }

    // 3. Update ARIA attribute states based on menu visibility (drives the CSS label swap)
    if (globalNav.classList.contains("show")) {
      target.setAttribute("aria-expanded", "true");
    } else {
      target.setAttribute("aria-expanded", "false");
    }
  });
}

async function init() {
  const parkCode = "glac";
  try {
    const parkData = await getParkData(parkCode);
    
    setHeaderFooter(parkData);
    setParkIntro(parkData);
    
    const links = getInfoLinks(parkData.images, parkInfoLinks);
    setParkInfoLinks(links);

    // Initialize the mobile navigation trigger once elements are rendered
    enableNavigation();

  } catch (error) {
    console.error("Initialization error:", error);
  }
}

init();