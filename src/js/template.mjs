export function mediaCardTemplate(info) {
  return `<div class="media-card">
    <a href="${info.link}">
        <img src="${info.image}" alt="${info.name}">
        <h3>${info.name}</h3>
    </a>
    <p>${info.description}</p>
  </div>`;
}