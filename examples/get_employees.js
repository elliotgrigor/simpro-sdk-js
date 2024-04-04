import SimproSDK from "../sdk.js";
import { DOMAIN_NAME, COMPANY_ID, ACCESS_TOKEN } from "./config/simpro.js";

async function getEmployees() {
  const sdk = new SimproSDK({
    fqdn: DOMAIN_NAME,         // example: "myorg.simprocloud.com"
    companyId: COMPANY_ID,     // example: 0
    accessToken: ACCESS_TOKEN, // example: "5q0r2vq9aqe8ih7cg5v4m703rlj9tks7bk4myn31"
  });

  // getEmployees(opts = {})
  const employees = await sdk.getEmployees({
    columns: ["ID", "Name", "Position"],
    orderBy: ["Position"],
    pageSize: 100,
  });

  if (employees.error) {
    return console.log(employees.error);
  }

  console.log(employees.pg1);
}

if (import.meta.main) {
  await getEmployees();
}
