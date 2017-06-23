/*global require,setInterval,console */
var opcua = require("node-opcua");
var min = 1;
var max = 100;

// Let's create an instance of OPCUAServer
var server = new opcua.OPCUAServer({
  port: 4334, // the port of the listening socket of the server
  resourcePath: "UA/MyLittleServer", // this path will be added to the endpoint resource name
  buildInfo: {
    productName: "MySampleServer1",
    buildNumber: "7658",
    buildDate: new Date(2014, 5, 2)
  }
});

function post_initialize() {
  console.log("initialized");
  function construct_my_address_space(server) {

    var addressSpace = server.engine.addressSpace;

    // declare a new object
    var device = addressSpace.addObject({
      organizedBy: addressSpace.rootFolder.objects,
      browseName: "MyDevice"
    });

    // add some variables
    // add a variable named MyVariable1 to the newly created folder "MyDevice"
    var variable1 = 1;

    // emulate variable1 changing every 500 ms
    setInterval(function () {
      variable1 = Math.floor(max - Math.random() * (max - min));
    }, 500);

    addressSpace.addVariable({
      componentOf: device,
      nodeId: "ns=1;s=MyVariable1", // a string nodeID
      browseName: "MyVariable1",
      dataType: "Double",
      value: {
        get: function () {
          return new opcua.Variant({dataType: opcua.DataType.Double, value: variable1});
        },
        set: function (variant) {
          variable1 = parseFloat(variant.value);
          return opcua.StatusCodes.Good;
        }
      }
    });
  }

  construct_my_address_space(server);
  server.start(function () {
    console.log("Server is now listening ... ( press CTRL+C to stop)");
    console.log("port ", server.endpoints[0].port);
    var endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl;
    console.log(" the primary server endpoint url is ", endpointUrl);
  });
}
server.initialize(post_initialize);
