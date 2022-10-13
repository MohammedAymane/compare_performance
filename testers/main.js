// import test functions REST GRAPHQL GRPC
const testTheRestAPI = require("./RESTtest");
const testTheGraphQLAPI = require("./GraphQLtest");
const testGrpcAPI = require("./gRPCtest");

(async () => {
  // test the gRPC API
  for (let index = 0; index < 10; index++) {
    await testGrpcAPI(10);
  }
  // test the REST API
  for (let index = 0; index < 10; index++) {
    await testTheRestAPI(10);
  }
  // test the GraphQL API
  for (let index = 0; index < 10; index++) {
    await testTheGraphQLAPI(10);
  }
})();
