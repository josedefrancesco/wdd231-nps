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
    if (disclaimer) {
        disclaimer.href = parkData.url;
        disclaimer.innerHTML = parkData.fullName;
    }
    document.title = parkData.fullName;

    const heroImg = document.querySelector(".hero-banner img");
    if (heroImg) {
        heroImg.src = parkData.images[0].url;
        heroImg.alt = parkData.images[0].altText;
    }
    document.querySelector(".hero-banner__content").innerHTML = parkInfoTemplate(parkData);

    document.querySelector(".intro").innerHTML = `<h1>${parkData.fullName}</h1><p>${parkData.description}</p>`;
    
    const infoLinks = [
        { name: "Current Conditions &#x203A;", link: "conditions.html", image: parkData.images[2].url, description: "See what conditions to expect in the park before leaving on your trip!" },
        { name: "Fees and Passes &#x203A;", link: "fees.html", image: parkData.images[3].url, description: "Learn about the fees and passes that are available." },
        { name: "Visitor Centers &#x203A;", link: "visitor_centers.html", image: parkData.images[9].url, description: "Learn about the visitor centers in the park." }
    ];
    document.querySelector(".info").innerHTML = infoLinks.map(mediaCardTemplate).join("");

    setParkFooter(parkData);
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
            </div>`;
    }
}

init();