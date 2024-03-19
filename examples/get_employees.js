import SimproSDK from "../sdk.js";
import { DOMAIN_NAME, COMPANY_ID, ACCESS_TOKEN } from "./config/simpro.js";

async function getEmployees() {
  const sdk = new SimproSDK({
    fqdn: DOMAIN_NAME,         // example: "myorg.simprocloud.com"
    companyId: COMPANY_ID,     // example: 0
    accessToken: ACCESS_TOKEN, // example: "5q0r2vq9aqe8ih7cg5v4m703rlj9tks7bk4myn31"
  });

  // INFO:
  //   1) Same strictness applies to trailing slashes
  //   2) Query parameter functions and wildcards are identical in use
  //   3) `body` and `opts` are optional
  //   4) All `opts` attributes are optional

  // send(method, resource = "", body = null, opts = {})
  const res = await sdk.send("GET", "employees/", null, {
    searchType: "any",
    search: ["ID=in(1,50)", "Name=A%"],
    columns: ["Name"],
    orderBy: ["-Name"],
    page: 2,
    pageSize: 12,
    limit: 0, // no limit
  });

  // Errors as values for simplicity
  if (res.error) {
    return console.log(res.error);
  }

  const data = await res.json();
  console.log(data);
}

if (import.meta.main) {
  await getEmployees();
}
