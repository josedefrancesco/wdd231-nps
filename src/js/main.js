import { getParkData } from "./parkService.mjs";
import { mediaCardTemplate } from "./templates.mjs";

async function init() {
  const parkData = await getParkData();

  document.title = parkData.fullName;

  const disclaimer = document.querySelector(".disclaimer > a");
  if (disclaimer) {
    disclaimer.href = parkData.url;
    disclaimer.innerHTML = parkData.fullName;
  }

  const heroImg = document.querySelector(".hero-banner img");
  if (heroImg) {
    heroImg.src = parkData.images[0].url;
    heroImg.alt = parkData.images[0].altText;
  }

  const heroContent = document.querySelector(".hero-banner__content");
  if (heroContent) {
    heroContent.innerHTML = parkInfoTemplate(parkData);
  }

  const intro = document.querySelector(".intro");
  if (intro) {
    intro.innerHTML = `
      <h1>${parkData.fullName}</h1>
      <p>${parkData.description}</p>
    `;
  }

const infoLinks = getParkInfoLinks(parkData);

  const info = document.querySelector(".info");
  if (info) {
    info.innerHTML = infoLinks.map(mediaCardTemplate).join("");
  }

  setParkFooter(parkData);
}

function parkInfoTemplate(info) {
  return `
    <a href="/" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>
  `;
}

function setParkFooter(data) {
  const footerEl = document.querySelector("#park-footer");

  const mailing = data.addresses.find((addr) => addr.type === "Mailing");
  const voice = data.contacts.phoneNumbers.find((num) => num.type === "Voice");

  if (footerEl && mailing && voice) {
    footerEl.innerHTML = `
      <div class="contact-info">
        <h3>Contact Info</h3>
        <h4>Mailing Address</h4>
        <p>${mailing.line1}<br>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
        <h4>Phone</h4>
        <p>${voice.phoneNumber}</p>
      </div>
    `;
  }
}

init();