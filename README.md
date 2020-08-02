# notifier-native

Native app client for [notifier](https://github.com/CodingItWrong/notifier-server), a system to receive events via a web hook and forward them along to an app via websockets and push notifications.

## Requirements

- Node
- [Expo](https://expo.io/learn)
- Xcode or Android Studio

## Installation

```bash
$ yarn install
```

## Running

```bash
$ yarn start
```

Then click "Run on Android device/emulator" or "Run on iOS Simulator" to try the websocket functionality.

To use push notifications on iOS you will need to publish your project, then open in the Expo Client app on iOS.

Then run [notifier-server](https://github.com/CodingItWrong/notifier-server).

Then send a message to the "web hook":

```
$ curl -X POST http://localhost:3000/webhooks/test -d "Hello, world!"
```

The following should happen:

- If you are running in the simulator, you should see "Hello, world!" added to the list of messages on the screen. This happens via web hook.
- If you are running on a physical device, and have updated your Expo push token in the code, you should see a push notification with the message.

## Architecture

The native app connects to the backend via a real-time websocket. If you tap the button to get a push notification token, you can copy that token into the backend's configuration. Then the backend is able to send push notifications to your physical device via the Expo push notification service.

## License

MIT
