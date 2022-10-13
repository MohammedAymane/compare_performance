const axios = require("axios");

async function testTheRestAPI(requestsNumber) {
  try {
    var requests = [];
    for (let index = 0; index < requestsNumber; index++) {
      requests.push(axios.get("http://restmovie:3200/movies"));
    }
    var start = new Date();
    await Promise.all(
      requests.map(async (data, j) => {
        let d = await data;
      })
    );
    var end = new Date();
    console.log("REST API : Requests took:", (end - start) / 1000, "seconds");
  } catch (error) {
    console.error(error.message);
  }
}
module.exports = testTheRestAPI;
