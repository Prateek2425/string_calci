/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Button,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("0")


  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  const submitHandler = () => {
    try {
      let delimiter = /,|\n/;
      let numbersPart = input;

      if (input.startsWith("//")) {
        const match = input.match(/^\/\/(.+)\n/);
        if (match) {
          delimiter = new RegExp(match[1].replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
          numbersPart = input.slice(match[0].length)
        } else {
          throw new Error("invalid custom delimiter format")
        }
      }
      const numbers = numbersPart?.split(delimiter).map(Number)
      const negatives = numbers.filter(num => num < 0)
      if (negatives?.length > 0) {
        throw new Error(`Negative not allowed: ${negatives.join(", ")}`);
      }
      if (numbers.some(isNaN)) {
        throw new Error("invalid number formate")
      }
      const sum = numbers.reduce((acc, num) => acc + num, 0)
      setOutput(sum)
    } catch (error) {
      console.log("err", error)
      setOutput(String(error))
    }
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Text style={{ fontWeight: "500", fontSize: 18 }}>{output}</Text>
        <TextInput value={input} onChangeText={(e) => setInput(e)} style={styles.textinputs} />
        <Pressable style={styles.button} onPress={submitHandler} >
          <Text style={{ fontWeight: "500", fontSize: 16, color: "#fff" }}>{"Submit"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  textinputs: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 12,
    elevation: 5,
    marginVertical: 20,
    padding: 10
  },
  button: {
    backgroundColor: "skyblue",
    width: "90%",
    borderRadius: 12,
    elevation: 5,
    padding: 12,
    alignItems: "center"

  }
});

export default App;
