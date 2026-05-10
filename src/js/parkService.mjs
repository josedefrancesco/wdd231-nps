const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = "zSIOcjTjiR1vcByU5Tt33qGlgqreLnSTWASGZzmg";

async function getJson(url) {
  const finalUrl = `${baseUrl}${url}${url.includes("?") ? "&" : "?"}api_key=${apiKey}`;
  const response = await fetch(finalUrl);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("response not ok");
  }
}

export async function getParkData(parkCode) {
  const data = await getJson(`parks?parkCode=${parkCode}`);
  return data.data[0];
}

export function getInfoLinks(images, parkInfoLinks) {
  return parkInfoLinks.map((link, index) => {
    link.image = images[index + 2] ? images[index + 2].url : images[0].url;
    return link;
  });
}