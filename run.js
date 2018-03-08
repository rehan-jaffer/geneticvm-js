var sim = require('./simulator');
var VM = require('./vm');

const INITIAL_POPULATION = 100;
const GENERATIONS = 1000;

simulator = new sim[0](INITIAL_POPULATION)
simulator.fitness((x) => { return (x**2)+4; }, [0,1,2,3,4], [4, 5, 9, 20]);
simulator.start(GENERATIONS);
