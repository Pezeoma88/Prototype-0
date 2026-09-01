import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('Hellooooooo Worldddddd');

  const handleGreet = () => {
    if (name.trim().length === 0) {
      return;
    }
    setGreeting(`Hellooooooo ${name.trim()}!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{greeting}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Greet Me" onPress={handleGreet} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
});
