import { EventEmitter2 } from 'eventemitter2';
import * as _ from 'lodash';

class Triggerrest extends EventEmitter2 {
  readonly func: () => Promise<any[]>;

  readonly identifier: string;

  readonly timeout: number;

  lastValue: any[] = [];

  currentValue: any[] = [];

  processCount = 0;

  /**
   * Returns a new Triggerest instance
   * @param func Function who returns array
   * @param timeout Function call delay
   */
  constructor(
    func: () => Promise<any[]>,
    identifier: string,
    timeout = 60 * 1000
  ) {
    super();

    this.func = func;
    this.identifier = identifier;
    this.timeout = timeout;

    setInterval(() => {
      this.calculateDifference();
    }, timeout);
  }

  private async calculateDifference() {
    const result = await this.func();

    this.currentValue = result;

    this.emit('result', result);

    const addedItems = _.differenceBy(
      this.currentValue,
      this.lastValue,
      this.identifier
    );

    const removedItems = _.differenceBy(
      this.lastValue,
      this.currentValue,
      this.identifier
    );

    const isFirstTime = this.processCount === 0;
    const isAnyItemAdded = Boolean(addedItems.length);
    const isAnyItemRemoved = Boolean(removedItems.length);

    if ((isAnyItemAdded || isAnyItemRemoved) && !isFirstTime) {
      this.emit('changed', addedItems, removedItems, result);
    }

    if (isAnyItemAdded && !isFirstTime) {
      this.emit('added', addedItems, result);
    }

    if (isAnyItemRemoved && !isFirstTime) {
      this.emit('removed', removedItems, result);
    }

    this.lastValue = this.currentValue;

    this.processCount++;
  }
}

export default Triggerrest;
