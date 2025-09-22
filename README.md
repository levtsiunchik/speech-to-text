# Speech-to-Text Demo (Expo + Cloudflare Whisper)

A demo app built with **Expo + React Native** that records speech and converts it into text using **Cloudflare Workers AI (Whisper)**.

## Features

- Record audio from the device microphone (via [`expo-audio`](https://docs.expo.dev/versions/latest/sdk/audio/))
- Send binary audio data to the **Cloudflare Whisper API**
- Receive transcription and display the result
- Settings screen to enter **Account ID** and **API Token**
- Credentials are stored locally using [`expo-secure-store`](https://docs.expo.dev/versions/latest/sdk/securestore/)
- Supports update and delete

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Usage

- Go to the Settings tab
- Enter your Cloudflare Account ID and API Token
- Tap "Save"
- Switch to the Recognize tab and start recording
