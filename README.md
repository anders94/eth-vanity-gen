eth-vanity-gen
==============
A vanity generator for Ethereum addresses.

This tool creates random wallets and checks to see if the generated address
matches a list of regular expressions.

Usage
-----
Edit `app.js` and replace the list of regular expressions with the set you
care about. Here's the list that is shipped with the project:

```
const regexps = [
    /0xdef1/,   // DeFi
    /0xcafe/,   // Cafe
    /0xba5e/,   // Base
    /0xca5e/,   // Case
    /0xc0de/,   // Code
    /0xb1ade/,  // Blade
    /0xdecaf/,  // Decaf
    /0xba51c/,  // Basic
    /0xfa15e/,  // False
    /0x5ca1e/,  // Scale
];
```
The regular expressions are implemented *ignoring case* so keep that in mind.

Next, run the application:
```
node app
```

Matching addresses with their corrosponding private key will be printed so you might
want to catch them with: `node app >> output.txt`

Thinking
--------
Ethereum addresses start with `0x` and then contain a string of characters pulled
from this set: `0123456789abcdef`. Both upper and lower case letters are possible
although the case can not be changed without sacrificing the CRC check they add.

Aside from the list of letters, one could plausibly substitute 0 for O and 1 for l,
etc. If you expand that a bit:
```
I = 1
l = 1
O = 0
S = 5
```

And then there are those that are a bit of a stretch such as `Q = 0` and `Z = 2`
but let's ignore those.

If we assume that, then here's a list of some words which fit the constraint:
```
fiasco
fiscal
failed
fields
adobes
bailed
biased
blades
boiled
bodies
closed
decals
doable
docile
scaled
sliced
social
solace
ideals
decaf
cafes
fable
faces
focal
basic
cable
fades
field
folds
abide
based
code
dice
disco
false
leaf
loaf
boil
close
scale
aside
deal
dial
idea
idol
file
self
case
```

Lastly, I should note that you do have the `0x` at the beginning which allows you
one `x` if it follows a `0` or `O` so maybe `ox` or something? I'll leave it to
you to explore.
