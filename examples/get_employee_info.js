import SimproSDK from "../sdk.js";
import { DOMAIN_NAME, COMPANY_ID, ACCESS_TOKEN } from "./config/simpro.js";

async function getEmployeeInfo() {
  const sdk = new SimproSDK({
    fqdn: DOMAIN_NAME,         // example: "myorg.simprocloud.com"
    companyId: COMPANY_ID,     // example: 0
    accessToken: ACCESS_TOKEN, // example: "5q0r2vq9aqe8ih7cg5v4m703rlj9tks7bk4myn31"
  });

  // getEmployeeById(id = null, columns = [])
  const employee = await sdk.getEmployeeById(666, [
    "ID",
    "Name",
    "Position",
    "DateOfHire",
  ]);

  if (employee.error) {
    return console.log(employee.error);
  }

  console.log(employee);
}

if (import.meta.main) {
  await getEmployeeInfo();
}
