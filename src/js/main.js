import { getParkData } from "./parkService.mjs";
import { mediaCardTemplate } from "./templates.mjs";

const parkData = getParkData();

function parkInfoTemplate(info) {
  return `
    <a href="/" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
        <span>${info.designation}</span>
        <span>${info.states}</span>
    </p>`;
}

function init() {
    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href = parkData.url;
    disclaimer.innerHTML = parkData.fullName;
    document.title = parkData.fullName;

    document.querySelector(".hero-banner img").src = parkData.images[0].url;
    document.querySelector(".hero-banner__content").innerHTML = parkInfoTemplate(parkData);

    document.querySelector(".intro").innerHTML = `<h1>${parkData.fullName}</h1><p>${parkData.description}</p>`;
    
    const infoLinks = [
        { name: "Conditions", link: "#", image: parkData.images[2].url, description: "Current conditions info." },
        { name: "Fees", link: "#", image: parkData.images[3].url, description: "Fee information." },
        { name: "Visitor Centers", link: "#", image: parkData.images[9].url, description: "Visitor center locations." }
    ];
    document.querySelector(".info").innerHTML = infoLinks.map(mediaCardTemplate).join("");

    setParkFooter(parkData);
}

function setParkFooter(data) {
    const footerEl = document.querySelector("#park-footer");
    const mailing = data.addresses.find((addr) => addr.type === "Mailing");
    const voice = data.contacts.phoneNumbers.find((num) => num.type === "Voice");
    footerEl.innerHTML = `<h3>Contact Info</h3><p>${mailing.line1}<br>${mailing.city}, ${mailing.stateCode}</p><p>${voice.phoneNumber}</p>`;
}

init();