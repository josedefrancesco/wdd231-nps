const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = "zSIOcjTjiR1vcByU5Tt33qGlgqreLnSTWASGZzmg";

async function getJson(url) {
  const response = await fetch(url, {
    headers: {
      "X-Api-Key": apiKey
    }
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.data; 
}

export async function getParkData() {
  const url = `${baseUrl}parks?parkCode=yell`; 
  const data = await getJson(url);
  return data[0]; 
}

export async function getParkAlerts(parkCode) {
  const url = `${baseUrl}alerts?parkCode=${parkCode}`;
  return await getJson(url);
}

export async function getVisitorCenterData(parkCode) {
  const url = `${baseUrl}visitorcenters?parkCode=${parkCode}`;
  return await getJson(url);
}