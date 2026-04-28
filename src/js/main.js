import { getParkData, getParkInfoLinks } from "./parkService.mjs";
import { mediaCardTemplate } from "./templates.mjs";

const parkData = getParkData();
const links = getParkInfoLinks(parkData);

function init() {
    setHeaderInfo(parkData);
    setParkIntro(parkData);
    setParkInfoLinks(links);
    setParkFooter(parkData);
}

function setHeaderInfo(data) {
    document.querySelector("head > title").textContent = data.fullName;
    const heroImg = document.querySelector(".hero-banner img");
    if (heroImg) {
        heroImg.src = data.images[0].url;
        heroImg.alt = data.images[0].altText;
    }
}

function setParkIntro(data) {
    document.querySelector(".intro").innerHTML = `<h1>${data.fullName}</h1><p>${data.description}</p>`;
}

function setParkInfoLinks(data) {
    const infoEl = document.querySelector(".info");
    const html = data.map(mediaCardTemplate);
    infoEl.innerHTML = html.join("");
}

function setParkFooter(data) {
    const footerEl = document.querySelector("#park-footer");
    const mailing = data.addresses.find((addr) => addr.type === "Mailing");
    const voice = data.contacts.phoneNumbers.find((num) => num.type === "Voice");

    footerEl.innerHTML = `
        <section class="contact-info">
            <h3>Contact Info</h3>
            <h4>Mailing Address</h4>
            <p>${mailing.line1}<br>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
            <h4>Phone:</h4>
            <p>${voice.phoneNumber}</p>
        </section>`;
}

init();