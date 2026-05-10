export function mediaCardTemplate(info) {
  return `
    <div class="media-card">
        <a href="${info.link}">
            <img src="${info.image}" alt="${info.name}">
            <h3>${info.name}</h3>
        </a>
        <p>${info.description}</p>
    </div>`;
}

export function setHeaderFooter(parkData) {
  const titleElements = document.querySelectorAll(".park-name");
  titleElements.forEach((el) => {
    el.innerText = parkData.fullName;
  });

  const heroImg = document.querySelector(".hero-banner img");
  if (heroImg && parkData.images.length > 0) {
    heroImg.src = parkData.images[0].url;
    heroImg.alt = parkData.images[0].altText;
  }

  const footer = document.querySelector("#park-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="footer-info">
        <p class="park-name">${parkData.fullName}</p>
        <p>${parkData.designation}</p>
      </div>
      <div class="footer-location">
        <p>${parkData.states}</p>
      </div>
    `;
  }
}

export function setParkIntro(parkData) {
  const introSection = document.querySelector(".intro");
  if (introSection) {
    introSection.innerHTML = `
      <h1>${parkData.fullName}</h1>
      <p>${parkData.description}</p>
    `;
  }
}

export function setParkInfoLinks(links) {
  const container = document.querySelector(".info-container");
  if (container) {
    container.innerHTML = links.map(mediaCardTemplate).join("");
  }
}