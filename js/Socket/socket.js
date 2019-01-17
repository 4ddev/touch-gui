
if( 'function' === typeof importScripts) {
    importScripts('CommunicationSocket.js');
    var wsUri = "wss://echo.websocket.org/";
    var socket = new CommunicationSocket(wsUri);
    addEventListener('message', onMessage,false);
    
    function onMessage(e) {
        socket.send(e.data);
    }
 }