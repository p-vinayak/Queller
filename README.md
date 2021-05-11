# Queller

## Requirements

```
Node >= v15.0
Yarn >= 1.22.5
Expo-Cli >= 4.3.0
```

On top of these requirements, you will also need to put in your firebase credentails under `configs/firebase.ts`. You will have to create this file and directory on your own. It should look something like this:

```typescript
export const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
};
```

## Installation

To run this application on your system, you must have node, npm, and expo-cli installed.

```
yarn add global expo-cli
OR
npm install -g expo-cli
```

Once these requirements are met, close this repository onto your system and run the following in this project's root directory:

```
yarn install
```

## Running

To start the application use the following command:

```
expo start
```

This will open up the expo dashboard in your default browser. It will also give you a list of command-line options through which you can run the app through Expo Go or through iOS/Android simulator.

NOTE: If you're running expo for the first time on Simulator, you may get some warnings and errors. Simply ignore them and recompile the application if needed. This is a problem with expo and not much can be done about it.
