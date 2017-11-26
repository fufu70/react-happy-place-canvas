# react-happy-place-canvas

![Gif of what it looks like](assets/canvas.gif)

A canvas showing friends strewn equally along a circle that either attract or repel each other drawing themselves and their connections while getting closer to a happy place.

The method for showing flocking personalities through friends and non-friends was created by [Jared Tarbell](http://www.complexification.net/programmer.html) on his [complexification site](http://www.complexification.net/gallery/machines/happyPlace/index.php)

## Installation

This is a [ReactJS](https://reactjs.org/) component available through the
[npm registry](https://www.npmjs.com/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install react-happy-place-canvas
```

## How to Use

To simply add the happy place canvas on to the page import it and include it into the container. The styling must be manually applied through your CSS environment, there is no styling added on to the page from the `react-happy-place-canvas`.

```javascript
import React from 'react';
import HappyPlaceCanvas from 'react-happy-place-canvas';

const App = () => {
  return (
    <HappyPlaceCanvas />
  );
};

export default App;
```

#### Color

The root color of the friends and their 

```javascript
const App = () => {
  ...
  return (
    <HappyPlaceCanvas
      color="#e58017" />
  );
  ...
};
```

#### Friend Count

How many friends will be be on the canvas, the more friends the more processing your fan will run.

```javascript
const App = () => {
  ...
  return (
    <HappyPlaceCanvas
      friendCount={70} />
  );
  ...
};
```
