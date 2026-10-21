import json, random
from fractions import Fraction

def hu(num, den):
    return Fraction((2*num + den) - ((2*num + den) % (2*den)), 2*den)

def dec(v, places=2):
    if v < 0: return "-" + dec(-v, places)
    base = 10**places
    n = v.numerator // v.denominator
    s = str(n // base); f = str(n % base).zfill(places).rstrip("0")
    return s + "." + f if f else s

def s100(n):
    w, f = divmod(n, 100)
    return f"{w}.{f:02d}".rstrip("0").rstrip(".")

def switch(q, i):
    ns = hu(1000*q, i)
    return f"A {q} nC gate driven at {i} mA switches in {ns} ns."
def gate(v, r):
    ma = hu(100000*v, r)
    return f"A {dec(Fraction(v))} V driver through {dec(Fraction(r))} Ω peaks at {dec(ma)} mA of gate current."
def conduction(i, r):
    w = hu(i*i*r, 10000000)
    return f"{dec(Fraction(i))} A through {dec(Fraction(r))} mΩ works out to {dec(w)} W of conduction loss."

random.seed(729)
cases = [
  dict(fn="switch", args=["40","20"], expect=switch(40,20)),
  dict(fn="gate", args=["10","22"], expect=gate(1000,2200)),
  dict(fn="conduction", args=["10","4"], expect=conduction(1000,400)),
]
for _ in range(30):
    q = random.randint(1,10000); i = random.randint(1,10000)
    cases.append(dict(fn="switch", args=[str(q),str(i)], expect=switch(q,i)))
    v = random.randint(1,10000); r = random.randint(1,1000000)
    cases.append(dict(fn="gate", args=[s100(v),s100(r)], expect=gate(v,r)))
    a = random.randint(1,10000); m = random.randint(1,10000000)
    cases.append(dict(fn="conduction", args=[s100(a),s100(m)], expect=conduction(a,m)))
errcases = [
  ("switch", ["0","20"]), ("switch", ["10001","20"]), ("switch", ["40","0"]), ("switch", ["1.5","20"]),
  ("gate", ["0","22"]), ("gate", ["10","0"]), ("gate", ["101","22"]), ("gate", ["10","10000.001"]),
  ("conduction", ["0","4"]), ("conduction", ["10","0"]), ("conduction", ["100.001","4"]), ("conduction", ["10","100000.001"]),
]
json.dump({"cases": cases, "errors": errcases}, open("expected.json","w"), ensure_ascii=False, indent=1)
open("expected.json","a").write("\n")
print("expected.json written:", len(cases), "cases")
