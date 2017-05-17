# iiot_samples
## Industrial M2M protocols: Modbus and OPC 
This part will be about OSI model, I'll tell about the different industrial protocols, then I'll focus on __modbus__ and __opc ua__, give some details about them. E.g. modbus can read memory cell one by one, support only only slave to master connection. opc ua keeps permanent connection, always gets updates, knows when client or server is disconnected, resends the lost data. Both protocols will be compared (eg., opensource, osi level, speed, data, limitations, possible operations, etc.). __The sample of code for modbus__ is here https://github.com/Altoros/iiot_samples/tree/master/modbus. How does it work? Server accepts connection on the port 1502, client connects to this port, reads and changes some data on the server. 

There is a similar __sample for opc ua__  https://github.com/Altoros/iiot_samples/tree/master/opcua. How does it work? Server accepts connection on port 4334 and emulates changing variable every 500ms, client connects to server, reads this variable, sets a new value, subscribes to the changes and closes connection in 10 seconds.

## Application level protocols: HTTP and WebSocket
## Hardware for the prototypes: Raspberry Pi, Intel Edison
## Storage options in Predix
