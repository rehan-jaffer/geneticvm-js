const DEBUG_MODE = false;
const REGISTER_SIZE = 2;

const MANGLE_UNCHANGED_INPUT = 9000;

const operations = [
  function(op, r1, r2, r3) {
    return 0;
  },
  function(op, r1, r3, r3) {
    return (this.r[r1] = this.r[r2] + this.r[r3]);
  },
  function(op, r1, r3, r3) {
    return (this.r[r1] = this.r[r2] - this.r[r3]);
  },
  function(op, r1, r3, r3) {
    return (this.r[r1] = this.r[r2] * this.r[r3]);
  },
  function(op, r1, r3, r3) {
    return (this.r[r1] = this.r[r2] / this.r[r3]);
  },
  function(op, r1, r3, r3) {
    return (this.r[r1] = this.r[r2] ** this.r[r3]);
  },
  function(op, r1, r3, r3) {
    return (this.r[r1] = Math.exp(this.r[r2]));
  },
  function(op, r1, r3, r3) {
    return (this.r[r1] = Math.log(this.r[r2]));
  },
  function(op, r1, r3, r3) {
    return (this.r[r1] = Math.sqrt(this.r[r2]));
  },
  function(op, r1, r3, r3) {
    return (this.r[r1] = Math.sin(this.r[r2]));
  },
  function(op, r1, r3, r3) {
    return (this.r[r1] = Math.cos(this.r[r2]));
  }
];

class VM {
  constructor(registers = [], flags = []) {
    this.pc = 0;
    this.set_flags(flags);
    this.initialize_registers(registers);
  }

  initialize_registers(registers) {
    this.registers = registers;
  }

  load(code) {
    this.mem = code;
  }

  enable_debug() {
    this.debug = true;
  }

  set_flags(flags) {
    this.flags = flags;
  }

  enabled(flag) {
    return this.flags.includes(flag);
  }

  fetch() {
    return this.mem[this.pc];
  }

  exec() {

    let running = false;

    while (running == true) {

      let op = this.fetch;

      try {
        operations[op[0]].call();
      } catch (e) {
        console.log("Error! NULL!");
        running = false;
      }

      if (this.pc >= this.mem.size) {
        running = false;
      }

    }

    return this.registers;

  }
}

module.exports = [VM];
