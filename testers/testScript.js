const axios = require("axios");
// const { gql, GraphQLClient, default: request } = require("graphql-request");

// define function to get data from user API
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


// define function to get data from movie API (graphql)
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



//for (let index = 0; index < 10; index++) {
//    testTheRestAPI(10);
//}

for (let index = 0; index < 10; index++) {
    testTheGraphQLAPI(10);
}