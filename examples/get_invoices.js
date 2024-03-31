import SimproSDK from "../sdk.js";
import { DOMAIN_NAME, COMPANY_ID, ACCESS_TOKEN } from "./config/simpro.js";

async function getInvoices() {
  const sdk = new SimproSDK({
    fqdn: DOMAIN_NAME,         // example: "myorg.simprocloud.com"
    companyId: COMPANY_ID,     // example: 0
    accessToken: ACCESS_TOKEN, // example: "5q0r2vq9aqe8ih7cg5v4m703rlj9tks7bk4myn31"
  });

  // getInvoices(opts = {})
  const invoices = await sdk.getInvoices({
    search: ["IsPaid=false"],
    columns: ["ID", "IsPaid"],
    pageSize: 250,
  });

  if (invoices.error) {
    return console.log(invoices.error);
  }

  console.log(invoices.pg1);
}

if (import.meta.main) {
  await getInvoices();
}
