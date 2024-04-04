const person1 = {
  name: "Beate",
  alter: 36,
  emails: ["beate@gmail.com", "b.huber@company.com"],
  memberSince: Date.now(),
};

const person2 = {
  name: "Adrian",
  alter: 31,
  emails: ["adrian@gmail.com"],
  memberSince: Date.now(),
};

// export
// module.exports = { beate: person1, adrian: person2 };
// gleich wie:
exports.beate = person1;
exports.adrian = person2;
