import "../css/style.css";
import { getParkData, getInfoLinks } from "./parkService.mjs";
import parkInfoLinks from "./parkinfo.json" with { type: "json" };
import { setHeaderFooter, setParkIntro, setParkInfoLinks } from "./templates.mjs";
import { enableNavigation } from "./navigation.mjs";

async function init() {
  const parkCode = "yell";
  try {
    const parkData = await getParkData(parkCode);
    
    setHeaderFooter(parkData);
    setParkIntro(parkData);
    
    const links = getInfoLinks(parkData.images, parkInfoLinks);
    setParkInfoLinks(links);

    enableNavigation();

  } catch (error) {
    console.error("Initialization error:", error);
  }
}

init();