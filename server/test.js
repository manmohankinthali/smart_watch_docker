const Rawdate = new Date("2023-11-14T05:20:00.000Z");
const shortMonth = Rawdate.toLocaleString("en-US", { month: "short" });
console.log(shortMonth);
