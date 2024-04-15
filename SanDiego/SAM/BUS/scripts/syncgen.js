const fs = require('node:fs');

let stops = "BASEPATH: https://github.com/catenarytransit/announcements/raw/main/SanDiego/SAM/BUS/\n\nSYNC:\n";

const allstops = fs.readFileSync('stops.txt');

for (const line of allstops.toString().split('\n')) {
    let stopid = line.split(',')[0]

    // stopid must contain only numbers AND not start with 7
    if (stopid.match(/^[0-9]+$/) && !stopid.startsWith('7')) {
        let stopname = line.split(',')[2].toUpperCase()
        console.log(stopname)
        let roadnames = stopname.split('&')
        if (roadnames.length == 1) {
            stops += `  ${stopid}:\n`;
            stops += `      - $BUS-NEXTSTOP-SINGLE[${roadnames[0].trim()}.wav]\n`;
        } else {
            stops += `  ${stopid}:\n`;
            stops += `      - $BUS-NEXTSTOP[${roadnames[0].trim().replace('(', '').replace(')', '')}.wav,${roadnames[1].trim().replace('(', '').replace(')', '')}.wav]\n`;
        }
    }
}

console.log(stops)

fs.writeFileSync('bus.cas', stops);