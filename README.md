# Picache

A React Native component that will automatically cache images.

This is a fork of the benawad package : https://github.com/benawad/Picache

### Warning

This project works thanks to the [expo](https://expo.io/) project, do not use it in a bare react native project.

### SDK constraints

For expo project where the SDK version is <= 32 use benawad package otherwise you can use this one.

## Usage

```bash
yarn add picache2
```

Use Picache the same way you would use an `<Image />` component.

```js
import Picache from "picache2";

const App = () => (
  <Picache
    style={{ height: 200, width: 200 }}
    source={{ uri: "http://via.placeholder.com/200x200" }}
  />
);
```

```js
import Picache from "picache2";

const App = () => (
  <Picache
    style={{ height: 150, width: 350 }}
    source={require("./square.png")}
  />
);
```

```js
import Picache from "picache2";

const App = () => (
  <Picache
    style={{ height: 50, width: 50 }}
    source={[
      {
        uri: "http://via.placeholder.com/25x25",
        height: 25,
        width: 25
      },
      {
        uri: "http://via.placeholder.com/50x50",
        height: 50,
        width: 50
      }
    ]}
  />
);
```
