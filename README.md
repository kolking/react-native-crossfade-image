# React Native Crossfade Image

React Native component for changing images with crossfade transition effect when a new source prop received. Works as a replacement for React Native's `Image` or `ImageBackground` components, both local files and remote URLs supported.

![teaser](https://user-images.githubusercontent.com/4656448/171822383-7a9b1d0d-38fe-4804-bf09-20b3c2c4b569.gif)

## Installation

### yarn

```sh
yarn add react-native-crossfade-image
```

### npm

```sh
npm install react-native-crossfade-image
```

## Use as an image

Simply replace `Image` with `CrossfadeImage` in your component. Please note that you have to specify image dimensions using the style prop to avoid collapsing.

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CrossfadeImage } from 'react-native-crossfade-image';

const MyComponent = ({ imageSource }) => (
  <View style={styles.wrapper}>
    <CrossfadeImage style={styles.image} source={imageSource} resizeMode="cover" />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default MyComponent;
```

## Use as a background image

You can provide children like you would with `ImageBackground` component. The content will be shown on top of the image. Adding `blurRadius` will create a nice blurred background effect.

```jsx
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { CrossfadeImage } from 'react-native-crossfade-image';

const MyComponent = ({ imageSource }) => (
  <CrossfadeImage style={styles.background} source={imageSource} resizeMode="cover" blurRadius={50}>
    <Text style={styles.text}>Text over blurred background</Text>
  </CrossfadeImage>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MyComponent;
```

## Props

| Prop          | Type                | Default       | Description                                                                                                                |
| ------------- | ------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `source`      | ImageSourcePropType |               | The image source (either a remote URL or a local file resource).                                                           |
| `duration`    | number              | `500`         | Duration of the fade transition in ms.                                                                                     |
| `easing`      | EasingFunction      | `Easing.ease` | Easing function, see [available options](https://reactnative.dev/docs/easing).                                             |
| `style`       | ViewStyle           |               | Style object applied to the wrapping View.                                                                                 |
| `resizeMode`  | ImageResizeMode     | `cover`       | Image resize mode, see [available options](https://reactnative.dev/docs/image#resizemode).                                 |
| `reverseFade` | boolean             | `false`       | Fade the images simultaneously so the old image fades out while the new image fades in. Use `true` for transparent images. |
| `blurRadius`  | number              |               | The blur radius of the blur filter applied to the image.                                                                   |
| `children`    | ReactNode           |               | Any children provided will be shown on top of the image similar to `ImageBackground` component.                            |

## Example app demo

https://user-images.githubusercontent.com/4656448/172882419-c4712b98-3711-4dfb-85d7-ba56fa307dd8.mp4

## Feedback

I appreciate your feedback, so please star the repository if you like it. This is the best motivation for me to maintain the package and add new features. If you have any feature requests, found a bug, or have ideas for improvement, feel free to [open an issue](https://github.com/kolking/react-native-crossfade-image/issues).

Also, please check out my other React Native components that might be a good fit for your project:

- [React Native Avatar](https://github.com/kolking/react-native-avatar) - Display user avatars like a pro.
- [React Native Rating](https://github.com/kolking/react-native-rating) - An interactive rating component.
- [React Native Page Indicator](https://github.com/kolking/react-native-page-indicator) - Show the current page of a swiper, slideshow, carousel, etc.
- [React Native Parallax Swiper](https://github.com/kolking/react-native-parallax-swiper) - Build a horizontal scroll swiper with a parallax effect.

## License

Licensed under the MIT license.
