setTimeout(function timeoutCallback() {
  console.log("fertig timeout A");
}, Math.random() * 3000);

setTimeout(function timeoutCallback() {
  console.log("fertig timeout B");
}, Math.random() * 2000);

// Man kann nicht mehr 100% sagen, welcher Timeout-Callback (A oder B) zuerst ausgeführt wird...
// Man kann aber garantieren, dass die setTimeout-Statements in der Rheinfolge GESTARTET werden
