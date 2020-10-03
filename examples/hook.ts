import Triggerest from '../src/triggerest';

interface User {
  id: number;
  fullname: string;
}

let array: User[] = [
  {
    id: 1,
    fullname: 'Oktay Şenkan',
  },
];

const getMockArray = () =>
  new Promise<User[]>((resolve) => {
    setTimeout(() => {
      resolve(array);
    }, 1000);
  });

const mutateArray = () => {
  array = array.filter((item) => item.id !== 1);

  array.push({
    id: 99,
    fullname: 'Test Test',
  });
};

setTimeout(mutateArray, 5000);

const triggerest = new Triggerest(getMockArray, 2000);

triggerest.on('changed', (addedItems: any[], removedItems: any[]) => {
  console.log('items changed');
});

triggerest.on('added', (items) => {
  console.log('added', items);
});

triggerest.on('removed', (items) => {
  console.log('removed', items);
});
