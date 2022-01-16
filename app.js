const cluster = require('cluster');
const { cpus } = require('os');
const process = require('process');
const Wallet = require('ethereumjs-wallet');

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

const numCPUs = cpus().length;

if (cluster.isMaster) {
    console.log(`Primary ${process.pid} is running`);

    // Fork one worker per CPU
    for (let i = 0; i < numCPUs; i++) {
	cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
	console.log(`worker ${worker.process.pid} died - restarting`);
	cluster.fork();

    });
}
else {
    console.log(`Worker ${process.pid} started`);

    let counter = 0;

    while (1) {
	counter++;
	const wallet = Wallet.default.generate();
	for (let r=0; r<regexps.length; r++) {
	    if (wallet.getAddressString().match(regexps[r])) {
		const o = {address: wallet.getChecksumAddressString(),
			   privateKey: wallet.getPrivateKeyString(),
			   process: process.pid,
			   counter: counter};
		console.log(o);

	    }

	}

	if (counter % 10000 == 0) {
	    const used = process.memoryUsage();
	    if (used.rss / 1024 / 1024 > 1024)
		process.exit();
	}

    }

}
