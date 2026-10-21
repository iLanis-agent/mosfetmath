const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { switch: switchTruth, gate: gateTruth, conduction: conductionTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the gate charge must be a whole number from 1 to 10000 nC",
  "the drive current must be a whole number from 1 to 10000 mA",
  "the drive voltage must be from 0.01 to 100 V with at most two decimal places",
  "the gate resistance must be from 0.01 to 10000 Ω with at most two decimal places",
  "the drain current must be from 0.01 to 100 A with at most two decimal places",
  "the on-resistance must be from 0.01 to 100000 mΩ with at most two decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
