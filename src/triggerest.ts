import { EventEmitter2 } from 'eventemitter2';
import * as _ from 'lodash';

class Triggerrest extends EventEmitter2 {
  lastValue: any[] = [];

  currentValue: any[] = [];

  readonly func: () => Promise<any[]>;

  /**
   * Returns a new Triggerest instance
   * @param func Function who returns array
   * @param timeout Function call delay
   */
  constructor(func: () => Promise<any[]>, timeout = 60 * 1000) {
    super();

    this.func = func;

    setInterval(() => {
      this.calculateDifference();
    }, timeout);
  }

  private async calculateDifference() {
    const result = await this.func();

    this.currentValue = result;

    this.emit('result', result);

    const addedItems = _.difference(this.currentValue, this.lastValue);
    const removedItems = _.difference(this.lastValue, this.currentValue);

    const isAnyItemAdded = Boolean(addedItems.length);
    const isAnyItemRemoved = Boolean(removedItems.length);

    if (isAnyItemAdded || isAnyItemRemoved) {
      this.emit('changed', addedItems, removedItems, result);
    }

    if (isAnyItemAdded) {
      this.emit('added', addedItems, result);
    }

    if (isAnyItemRemoved) {
      this.emit('removed', removedItems, result);
    }

    this.lastValue = this.currentValue;
  }
}

export default Triggerrest;
