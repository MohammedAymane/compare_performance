const PROTO_PATH = __dirname + "/movie.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const grpc_promise = require("grpc-promise");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  longs: String,
  oneofs: true,
  keepCase: true,
  enums: String,
  defaults: true,
});

const MovieService = grpc.loadPackageDefinition(packageDefinition).Movie;

const client = new MovieService(
  "localhost:3002",
  grpc.credentials.createInsecure()
);

grpc_promise.promisifyAll(client);

async function testGrpcAPI(requestsNumber) {
  try {
    var requests = [];
    for (let index = 0; index < requestsNumber; index++) {
      requests.push(client.GetListMovies().sendMessage({}));
    }
    var start = new Date();
    await Promise.all(
      requests.map(async (data, j) => {
        let d = await data;
      })
    );
    var end = new Date();

    console.log("GRPC API : Requests took:", (end - start) / 1000, "seconds");
  } catch (error) {
    console.error(error.message);
  }
}
export default testGrpcAPI;
