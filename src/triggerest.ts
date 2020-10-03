import { EventEmitter2 } from 'eventemitter2';

class Triggerrest extends EventEmitter2 {
  lastValue: any[] = [];

  currentValue: any[] = [];

  func: () => Promise<any[]>;

  constructor(func: () => Promise<any[]>, timeout = 60 * 1000) {
    super();

    this.func = func;

    setInterval(() => {
      this.makeRequest();
    }, timeout);
  }

  async makeRequest() {
    const result = await this.func();

    this.currentValue = result;

    this.emit('result', result);

    this.lastValue = this.currentValue;
  }
}

export default Triggerrest;
