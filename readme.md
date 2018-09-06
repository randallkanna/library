# Library

Library smart contract

## Getting Started

### Prerequisites

What you'll need to have installed
* [Node](https://changelog.com/posts/install-node-js-with-homebrew-on-os-x/)
* [NPM](http://blog.teamtreehouse.com/install-node-js-npm-mac)
* Truffle
```
npm install -g truffle
```

Verify Truffle installation
```
 truffle -v
```

* [Metamask](https://metamask.io/)

### Installation
```
truffle develop
```

Copy the Mnemonic values and use in Metamask under Import Existing Den. [See more](https://blog.digitexfutures.com/trading/how-to-set-up-metamask/)

Make sure that you're on a custom RPC with: http://127.0.0.1:9545.

Once truffle develop is up and running,
```
compile
```

```
migrate
```

Once Truffle is running, start your front-end by first installing all your modules
```
npm install
```

After installation is complete, start the server and navigate to http://localhost:3000
```
npm run start
```

## Tests

```
truffle develop
```

```
test
```

## Built With

* [React Box](https://github.com/truffle-box/react-box)
