import SimproSDK from "../sdk.js";
import { DOMAIN_NAME, COMPANY_ID, ACCESS_TOKEN } from "./config/simpro.js";

async function getAllEmployees() {
  const sdk = new SimproSDK({
    fqdn: DOMAIN_NAME,         // example: "myorg.simprocloud.com"
    companyId: COMPANY_ID,     // example: 0
    accessToken: ACCESS_TOKEN, // example: "5q0r2vq9aqe8ih7cg5v4m703rlj9tks7bk4myn31"
  });

  // getPages(resource, opts = {})
  const pages = await sdk.getPages("employees/", {
    orderBy: ["ID"],
    page: 100, // this is ignored
    pageSize: 250,
  });

  if (pages.error) {
    return console.log(pages.error);
  }

  for (const page in pages) {
    console.log(pages[page]);
  }
}

if (import.meta.main) {
  await getAllEmployees();
}
