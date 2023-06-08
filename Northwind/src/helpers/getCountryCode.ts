import fsp from "fs/promises";

export default async function getCountryCode(ip: string) {
  const decIp = ipToDecIp(ip);
  console.log(decIp);
  const data = await fsp.readFile("./IP2LOCATION-LITE-DB1.CSV", "utf8");
  return findIpRowAccordingDecIp(data, decIp);
}

function ipToDecIp(ip: string) {
  console.log(ip)
  const octetArr: string[] = [];
  ip.split(".").forEach((el) => {
    octetArr.push("0".repeat(8 - (+el).toString(2).length) + (+el).toString(2));
  });
  return parseInt(octetArr.join(""), 2);
}

function findIpRowAccordingDecIp(rows: string, decIp: number) {
  for (let el of rows.toString().split("\n")) {
    const [ipStart, ipEnd, countryCode] = el.split(",");
    if (decIp >= +ipStart && decIp <= +ipEnd) {
      return countryCode;
    }
  }
  return "no such country";
}
