import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
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

import { usePrevious } from './hooks';
import { isEqual } from './helpers';

export interface CrossfadeImageProps extends ImageProps {
  duration?: number;
  easing?: EasingFunction;
  children?: React.ReactNode;
}

export const CrossfadeImage = ({
  style,
  source,
  duration = 500,
  easing = Easing.ease,
  children,
  ...props
}: CrossfadeImageProps) => {
  const prevSource = usePrevious(source);
  const nextSource = useRef<ImageSourcePropType>();
  const opacity = useRef(new Animated.Value(0)).current;
  const [oldSource, setOldSource] = useState<ImageSourcePropType>(source);
  const [newSource, setNewSource] = useState<ImageSourcePropType>();

  useLayoutEffect(() => {
    if (prevSource && !isEqual(source, prevSource)) {
      if (!nextSource.current) {
        setNewSource(source);
      }

      nextSource.current = source;
    }
  }, [source, prevSource]);

  const handleUpdate = useCallback(() => {
    // If the source has been changed during animation
    // then update newSource to the saved value,
    // otherwise reset newSource to undefined
    setNewSource(nextSource.current);
    opacity.setValue(0);

    if (isEqual(oldSource, nextSource.current)) {
      nextSource.current = undefined;
    }
  }, [opacity, oldSource]);

  const handleLoad = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      easing,
      useNativeDriver: true,
    }).start(() => {
      if (newSource && !isEqual(oldSource, newSource)) {
        // Replace oldSource with newSource,
        // this will trigger handleUpdate
        setOldSource(newSource);
      } else {
        // If oldSource and newSource are the same
        // then explicitly call handleUpdate
        handleUpdate();
      }
    });
  }, [opacity, oldSource, newSource, duration, easing, handleUpdate]);

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
      {children}
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
