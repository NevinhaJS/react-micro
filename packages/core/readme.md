# React Micro

Speed up the your micro-frontend development. Configure less and delivery more. You don't need to waste more time trying to change your application to support multiple micro-frontends or use iframe becase of old bundler version.

## Why

**Reason One**
Webpack federation module and other bundlers requires newest version of their library (webpack 5+) and makes your application bounded to their architecture, which makes harder the migration to other module bundles.

**Reason Two**
If your project uses old bundler version like <= webpack4, you might not be able to use a decent configuration to run a micro-frontend in the client side without spending some time changing the architecture of your **container** and **host**.

**Reason Three**
If you don't want to spend too much time chaing the architecture of your container and host, you might decide to go with `iframe` which is not good for the following reasons:

- Cookies does not work well.
- Browser history, routing and deep linking are complicated to integrate.
- It makes responsive design a bit tuff for some cases.
- You will not be able to provide any input/function as parameter in the initial render of the micro-frontend.
- Not elegant for developers (developer friendly).

## How to use?

**Configuring your container**
It's pretty straight forward, you just need to call the `Micro` component in your container, which is in most of the case the root application:

```js
import { Micro } from "react-micro-js";

<Micro
    name="MicroCar"
    manifestSRC="manifest.json"
    host="http://localhost:4000"
    dependencies={[...]}
/>
```

where:
- _**name**_ is the name of your micro frontend. Keep this name in mind, because this should be the same that you will use in the `connect` function later.
- _**manifestSRC**_ the destination to your manifest file. In this case the manifest file is found at `http://localhost:4000/manifest.json`
- _**host**_ the endpoint where your micro-frontend is deployed.
- _**dependencies**_ the dependency array which you want to inject in your micro-frontend when it is going to be mounted. Usually used for _browser history_, _event emitters_ and _shared capabilities_.

The **manifest** is json file which has a `files` entry on it. If you use create-react-app it will be something like:

<img src="./docs/manifest-example.png">

**Configuring your host**
There's one last step, which is to configure your micro-frontend, some times called as _host_.

In the entry point of your application, most of the time `index.js`, you need to move your ReactDOM render logic to be inside a function, like this example bellow:

```js
const mountFn = (connect) => (containerId, dependencies) => {
  const root = ReactDOM.createRoot(document.getElementById(containerId));

  root.render(<App />);

  connect(root);
};
```

Please notice we're calling a `connect` function which will come as parameter from the `connector` later. Also notice this 2 parameters provided in the curried function: `containerId` and `dependencies`, where:

- _**containerId**_ is the id of your micro-frontend container, which will be `[YOUR_MICRO_FRONTEND_NAME]-container`
- _**dependencies**_ dependency array provided from the parent container.

Then, you just need to provide your `mountFn` to react-micro-js `connector` and that is it:

```js
import { connector } from "react-micro-js";

const host = connector(mountFn, {
  devRoot: "root",
  name: "MicroCar",
});
```

Where:

- _**name**_ is the micro-frontend name. This property should be the same name that you have provided in the `<Micro />` component which you used inside your container. 
- _**devRoot**_ is the id of the html element that the micro-frontend should be attached in case it is running isolated, without the container. Eg: suppose your application is running at `localhost:3000` but your micro-frontend is running at `localhost:4000` and you are accessing `localhost:4000` directly, the connector function will know that there isn't any container to attach your micro-frontend, so it will try to find the html tag with the `id === devRoot` property.

### Found an issue, need help or want a feature request?
We're more than happy to fix bugs, create features or help you anything, you just need to create an issue [here](https://github.com/NevinhaJS/react-micro-js/issues/new).

### What is next?

- Create unit tests ASAP.
- Create dispatch function, to make easer cross communication between hosts and containers.
- Create CONTRIBUTTING.md