const axios = require("axios");

async function testTheGraphQLAPI(requestsNumber) {
  let requests = [];
  try {
    for (let index = 0; index < requestsNumber; index++) {
      requests.push(
        axios({
          url: "http://graphqlmovie:3001/graphql",
          method: "post",
          data: {
            query: `
                  query {
                    all_movies {
                        id
                        title
                        rating
                        director
                        }
                    }
                    `,
          },
        })
      );
    }
    var start = new Date();
    await Promise.all(
      requests.map(async (data, j) => {
        let d = await data;
      })
    );
    var end = new Date();
    console.log("GraphQL Requests took:", (end - start) / 1000, "seconds");
  } catch (error) {
    console.error(error);
  }
}

export default testTheGraphQLAPI;
