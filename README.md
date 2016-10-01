# puppyWalk
A social network to find playmates for dogs

This branch is dedicated for hardware related R&D as well as
notes related to electrics and code used to parse raw GPS data
to a usable format to post to a webserver

Hardware used for initial prototyping
- Raspberry Pi 3
- Adafruit GPS Breakout v3
- FTDI to USB (for serial COM)
- UART to USB (for serial COM)

Electrics
NOTE: GPS Breakout takes in a 5v signal. The current must be as clean as possible. During prototype, power GPS separately.
      Initial check of wiring FTDI via USB on Raspberry Pi showed a drop of close to 1/2V. The Pi was powered off of a UART
      serial adapter wired to a laptop. With such a low drop from just the connection, the GPS breakout may risk damage and/or
      inaccurate data if dependent on one power supply.
