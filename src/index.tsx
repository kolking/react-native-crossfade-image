import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  EasingFunction,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';

import { isEqual } from './helpers';

interface ImageLayer {
  id: number;
  source: ImageSourcePropType;
  opacity: Animated.Value;
}

function createLayer(id: number, source: ImageSourcePropType, opacity: number): ImageLayer {
  return { id, source, opacity: new Animated.Value(opacity) };
}

export interface CrossfadeImageProps extends ImageProps {
  source: ImageSourcePropType;
  duration?: number;
  easing?: EasingFunction;
  children?: React.ReactNode;
  reverseFade?: boolean;
}

export const CrossfadeImage = ({
  style,
  source,
  duration = 500,
  easing = Easing.ease,
  children,
  reverseFade = false,
  ...props
}: CrossfadeImageProps) => {
  const nextLayerId = useRef(1);
  const latestLayerId = useRef(0);
  const activeLayerId = useRef(0);
  const latestSource = useRef(source);
  const animatingLayerId = useRef<number | undefined>(undefined);
  const runningAnimation = useRef<ReturnType<typeof Animated.parallel> | undefined>(undefined);
  const [layers, setLayers] = useState<ImageLayer[]>(() => [createLayer(0, source, 1)]);

  // Stop stale transitions before a newer source takes over
  const stopAnimation = useCallback(() => {
    runningAnimation.current?.stop();
    runningAnimation.current = undefined;
    animatingLayerId.current = undefined;
  }, []);

  const fadeAnimation = useCallback(
    (animatedValue: Animated.Value, toValue: number) =>
      Animated.timing(animatedValue, {
        toValue,
        duration,
        easing,
        useNativeDriver: true,
      }),
    [duration, easing],
  );

  useEffect(() => stopAnimation, [stopAnimation]);

  useLayoutEffect(() => {
    if (isEqual(source, latestSource.current)) {
      return;
    }

    // Add a new image layer on top of the layers stack
    const layer = createLayer(nextLayerId.current, source, 0);
    nextLayerId.current += 1;
    latestLayerId.current = layer.id;
    latestSource.current = source;

    stopAnimation();
    setLayers((value) => [...value, layer]);
  }, [source, stopAnimation]);

  const handleLoad = useCallback(
    (layer: ImageLayer) => {
      if (
        layer.id === activeLayerId.current ||
        layer.id !== latestLayerId.current ||
        layer.id === animatingLayerId.current
      ) {
        return;
      }

      // Stop currently running animation
      stopAnimation();

      const animations = [fadeAnimation(layer.opacity, 1)];

      if (reverseFade) {
        layers.forEach(({ id, opacity }) => {
          if (id !== layer.id) {
            animations.push(fadeAnimation(opacity, 0));
          }
        });
      }

      const animation = Animated.parallel(animations);
      runningAnimation.current = animation;
      animatingLayerId.current = layer.id;

      animation.start(({ finished }) => {
        if (runningAnimation.current === animation) {
          runningAnimation.current = undefined;
        }

        if (animatingLayerId.current === layer.id) {
          animatingLayerId.current = undefined;
        }

        if (!finished || layer.id !== latestLayerId.current) {
          return;
        }

        layer.opacity.setValue(1);
        activeLayerId.current = layer.id;

        // Keep only the last layer after the transition
        setLayers([layer]);
      });
    },
    [layers, reverseFade, stopAnimation, fadeAnimation],
  );

  return (
    <View style={[styles.root, style]}>
      {layers.map((layer) => (
        <Animated.Image
          {...props}
          key={layer.id}
          style={[styles.image, { opacity: layer.opacity }]}
          source={layer.source}
          fadeDuration={0}
          onLoad={() => handleLoad(layer)}
        />
      ))}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
});
