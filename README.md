# Effectful

The easy way to handle side effects in [Redux](https://redux.js.org/)

[![build status](https://img.shields.io/travis/artmann/effectful/master.svg?style=flat-square)](https://travis-ci.org/artmann/effectful)
[![npm version](https://img.shields.io/npm/v/effectful.svg?style=flat-square)](https://www.npmjs.com/package/effectful)

```js
yarn add effectful
```

## Usage

Define your side effects as async or regular functions and specify which
actions you want them to be triggered by.

```js
// effects/index.js

const fetchTodos = async (state, dispatch) => {
  const { searchQuery } = state;
  const url = `https://my-api.com/todos?query=${searchQuery}`;

  try {
    const response = await fetch(url);
    const { todos} = await response.json();

    dispatch(fetchTodosSuccess(todos));
  } catch (error) {
    dispatch(fetchTodosFail(error));
  }
};

export default {
  APP_MOUNTED: fetchTodos,
  SEARCH_QUERY_CHANGED: fetchTodos
};
```

Then all you have to do is add the effectful middleware to your store.

```js
// store/index.js

import { createStore, applyMiddleware } from 'redux';
import todos from './reducers';
import effects from './effects';

const store = createStore(
  todos,
  applyMiddleware(applyEffects(effects));
);
```
