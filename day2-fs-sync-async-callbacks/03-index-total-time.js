const timeoutAPeriod = Math.ceil(Math.random() * 10) * 1000;
const timeoutBPeriod = Math.ceil(Math.random() * 10) * 1000;

console.log("timeoutAPeriod:", timeoutAPeriod);
console.log("timeoutBPeriod:", timeoutBPeriod);

setTimeout(function timeoutCallback() {
  console.log("fertig timeout A");
}, timeoutAPeriod);

setTimeout(function timeoutCallback() {
  console.log("fertig timeout B");
}, timeoutBPeriod);

// total time => der längere timeout, weil start ist praktisch gleichzeitig
