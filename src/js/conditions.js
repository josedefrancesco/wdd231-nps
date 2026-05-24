import "../css/style.css"; 
import "../css/conditions.css";

import { getParkData, getParkAlerts, getVisitorCenterData } from "./parkService.mjs";
import { alertTemplate, visitorCenterTemplate, activityTemplate } from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

function setAlerts(alerts) {
  const alertsContainer = document.querySelector(".alerts > ul");
  alertsContainer.innerHTML = "";
  const html = alerts.map(alertTemplate);
  alertsContainer.insertAdjacentHTML("beforeend", html.join(""));
}

function setVisitorCenters(centers) {
  const visitorContainer = document.querySelector(".visitor ul");
  visitorContainer.innerHTML = "";
  const html = centers.map(visitorCenterTemplate);
  visitorContainer.insertAdjacentHTML("beforeend", html.join(""));
}

function setActivities(activities) {
  const activitiesContainer = document.querySelector(".activities ul");
  activitiesContainer.innerHTML = "";
  const html = activities.map(act => activityTemplate(act.name || act));
  activitiesContainer.insertAdjacentHTML("beforeend", html.join(""));
}

async function init() {
  const parkData = await getParkData();
  setHeaderFooter(parkData);
  const alerts = await getParkAlerts(parkData.parkCode);
  const visitorCenters = await getVisitorCenterData(parkData.parkCode);

  setAlerts(alerts);
  setVisitorCenters(visitorCenters);
  setActivities(parkData.activities || []);
}

init();