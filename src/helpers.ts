import { Image, ImageSourcePropType } from 'react-native';

export function isEqual(one: ImageSourcePropType, two?: ImageSourcePropType) {
  if (!two) {
    return false;
  }

  const resolvedOne = Image.resolveAssetSource(one);
  const resolvedTwo = Image.resolveAssetSource(two);
  return (
    resolvedOne !== undefined && resolvedTwo !== undefined && resolvedOne.uri === resolvedTwo.uri
  );
}
