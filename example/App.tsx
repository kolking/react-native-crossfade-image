import React, { useEffect, useState } from 'react';
import { ImageSourcePropType, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { CrossfadeImage } from 'react-native-crossfade-image';

StatusBar.setBarStyle('light-content');

const images: ImageSourcePropType[] = [
  { uri: 'https://images.unsplash.com/photo-1654094736160-f9cff1c070a8?w=1000&q=80' },
  { uri: 'https://images.unsplash.com/photo-1649829875859-483c00ff482c?w=1000&q=80' },
  { uri: 'https://images.unsplash.com/photo-1621100208131-616a19c9635a?w=1000&q=80' },
  require('./assets/one.jpg'),
  require('./assets/two.jpg'),
];

const App = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval: any;

    if (!interval) {
      interval = setInterval(() => {
        const newIndex = index + 1 === images.length ? 0 : index + 1;
        setIndex(newIndex);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [index]);

  return (
    <CrossfadeImage
      style={styles.background}
      source={images[index]}
      resizeMode="cover"
      blurRadius={50}
      duration={1000}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <CrossfadeImage style={styles.image} source={images[index]} resizeMode="cover" />
        </View>
      </SafeAreaView>
    </CrossfadeImage>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#212124',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0009',
  },
  content: {
    margin: 30,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
});

export default App;
