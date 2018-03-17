const DEBUG_MODE = false;
const REGISTER_SIZE = 16;
const SLOW_MODE = false;

const MANGLE_UNCHANGED_INPUT = 9000;
var sleep = require('sleep');

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

  debug_line(instr) {

      switch(instr[0]) {
        case 0:
          return "NOOP"
        break;
        case 1:
          return `r${instr[1]} = r${instr[2]} + r${instr[3]}`
        break;
        case 2:
          return `r${instr[1]} = r${instr[2]} - r${instr[3]}`
        break;
        case 3:
          return `r${instr[1]} = r${instr[2]} * r${instr[3]}`
        break;
        case 4:
          return `r${instr[1]} = r${instr[2]} / r${instr[3]}`
        break;
        case 5:
          return `r${instr[1]} = r${instr[2]} ** r${instr[3]}`
        break;
        case 6:
          return `r${instr[1]} = exp(r${instr[2]})`
        break;
        case 7:
          return `r${instr[1]} = Math.log(r${instr[2]})`
        break;
        case 8:
          return `r${instr[1]} = r${instr[2]}**2`
        break;
        case 9:
          return `r#{instr[1]} = Math.sqrt(r#{instr[2]})`
        break;
        case 10:
          return `r#{instr[1]} = Math.sin(r#{instr[2]})`
        break;
        case 11:
          return `r#{instr[1]} = Math.cos(r#{instr[2]})`
        break;
        case 12:
          return `IF (r#{instr[1]} > r#{instr[2]})`
        break;
        case 13:
          return `IF (r#{instr[1]} <= r#{instr[2]})`
        break;
        default:
          console.log(line[0]);
        break;
    }
  }

  debugger(program) {
    return program.map(function(line) {
      debug_line(line)
   });
    
  }

  initialize_registers(registers) {
    this.r = registers;
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

//    console.log("START");

    while (running == true) {
      let instr = this.fetch();

      try {
        this.map[instr[0]].call(instr[1], instr[2], instr[3]);
        if (isNaN(this.r[0]) || this.r.includes(NaN)) {
          // console.log(this.debugger(this.mem));
          return 99999;
        }
        if (SLOW_MODE == true) {
          console.log(this.debug_line(instr));
          console.log(this.r.slice(0,3));
          sleep.msleep(500);
        }

      } catch (e) {
        console.log("Error! NULL!");
        running = false;
        console.log(e);
      }

      if (this.pc >= this.mem.length) {
        running = false;
      }
    }

    return this.r[0];
  }
}

module.exports = [VM];
