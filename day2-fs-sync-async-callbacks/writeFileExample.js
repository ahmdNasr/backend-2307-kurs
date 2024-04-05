const fs = require("fs");

const text = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.`;

fs.writeFile("./textOutput", text, (err) => {
  if (err) return console.log(err);
  console.log("done writing file");
});

// fs.writeFile("./textOutput", text, (err) => {
//     if (err) console.log(err);
//     else console.log("done writing file");
//   });

// fs.writeFile("./textOutput", text, (err) => {
//   if (!err) console.log("done writing file");
//   else console.log(err);
// });
