var VM = require('./vm');

const OPS_NUM = 10;
const REG_NUM = 14;
const MAX_CANDIDATE_SIZE = 3;

function random_from(start, end) {
  return Math.round((Math.random() * end) + start);
}

function breed(candidate1, candidate2) {

  let c1_len = candidate1.size;  
  let c2_len = candidate2.size;  

  let cutpoint1 = random_from(0,c1_len/2);
  let cutpoint2 = random_from(cutpoint1, c1_len);

  let cutpoint3 = random_from(0, c2_len/2);
  let cutpoint4 = random_from(cutpoint3, c2_len);

  let segment = candidate2.slice(cutpoint3, cutpoint4);
  let child = candidate1.slice(0,cutpoint1).concat(segment).concat(candidate1.slice(cutpoint2, c2_len));

  return child;

}

function mutate(candidate) {

  for(let x=0;x<candidate.length;x++) {
    if (Math.round(Math.random()*10) == 2) {
      let field = Math.round(Math.random()*4);
      if (field == 0) {
        candidate[x][field] += Math.round(Math.random()*4)-2;
        candidate[x][field] = Math.abs(candidate[x][field]) % OPS_NUM;
      } else {
        candidate[x][field] += Math.round(Math.random()*4)-2;
        candidate[x][field] = Math.abs(candidate[x][field]) % REG_NUM;
      }
    }
  }
  return candidate;
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
    this.outputs = this.inputs.map((x) => f(x));
  }

  generation_debug() {

  }
  start(generations) {

    let self = this;

    for(let g=0;g<generations;g++) {

      let evaluated = this.generation.map(
          function(c) { 
            let e = new Evaluation(c, self.inputs, self.outputs);
            return [c, e.run()];
      }).filter((x) => !isNaN(x[1]));

      let best = evaluated.sort((x,y) => x[1]-y[1]).slice(0,100);

      if (best[1] == 0) {
        exit; /* abort script if best score is zero */
      }

      let next = best.map((x) => x[0]);
      let scores = best.map((x) => x[1]);
      let avg = scores.reduce(((acc,x) => acc+x), 0)/scores.length;
      let avg_size = next.reduce((acc, x) => acc+x.length, 0)/next.length;
      console.log(g + "##: Average Score: " + avg + " Average Size: " + avg_size);
      let children = [];

      for(let x=0;x<next.length-1;x++) {
        children.push(breed(next[x],next[x+1]));
      }

      for (let x=0;x<10;x++) {
        next.push(candidate_generator(random_from(10,100)));
      }
      this.generation = next.concat(children).map((x) => mutate(x));
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
              let vm = new VM[0]([input]);
              vm.load(self.program);
              let r = vm.exec();
              let r0 = r[0];
              if (isNaN(r0)) {
                r0 = 999;
              }
              return Math.abs(self.outputs[n] - r0)
        }).reduce((i, acc) => acc + i, 0);
  }
}

module.exports = [Simulator, Evaluation];
