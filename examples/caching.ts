import * as express from 'express';
import * as faker from 'faker';

import Triggerest from '../src/triggerest';

const app = express();

let lastResult: any[] = [];

interface User {
  id: number;
  fullname: string;
}

const array: User[] = [];
let id = 1;

const getMockArray = () =>
  new Promise<User[]>((resolve) => {
    setTimeout(() => {
      array.push({
        id: id++,
        fullname: `${faker.name.firstName()} ${faker.name.lastName()}`,
      });

      resolve(array);
    }, 1000);
  });

const triggerest = new Triggerest(getMockArray, 5000);

triggerest.on('result', (items) => {
  lastResult = items;
});

app.get('/', async (req, res) => {
  res.json(lastResult);
});

app.listen(3000);
