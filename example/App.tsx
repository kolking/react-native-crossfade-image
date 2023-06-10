import React, { useCallback, useState } from 'react';
import {
  ImageSourcePropType,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CrossfadeImage } from 'react-native-crossfade-image';

StatusBar.setBarStyle('light-content');

const images: ImageSourcePropType[] = [
  { uri: 'https://images.unsplash.com/photo-1654094736160-f9cff1c070a8?w=1000&q=80' },
  { uri: 'https://images.unsplash.com/photo-1649829875859-483c00ff482c?w=1000&q=80' },
  { uri: 'https://images.unsplash.com/photo-1621100208131-616a19c9635a?w=1000&q=80' },
  require('./assets/one.jpg'),
  require('./assets/two.jpg'),
];

const getNextIndex = (index: number) => {
  return index === images.length - 1 ? 0 : index + 1;
};

const App = () => {
  const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex(getNextIndex(index));
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [index]);

  const handleChange = useCallback(() => {
    setIndex(getNextIndex(index));
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
          <TouchableOpacity style={styles.button} onPress={handleChange}>
            <Text style={styles.buttonText}>Change Image</Text>
          </TouchableOpacity>
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
  button: {
    padding: 15,
    marginTop: 30,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff3',
  },
  buttonText: {
    fontSize: 15,
    color: '#fff9',
  },
});

export default App;
