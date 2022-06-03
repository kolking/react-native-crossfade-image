# React Native Crossfade Image

React Native component for changing images with crossfade transition effect when a new source prop received. Works as a replacement for React Native's Image component, both local files and remote URLs supported.

![teaser](https://user-images.githubusercontent.com/4656448/171822383-7a9b1d0d-38fe-4804-bf09-20b3c2c4b569.gif)

## Installation

Using yarn:
```sh
yarn add react-native-crossfade-image
```

Using npm:
```sh
npm install react-native-crossfade-image
```

## Usage

Note that you have to specify image dimensions using style prop.

```js
import { CrossfadeImage } from 'react-native-crossfade-image';

const YourComponent = ({ imageSource }) => (
  <View>
    <CrossfadeImage style={{ width: 100, height: 100 }} source={imageSource} />
  </View>
);
```

## Props

Prop Name | Required | Default | Description
---|---|---|---
`source` | yes | | The image source (either a remote URL or a local file resource)
`duration` | no | `500` | Duration of the fade transition in ms
`easing` | no | `Easing.ease` | Easing function, see [available options](https://reactnative.dev/docs/easing)
`style`| no | | Style object applied to the wrapping View
`resizeMode` | no | 'cover' | Image resize mode, see [available options](https://reactnative.dev/docs/image#resizemode)
`blurRadius` | no | | The blur radius of the blur filter applied to the image

## License

MIT