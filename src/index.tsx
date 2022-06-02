import React, { useCallback, useLayoutEffect, useState } from 'react';
import {
  Animated,
  Easing,
  EasingFunction,
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import isEqual from 'fast-deep-equal';

import { usePrevious } from './hooks';

export interface CrossfadeImageProps extends ImageProps {
  duration?: number;
  easing?: EasingFunction;
}

export const CrossfadeImage: React.FC<CrossfadeImageProps> = ({
  style,
  source,
  duration = 500,
  easing = Easing.ease,
  ...props
}) => {
  const prevSource = usePrevious(source);
  const [oldSource, setOldSource] = useState<ImageSourcePropType>(source);
  const [newSource, setNewSource] = useState<ImageSourcePropType>();
  const [opacity] = useState(() => new Animated.Value(0));

  useLayoutEffect(() => {
    if (!isEqual(source, prevSource)) {
      setNewSource(source);
    }
  }, [source, prevSource]);

  const handleLoad = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      easing,
      useNativeDriver: true,
    }).start(() => {
      if (newSource) {
        setOldSource(newSource);
      }
    });
  }, [opacity, newSource, duration, easing]);

  const handleUpdate = useCallback(() => {
    setNewSource(undefined);
    opacity.setValue(0);
  }, [opacity]);

  return (
    <View style={[styles.root, style]}>
      <Image
        {...props}
        style={styles.image}
        source={oldSource}
        fadeDuration={0}
        onLoad={handleUpdate}
      />
      {newSource && (
        <Animated.Image
          {...props}
          style={[styles.image, { opacity }]}
          source={newSource}
          fadeDuration={0}
          onLoad={handleLoad}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
});
