import { useEffect, useRef } from 'react';
import { ImageSourcePropType } from 'react-native';

export const usePrevious = (value: ImageSourcePropType) => {
  const ref = useRef<ImageSourcePropType>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
