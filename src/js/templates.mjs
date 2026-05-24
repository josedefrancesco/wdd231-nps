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