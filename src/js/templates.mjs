import spritePath from '../images/sprite.symbol.svg';

export function alertTemplate(alert) {
  let alertType = "";
  
  switch (alert.category) {
    case "Park Closure":
      alertType = "closure";
      break;
    default:
      alertType = alert.category ? alert.category.toLowerCase() : "information";
  }

  return `
    <li class="alert">
      <svg class="icon" focusable="false" aria-hidden="true">
        <use xlink:href="${spritePath}#alert-${alertType}"></use>
      </svg>
      <div>
        <h3 class="alert-${alertType}">${alert.title}</h3>
        <p>${alert.description}</p>
      </div>
    </li>
  `;
}

export function visitorCenterTemplate(center) {
  return `
    <li class="visitor-center">
      <h3>${center.name}</h3>
      <p>${center.description}</p>
      <p><em>Directions:</em> ${center.directionsInfo}</p>
    </li>
  `;
}

export function activityTemplate(activity) {
  return `<li>${activity}</li>`; 
}

// --- NEW CODE: Required by main.js to render Header, Footer, Intro, and Info Links ---

// Generates the header layout containing the global mobile navigation trigger and desktop nav
function headerTemplate(parkData) {
  return `
    <div class="logo">
      <img src="/images/nps-logo.svg" alt="NPS Logo">
      <div>
        <h1>National Park Service</h1>
        <span>${parkData.fullName || "National Park"}</span>
      </div>
    </div>
    <button id="global-nav-toggle" class="global-nav__toggle" aria-expanded="false" aria-label="Open Menu">
      <div class="global-nav__toggle--closed">
        <svg class="icon"><use xlink:href="${spritePath}#menu"></use></svg>
        Menu
      </div>
      <div class="global-nav__toggle--open">
        <svg class="icon"><use xlink:href="${spritePath}#close"></use></svg>
        Close
      </div>
    </button>
    <nav class="global-nav">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="#info">Info</a></li>
        <li><a href="#alerts">Alerts</a></li>
        <li><a href="#maps">Maps</a></li>
      </ul>
    </nav>
  `;
}

// Generates the standard footer layout
function footerTemplate() {
  return `
    <p>&copy; 2026 National Park Service. All rights reserved.</p>
  `;
}

// Injects the compiled Header and Footer templates directly into the DOM
export function setHeaderFooter(parkData) {
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  if (headerElement) headerElement.innerHTML = headerTemplate(parkData);
  if (footerElement) footerElement.innerHTML = footerTemplate();
}

// Injects the introductory title and description of the specific park
export function setParkIntro(parkData) {
  const introElement = document.querySelector("#park-intro");
  if (!introElement) return;

  introElement.innerHTML = `
    <h2>${parkData.fullName}</h2>
    <p>${parkData.description}</p>
  `;
}

// Renders the combined information links as visual dynamic cards
export function setParkInfoLinks(links) {
  const linksContainer = document.querySelector("#park-links");
  if (!linksContainer) return;

  const htmlHTML = links.map(link => `
    <div class="info-card">
      <img src="${link.image}" alt="${link.name}" class="info-card__image">
      <h3><a href="${link.target}">${link.name}</a></h3>
    </div>
  `).join("");

  linksContainer.innerHTML = htmlHTML;
}