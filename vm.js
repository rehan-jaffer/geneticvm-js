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

  debug(program) {
    program.map(function(line) {
      switch(line[0]) {
        case 0:
          "NOOP"
        break;
        case 1:
          "r#{ine[1]} = r#{line[2]} + r#{line[3]}"
        break;
        case 2:
          "r#{line[1]} = r#{line[2]} - r#{line[3]}"
        break;
        case 4:
          "r#{line[1]} = r#{line[2]} * r#{line[3]}"
        break;
        case 5:
          "r#{line[1]} = r#{line[2]} / r#{line[3]}"
        break;
        case 6:
          "r#{line[1]} = r#{line[2]} ** r#{line[3]}"
        break;
        case 7:
          "r#{line[1]} = exp(r#{line[2]})"
        break;
        case 8:
          "r#{line[1]} = Math.log(r#{line[2]})"
        break;
        case 9:
          "r#{line[1]} = r#{line[2]}**2"
        break;
        case 10:
          "r#{line[1]} = Math.sqrt(r#{line[2]})"
        break;
        case 11:
          "r#{line[1]} = Math.sin(r#{line[2]})"
        break;
        case 12:
          "r#{line[1]} = Math.cos(r#{line[2]})"
        break;
        case 13:
          "IF (r#{line[1]} > r#{line[2]})"
        break;
        case 14:
          "IF (r#{line[1]} <= r#{line[2]})"
        break;
    }

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

    while (running == true) {
      let instr = this.fetch();

      try {
        this.map[instr[0]].call(instr[1], instr[2], instr[3]);
      } catch (e) {
        console.log("Error! NULL!");
        running = false;
        console.log(this.mem);
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
