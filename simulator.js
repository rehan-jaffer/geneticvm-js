var VM = require('./vm');

const OPS_NUM = 8;
const REG_NUM = 15;
const MAX_CANDIDATE_SIZE = 10;

function random_from(start, end) {
  return Math.round((Math.random() * end) - start);
}

function candidate_generator(len) {

    let genome = [];
    for (let x=0;x<len;x++) {
      genome.push([random_from(0,OPS_NUM), random_from(0,REG_NUM), random_from(0, REG_NUM), random_from(0,REG_NUM)]);
    }
    return genome;

}

class Simulator {

  constructor(INITIAL_POPULATION_SIZE, CANDIDATE_GENERATOR, FLAGS=[]) {
    this.generation = [];
    for (let x=0;x<INITIAL_POPULATION_SIZE;x++) {
      this.generation.push(candidate_generator(random_from(1,MAX_CANDIDATE_SIZE)));
    }
  }

  set(flag,value) {
    this.settings[flag] = value;
  }

  fitness(f, input_range=[]) {
    this.inputs = input_range;
    this.outputs = this.inputs.map((x) => f.call(x));
  }

  generation_debug() {

  }
  start(generations) {
    let self = this;
    for(let x=0;x<generations;x++) {
      this.generation.map(
          function(c) { 
            let e = new Evaluation(c, self.inputs, self.outputs);
            let z = e.run();
            return [c, z[0]];
      })
    }
  }
}

class Evaluation {
  constructor(program=[], inputs=[], outputs=[]) {
    this.program = program;
    this.inputs = inputs;
    this.outputs = outputs;
  }
  run() {
       let self = this;
       return this.inputs.map(
            function(input, n) { 
              let vm = new VM[0];
              vm.load(self.program);
              let r = vm.exec();
              let r0 = r[0];
              Math.abs(self.outputs[n] - r0)
        }).reduce((i, acc) => acc + i, 0);
  }
}

module.exports = [Simulator, Evaluation];
