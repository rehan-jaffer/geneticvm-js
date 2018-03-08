var VM = require('./vm');

function candidate_generator() {
  return [0,0,0,0];
}

class Simulator {

  constructor(INITIAL_POPULATION_SIZE, CANDIDATE_GENERATOR, FLAGS=[]) {
    this.generation = [];
    for (let x=0;x<INITIAL_POPULATION_SIZE;x++) {
      this.generation.push(candidate_generator.call());
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
            return [c, e.run()[0]];
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
