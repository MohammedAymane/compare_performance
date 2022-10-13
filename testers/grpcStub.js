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

// client.GetListMovies("Empty", (err, data) => {
//   if (!err) console.log(err);
//   console.log(data);
// });

grpc_promise.promisifyAll(client);
// client.GetListMovies({}, (err, data) => {
//   if (!err) console.log(err);
//   console.log(data);
// });

// define an async function
async function testGrpcAPI(requestsNumber) {
  try {
    // get data from jsonplaceholder API
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

// return await client.GetListMovies().sendMessage({});
testGrpcAPI(10);

// const start = new Date();
// var call = client.GetListMovies({});
//   call.on('data', function(feature) {
//       console.log('Found feature called ' + feature.title);});
//   call.on('end', function(data) {
//     console.log((new Date() - start)/1000);
//   });
//   call.on('error', function(e) {
//     // An error has occurred and the stream has been closed.
//   });
//   call.on('status', function(status) {
//     // process status
//   });
