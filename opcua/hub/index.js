/*global require,console,setTimeout */
var opcua = require("node-opcua");
var async = require("async");
var request = require("request");

var the_session, the_subscription;
var client = new opcua.OPCUAClient();
var sensor = "opc.tcp://REMOTE-SENSOR-ADDRESS:4334/UA/MyLittleServer";
var receiver = "http://REMOTE-SERVER-ADDRESS.com:8080";

async.series([

    // step 1 : connect to
    function (callback) {
      client.connect(sensor, function (err) {
        if (err) {
          console.log("cannot connect to endpoint :", sensor);
        } else {
          console.log("connected!");
        }
        callback(err);
      });
    },

    // step 2 : createSession
    function (callback) {
      client.createSession(function (err, session) {
        if (!err) {
          the_session = session;
        }
        callback(err);
      });
    },

    // step 3 : read a variable with readVariableValue
    function (callback) {
      the_session.readVariableValue("ns=1;s=MyVariable1", function (err, dataValue) {
        if (!err) {
          console.log("MyVariable1 = ", dataValue.value.value);
        }
        callback(err);
      });
    },

    // step 4 : set a variable with writeSingleNode
    function (callback) {
      the_session.writeSingleNode("ns=1;s=MyVariable1", new opcua.Variant({
        dataType: opcua.DataType.Double,
        value: 100
      }), function (err) {
        callback(err);
      });
    },

    // step 5: install a subscription and install a monitored item for 10 seconds
    function (callback) {
      the_subscription = new opcua.ClientSubscription(the_session, {
        requestedPublishingInterval: 1000,
        requestedLifetimeCount: 10,
        requestedMaxKeepAliveCount: 2,
        maxNotificationsPerPublish: 10,
        publishingEnabled: true,
        priority: 10
      });

      the_subscription.on("started", function () {
        console.log("subscription started for 2 seconds - subscriptionId=", the_subscription.subscriptionId);
      }).on("keepalive", function () {
        console.log("keepalive");
      }).on("terminated", function () {
        callback();
      });

      setTimeout(function () {
        the_subscription.terminate();
      }, 10000);

      // install monitored item
      var monitoredItem = the_subscription.monitor({
          nodeId: opcua.resolveNodeId("ns=1;s=MyVariable1"),
          attributeId: opcua.AttributeIds.Value
        },
        {
          samplingInterval: 100,
          discardOldest: true,
          queueSize: 10
        },
        opcua.read_service.TimestampsToReturn.Both
      );
      console.log("-------------------------------------");

      monitoredItem.on("changed", function (dataValue) {
        console.log("MyVariable1 = ", dataValue.value.value);

        //send to receiver
        var data = {
          device: 'sensor1',
          timestamp: Date.now(),
          MyVariable1: dataValue.value.value
        };
        request.post({url: receiver, form: data}, function (err) {
          if (err) console.log('Failed to send to ' + receiver);
        });
      });
    },

    // close session
    function (callback) {
      the_session.close(function (err) {
        if (err) {
          console.log("session closed failed ?");
        }
        callback();
      });
    }

  ],
  function (err) {
    if (err) {
      console.log("failure ", err);
    } else {
      console.log("done!");
    }
    client.disconnect(function () {
    });
  });
