

// function onDisconnectSimple() {
//     // [START rtdb_ondisconnect_simple]
//     var presenceRef = firebase.database().ref("disconnectmessage");
//     // Write a string when this client loses connection
//     presenceRef.onDisconnect().set("I disconnected!");
//     console.log(presenceRef.onDisconnect())
//     // [END rtdb_ondisconnect_simple]
//   }
// //  setInterval(onDisconnectSimple, 1000);
// onDisconnectSimple()


// function onDisconnectCallback() {
//     var presenceRef = firebase.database().ref("disconnectmessage");
  
//     // [START rtdb_ondisconnect_callback]
//     presenceRef.onDisconnect().remove((err) => {
//       if (err) {
//         console.error("could not establish onDisconnect event", err);
//       }
//     });
//     // [END rtdb_ondisconnect_callback]
//   }

//   onDisconnectCallback()