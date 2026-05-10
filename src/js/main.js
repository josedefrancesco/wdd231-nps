import { getParkData, getInfoLinks } from "./parkService.mjs";
import parkInfoLinks from "./parkinfo.json" with { type: "json" };
import { setHeaderFooter, setParkIntro, setParkInfoLinks } from "./templates.mjs";

async function init() {
  const parkCode = "glac";
  try {
    const parkData = await getParkData(parkCode);
    
    setHeaderFooter(parkData);
    setParkIntro(parkData);
    
    const links = getInfoLinks(parkData.images, parkInfoLinks);
    setParkInfoLinks(links);
  } catch (error) {
    console.error("Initialization error:", error);
  }
}

init();