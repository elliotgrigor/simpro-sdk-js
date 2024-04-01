export default class SimproSDK {
  #baseUrl;
  #headers;

  constructor({ fqdn = "", companyId = 0, accessToken = "" }) {
    this.#baseUrl = `https://${fqdn}/api/v1.0/companies/${companyId}`;
    this.#headers = {
      "Authorization": `Bearer ${accessToken}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  }

  /**
   * Ensures that the method string parameter is a valid HTTP verb.
   * 
   * @param {string} method
   * 
   * @returns {boolean}
   */
  #isValidMethod(method) {
    switch(method) {
    case "GET":
      return true;
    case "POST":
      return true;
    case "PATCH":
      return true;
    case "DELETE":
      return true;
    default:
      return false;
    }
  }

  /**
   * Ensures that the search type string parameter is valid.
   * 
   * @param {string} searchType
   * 
   * @returns {boolean}
   */
  #isValidSearchType(searchType) {
    switch(searchType) {
    case undefined:
      return true;
    case "all":
      return true;
    case "any":
      return true;
    default:
      return false
    }
  }

  /**
   * Makes an HTTP request to the Simpro instance's API.
   * 
   * @param {string} method
   * @param {string} resource
   * @param {Object} body
   * @param {Object} opts
   * 
   * @returns {Response|Object}
   */
  async send(method, resource = "", body = null, opts = {
    // searchType: string<all|any>
    // search:     string[]
    // columns:    string[]
    // orderBy:    string[]
    // page:       uint
    // pageSize:   uint<1..250>
    // limit:      uint
  }) {
    if (!this.#isValidMethod(method))
      return { error: "Invalid method string: Must be one of: GET|POST|PATCH|DELETE" };

    if (!this.#isValidSearchType(opts.searchType))
      return { error: "Invalid search type: Must be one of: any|all" };

    if (opts.limit && opts.limit < 0)
      return { error: "Invalid limit value: Must be zero or a positive integer" };

    let
      searchType = "",
      search     = "",
      columns    = "",
      orderBy    = "",
      page       = "",
      pageSize   = "",
      limit      = "";

    // Set when not `undefined`
    if (opts.searchType)
      searchType = `search=${opts.searchType}`;

    if (opts.search)
      search = `&${opts.search.join("&")}`;

    if (opts.columns)
      columns = `&columns=${opts.columns.join(",")}`;

    if (opts.orderBy)
      orderBy = `&orderby=${opts.orderBy.join(",")}`;

    if (opts.page)
      page = `&page=${opts.page}`;

    if (opts.pageSize)
      pageSize = `&pageSize=${opts.pageSize}`;

    if (opts.limit)
      limit = `&limit=${opts.limit}`;

    let querySeparator = "";

    if (method === "GET")
      querySeparator = "?";

    if (body)
      body = JSON.stringify(body);

    // Query the API
    const apiResponse = await fetch(
      `${this.#baseUrl}/${resource}${querySeparator}${searchType}${search}${columns}${orderBy}${page}${pageSize}${limit}`,
      {
        method,
        headers: this.#headers,
        body,
      },
    );

    return apiResponse;
  }

  /**
   * Returns all pages of data from a resource.
   * 
   * @param {string} resource
   * @param {Object} opts
   * 
   * @returns {Object}
   */
  async getPages(resource, opts = {}) {
    const dataPages = {};

    let resultPages = null;
    let pageNum = 1;

    do {
      opts.page = pageNum;

      const apiResponse = await this.send("GET", resource, null, opts);

      if (apiResponse.status !== 200)
        return { error: `Returned non-200 response: ${apiResponse.status} ${apiResponse.statusText}` };

      if (!resultPages)
        resultPages = parseInt(apiResponse.headers.get("result-pages"));

      const dataPage = await apiResponse.json();

      dataPages[`pg${pageNum}`] = dataPage;

      pageNum += 1;
    } while (pageNum <= resultPages);

    return dataPages;
  }

  /**
   * Returns all invoices in a paginated format.
   *
   * @param {Object} opts
   *
   * @returns {Object}
   */
  async getInvoices(opts = {}) {
    const invoicePages = await this.getPages("invoices/", opts);

    if (invoicePages.error) {
      return console.log(invoicePages.error);
    }

    return invoicePages;
  }

  /**
   * Returns all customers in a paginated format.
   *
   * @param {Object} opts
   *
   * @return {Object}
   */
  async getCustomers(opts = {}) {
    const customerPages = await this.getPages("customers/", opts);

    if (customerPages.error) {
      return console.log(customerPages.error);
    }

    return customerPages;
  }
}
