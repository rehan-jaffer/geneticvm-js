var sim = require('./simulator');
var v = require('./vm');

const INITIAL_POPULATION = 100;
const GENERATIONS = 1000;

simulator = new sim[0](INITIAL_POPULATION)
simulator.fitness = (x) => { return (x**2)+4; };
simulator.start(GENERATIONS);
