# triggerest

<p>
  <img alt="Version" src="https://img.shields.io/github/package-json/v/oktaysenkan/triggerest?color=black" />
  <a href="https://github.com/oktaysenkan/triggerest/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-MIT-black.svg" />
  </a>
  <a href="https://sonarcloud.io/dashboard?id=oktaysenkan_triggerest" target="_blank">
    <img alt="License: ISC" src="https://sonarcloud.io/api/project_badges/measure?project=oktaysenkan_triggerest&metric=alert_status" />
  </a>
</p>

## Install

```sh
npm install triggerest
```

## Usage

You can check [examples](https://github.com/oktaysenkan/triggerest/tree/master/examples)

```ts
const getTodos = async () => {
  const { data: todos } = await axios.get(
    'https://jsonplaceholder.typicode.com/todos'
  );

  return todos;
};

const triggerest = new Triggerest(getTodos);

triggerest.on('result', (items) => {
  console.log('result received');
});

triggerest.on('changed', (addedItems: any[], removedItems: any[]) => {
  console.log('items changed');
});

triggerest.on('added', (items) => {
  console.log('added', items);
});

triggerest.on('removed', (items) => {
  console.log('removed', items);
});
```

## License

[MIT](https://github.com/oktaysenkan/triggerest/blob/master/LICENSE)
