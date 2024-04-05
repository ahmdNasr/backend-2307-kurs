const person = {
  name: "Beate",
  alter: 39,
  emails: ["beate@gmail.com", "b.huber@aon.at"],
};

console.log(person.emails[0]);

person.emails[0] = "beate.privat@gmail.com";

// option 1: beate@gmail.com                ....
// option 2: beate.privat@gmail.com

////////
// Was passierty hier ??
// von OBEN nach UNTEN --> Synchrone Code Execution/Ausführung

// Gegenstück zu Synchrone Code Ausführung -> Asynchrone Code Execution
