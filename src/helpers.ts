import { Image, ImageSourcePropType } from 'react-native';

export function isEqual(one: ImageSourcePropType, two?: ImageSourcePropType) {
  if (!two) {
    return false;
  }

  return Image.resolveAssetSource(one).uri === Image.resolveAssetSource(two).uri;
}
