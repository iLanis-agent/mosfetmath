// MOSFET Math engine: gate-charge switching time, gate-resistor peak current, and conduction loss. Exact integers (nC, mA, hundredths of a V, ohms, hundredths of an A, hundredths of a mΩ), half-up on display only.
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _pi(t, err, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!/^[0-9]{1,7}$/.test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _Q = "the gate charge must be a whole number from 1 to 10000 nC";
var _MA = "the drive current must be a whole number from 1 to 10000 mA";
var _V = "the drive voltage must be from 0.01 to 100 V with at most two decimal places";
var _R = "the gate resistance must be from 0.01 to 10000 Ω with at most two decimal places";
var _A = "the drain current must be from 0.01 to 100 A with at most two decimal places";
var _M = "the on-resistance must be from 0.01 to 100000 mΩ with at most two decimal places";
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }
function _dec(v, places) {
  if (v < 0) return "-" + _dec(-v, places);
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}

function switchTruth(q, i) {
  var qc = _pi(q, _Q, 1, 10000), ma = _pi(i, _MA, 1, 10000);
  var ns = _hu(1000 * qc, ma);
  return "A " + qc + " nC gate driven at " + ma + " mA switches in " + ns + " ns.";
}
function gateTruth(v, r) {
  var vv = _p(v, _V, 3, 2, 1, 10000), rr = _p(r, _R, 5, 2, 1, 1000000);
  var ma = _hu(100000 * vv, rr);
  return "A " + _dec(vv, 2) + " V driver through " + _dec(rr, 2) + " Ω peaks at " + _dec(ma, 2) + " mA of gate current.";
}
function conductionTruth(i, r) {
  var ia = _p(i, _A, 3, 2, 1, 10000), rm = _p(r, _M, 6, 2, 1, 10000000);
  var w = _hu(ia * ia * rm, 10000000);
  return _dec(ia, 2) + " A through " + _dec(rm, 2) + " mΩ works out to " + _dec(w, 2) + " W of conduction loss.";
}
