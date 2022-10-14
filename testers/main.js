// import test functions REST GRAPHQL GRPC
const testTheRestAPI = require("./RESTtest");
const {testTheGraphQLAPI, testTheGraphQLAPI2} = require("./GraphQLtest");
const testGrpcAPI = require("./gRPCtest");

(async () => {
  // test the gRPC API
  console.log("***********Testing gRPC API : Envoie de 10 requêtes en parallèle 10 fois***********"); 
  for (let index = 0; index < 10; index++) {
    await testGrpcAPI(10);
  }
  // test the REST API
  console.log("***********Testing REST API : Envoie de 10 requêtes en parallèle 10 fois***********"); 
  for (let index = 0; index < 10; index++) {
    await testTheRestAPI(10);
  }
  // test the GraphQL API 1
  console.log("***********Testing GraphQL API 1 : Envoie de 10 requêtes en parallèle 10 fois***********"); 
  for (let index = 0; index < 10; index++) {
    await testTheGraphQLAPI(10);
  }

  // test the GraphQL API 2
  console.log("***********Testing GraphQL API 2 (Requesting only part of the data) : Envoie de 10 requêtes en parallèle 10 fois***********"); 
  for (let index = 0; index < 10; index++) {
    await testTheGraphQLAPI2(10);
  }
})();
