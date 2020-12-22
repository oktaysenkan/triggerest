import { EventEmitter } from 'eventemitter3';
import * as _ from 'lodash';

import EventMap from './interfaces/event-map';

class Triggerest<T = any> extends EventEmitter<EventMap<T>> {
  readonly func: () => Promise<T[]>;

  readonly identifier: string;

  readonly timeout: number;

  lastValue: T[] = [];

  currentValue: T[] = [];

  processCount = 0;

  successfulProcessCount = 0;

  /**
   * Returns a new Triggerest instance
   * @param func Function who returns array
   * @param timeout Function call delay
   */
  constructor(
    func: () => Promise<T[]>,
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
    try {
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

      const isFirstTime = this.successfulProcessCount === 0;
      const isAnyItemAdded = Boolean(addedItems.length);
      const isAnyItemRemoved = Boolean(removedItems.length);

      if (!isFirstTime) {
        if (isAnyItemAdded || isAnyItemRemoved) {
          this.emit('changed', addedItems, removedItems, result);
        }

        if (isAnyItemAdded) {
          this.emit('added', addedItems, result);
        }

        if (isAnyItemRemoved) {
          this.emit('removed', removedItems, result);
        }
      }

      this.lastValue = this.currentValue;
      this.successfulProcessCount++;
    } catch (error) {
      this.emit('error', error);
    } finally {
      this.processCount++;
    }
  }
}

export default Triggerest;
