var sim = require('./simulator');
var VM = require('./vm');

const INITIAL_POPULATION = 100;
const GENERATIONS = 1000;

simulator = new sim[0](INITIAL_POPULATION)
inputs = [5,10,15,20]
fitness = (x) => (x**2)
simulator.fitness(fitness, inputs, inputs.map((x) => fitness(x)));
console.log(simulator.start(GENERATIONS));
