const timeoutAPeriod = 300;
const timeoutBPeriod = 0;

console.log("timeoutAPeriod:", timeoutAPeriod);
console.log("timeoutBPeriod:", timeoutBPeriod);

setTimeout(function timeoutCallback() {
  setTimeout(function timeoutCallback() {
    console.log("fertig timeout B");
  }, timeoutBPeriod);

  console.log("fertig timeout A");
}, timeoutAPeriod);

// Console: A dann B
// Warum ?
// Der B-Timeout wird gestartet, dann wird "fertig timeout A" in die console geloggt und der Callback vom B-Timeout stellt sich hinten an
