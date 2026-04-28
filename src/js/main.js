import { getParkData } from "./parkService.mjs";
import { mediaCardTemplate } from "./templates.mjs"; // Importamos tu nuevo archivo

const parkData = getParkData();

//
const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: parkData.images[2].url,
    description: "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: parkData.images[3].url,
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    image: parkData.images[9].url,
    description: "Learn about the visitor centers in the park."
  }
];

//
function setHeaderInfo(data) {
    document.querySelector("head > title").textContent = data.fullName;
    const heroImg = document.querySelector(".hero-banner img");
    if (heroImg) {
        heroImg.src = data.images[0].url;
        heroImg.alt = data.images[0].altText;
    }
}

function setParkIntro(data) {
    document.querySelector(".intro").innerHTML = `
        <h1>${data.fullName}</h1>
        <p>${data.description}</p>
    `;
}

function setParkInfoLinks(links) {
    const infoEl = document.querySelector(".info");
    //
    const html = links.map(mediaCardTemplate);
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
        </section>
    `;
}

//
setHeaderInfo(parkData);
setParkIntro(parkData);
setParkInfoLinks(parkInfoLinks);
setParkFooter(parkData);