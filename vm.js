const DEBUG_MODE = false;
const REGISTER_SIZE = 16;

const MANGLE_UNCHANGED_INPUT = 9000;

class VM {
  constructor(registers = [], flags = []) {
    this.pc = 0;
    this.set_flags(flags);
    this.initialize_registers(registers);
    this.map = [
      (r1, r2, r3) => {
        return 0;
      },
      (r1, r2, r3) => {
        return (this.r[r1] = this.r[r2] + this.r[r3]);
      },
      (r1, r2, r3) => {
        return (this.r[r1] = this.r[r2] - this.r[r3]);
      },
      (r1, r2, r3) => {
        return (this.r[r1] = this.r[r2] * this.r[r3]);
      },
      (r1, r2, r3) => {
        return (this.r[r1] = this.r[r2] / this.r[r3]);
      },
      (r1, r2, r3) => {
        return (this.r[r1] = this.r[r2] ** this.r[r3]);
      },
      (r1, r2, r3) => {
        return (this.r[r1] = Math.exp(this.r[r2]));
      },
      (r1, r2, r3) => {
        return (this.r[r1] = Math.log(this.r[r2]));
      },
      (r1, r2, r3) => {
        return (this.r[r1] = Math.sqrt(this.r[r2]));
      },
      (r1, r2, r3) => {
        return (this.r[r1] = Math.sin(this.r[r2]));
      },
      (r1, r2, r3) => {
        return (this.r[r1] = Math.cos(this.r[r2]));
      }
    ];
  }

  initialize_registers(registers) {
    this.r = [];
    this.r.concat(registers);
    for (let x = 0; x < REGISTER_SIZE - registers.length; x++) {
      this.r.push(Math.round(Math.random()*32));
    }
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
    return this.mem[this.pc++];
  }

  exec() {
    let running = true;

    while (running == true) {
      let instr = this.fetch();

      try {
        this.map[instr[0]].call(instr[1], instr[2], instr[3]);
      } catch (e) {
        console.log("Error! NULL!");
        running = false;
        console.log(e);
      }

      if (this.pc >= this.mem.length) {
        running = false;
      }
    }

    console.log(this.r[0]);
    return this.r;
  }
}

module.exports = [VM];
