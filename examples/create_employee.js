import SimproSDK from "../sdk.js";
import { DOMAIN_NAME, COMPANY_ID, ACCESS_TOKEN } from "./config/simpro.js";

async function createEmployee() {
  const sdk = new SimproSDK({
    fqdn: DOMAIN_NAME,         // example: "myorg.simprocloud.com"
    companyId: COMPANY_ID,     // example: 0
    accessToken: ACCESS_TOKEN, // example: "5q0r2vq9aqe8ih7cg5v4m703rlj9tks7bk4myn31"
  });

  // send(method, resource = "", body = null, opts = {})
  const res = await sdk.send("POST", "employees/", {
    Name: "John Smith",
    Position: "Electrical Engineer"
    DateOfBirth: "1970-01-01",
    DateOfHire: "2024-02-17",
  });

  if (res.error) {
    return console.log(res.error);
  }

  const data = await res.json();
  console.log([res.status, res.statusText], data);
}

if (import.meta.main) {
  await createEmployee();
}
