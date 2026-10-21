# MOSFET Math

MOSFET gate and loss arithmetic. A 40 nC gate driven at 20 mA switches in 2000 ns.

## What it computes

- **The switching truth** - the gate-charge switching time from the total gate charge (1 to 10000 nC) and the drive current (1 to 10000 mA), from charge is current times time.
- **The resistor truth** - the peak gate current from the driver voltage (0.01 to 100 V) and the total gate resistance (0.01 to 10000 Ω).
- **The conduction truth** - the on-state loss from the drain current (0.01 to 100 A) squared times the on-resistance (0.01 to 100000 mΩ).

## Boundary

Arithmetic only, from the chart relationships charge is current times time, voltage is current times resistance, and power is current squared times resistance. Every MOSFET treated as an ideal switch. It has not seen any circuit and does not know the Miller plateau, the gate ringing, the temperature or the part variant, and it gives no verdict that a switching circuit is adequate or safe. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror (Fractions) that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/mosfetmath/
Repo: https://github.com/iLanis-agent/mosfetmath
