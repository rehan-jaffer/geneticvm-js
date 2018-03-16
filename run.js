var sim = require('./simulator');
var VM = require('./vm');

const INITIAL_POPULATION = 1000;
const GENERATIONS = 1000;

simulator = new sim[0](INITIAL_POPULATION)
inputs = [5,10,15]
fitness = (x) => (x**2)+(x**3)*4
simulator.fitness(fitness, inputs, inputs.map((x) => fitness(x)));
console.log(simulator.start(GENERATIONS));
