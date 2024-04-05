// import fs from "fs";
const fs = require("fs");

// const data = fs.readFileSync("./hallo.txt");
// console.log(data);

// fs.readFile("./hallo.txt", (fehler, dataBuffer) => {
//   console.log("err:", fehler);
//   console.log("data:", dataBuffer);
// });

// callback in callback in callback ...
// callback hell
fs.readFile("./hallo.txt", (err, dataHallo) => {
  if (err) {
    // handle error
    console.log(err);
    return;
  }

  // work with data
  console.log(dataHallo.length);

  fs.readFile("./weiterssssss.txt", (err, dataWeiters2) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(dataWeiters2.length);

    fs.readFile("./andereDatei.txt", (err, dataOther) => {
      if (err) {
        // handle error
        console.log(err);
        return;
      }
      console.log(dataOther.length);

      fs.readFile("./weiters.txt", (err, dataWeiters) => {
        if (err) {
          // handle error
          console.log(err);
          return;
        }
        console.log(dataWeiters.length);

        console.log(
          "total bytes:",
          dataHallo.length +
            dataOther.length +
            dataWeiters.length +
            dataWeiters2.length
        );
      });
    });
  });
});
