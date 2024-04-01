import SimproSDK from "../sdk.js";
import { DOMAIN_NAME, COMPANY_ID, ACCESS_TOKEN } from "./config/simpro.js";

async function getCustomers() {
  const sdk = new SimproSDK({
    fqdn: DOMAIN_NAME,         // example: "myorg.simprocloud.com"
    companyId: COMPANY_ID,     // example: 0
    accessToken: ACCESS_TOKEN, // example: "5q0r2vq9aqe8ih7cg5v4m703rlj9tks7bk4myn31"
  });

  // getCustomers(opts = {})
  const customers = await sdk.getCustomers({
    search: ["Profile.CustomerGroup.ID=in(19,20)"],
    orderBy: ["ID"],
    pageSize: 250,
  });

  if (customers.error) {
    return console.log(customers.error);
  }

  console.log(customers.pg1);
}

if (import.meta.main) {
  await getCustomers();
}
