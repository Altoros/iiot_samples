# iiot_samples
## Industrial M2M protocols: Modbus and OPC 

This part will be about OSI model, I'll tell about the different industrial protocols, then I'll focus on __modbus__ and __opc ua__, give some details about them. E.g. modbus can read memory cell one by one, support only only slave to master connection. opc ua keeps permanent connection, always gets updates, knows when client or server is disconnected, resends the lost data. Both protocols will be compared (eg., opensource, osi level, speed, data, limitations, possible operations, etc.). __The sample of code for modbus__ is here https://github.com/Altoros/iiot_samples/tree/master/modbus. How does it work? A server accepts connection on the port 1502, a client connects to this port, reads and changes some data on the server. 

There is a similar __sample for opc ua__  https://github.com/Altoros/iiot_samples/tree/master/opcua. How does it work? A server accepts connection on port 4334 and emulates changing variable every 500ms, a client connects to the server, reads this variable, sets a new value, subscribes to the changes and closes connection in 10 seconds.

## Application level protocols: HTTP and WebSocket

In this part I'll compare http and ws protocols. Discuss possible ways to keep a client updated, like periodic requesting, long polling, websockets. Mention latency issue and security for both protocols, http/2. There is an example for __http  protocol__ https://github.com/Altoros/iiot_samples/tree/master/http and discussed ways to send data. How does the sample of code work? A server accepts connections on 8080 port and supports CRUD. Also the server accepts the search of queries and generates stream with random data. A client connects to the server and lists all existing info, creates a new entity  with POST params, search the entities with GET params and reads a stream. Another example is given for __websocket protocol__ https://github.com/Altoros/iiot_samples/tree/master/ws. The server accepts connections on the 8080 port and sends a message to every new connected client. When one more client is connected, the server sends a message about it to the rest of existing clients. 

## Hardware for the prototypes: Raspberry Pi, Intel Edison

In this part different devices for prototyping will be described. Raspberry, and Edison will be compared (hardware characteristics, pricing, embedded software). I'll tell about the limitations of devices, mention the list of sensors that can be connected, the ways to communicate with hardware. Also I'll describe a process of adding a new device to iot network (unpacking, switching on, flashing, connecting sensor, sending data, troubleshooting). 

## Storage options in Predix

Data management services provided by Predix: asset management, time series, postgresql, blobstore, rabbitmq, redis. One of services will be used for storing data from device. Here I'll add one more sample of code.
