// import test functions REST GRAPHQL GRPC
const testTheRestAPI = require("./RESTtest");
const testTheGraphQLAPI = require("./GraphQLtest");
const testGrpcAPI = require("./gRPCtest");


console.log("**************Starting the test for REST API)**************");
for (let index = 0; index < 10; index++) {
    testTheRestAPI(10);
}
console.log("**************End of the test for REST API)**************");



console.log("**************Starting the test for GraphQL API)**************");
for (let index = 0; index < 10; index++) {
    testTheGraphQLAPI(10);
}
console.log("**************End of the test for GraphQL API)**************");

console.log("**************Starting the test for gRPC API)**************");
for (let index = 0; index < 10; index++) {
    testGrpcAPI(10);
}
console.log("**************End of the test for gRPC API)**************");