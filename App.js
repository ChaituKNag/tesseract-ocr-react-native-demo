import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
// import * as Tesseract from "tesseract.js";
import { RNTesseractOcr } from "react-native-tesseract-ocr";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

const options = {
  title: "Select Image",
  customButtons: [{ name: "fb", title: "Choose Photo From Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      text: null
    };
  }

  componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  handleSelectImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      console.log(result.uri);
      this.setState({ image: result.uri });
      // Tesseract.recognize(result.uri, "eng", {
      //   logger: m => console.log(m)
      // }).then(({ data: { text } }) => {
      //   console.log("text", text);
      //   this.setState({
      //     text
      //   });
      // });

      console.log("RNTesseractOcr", RNTesseractOcr);

      // RNTesseractOcr.recognize(result.uri, "eng", {
      //   whitelist: null,
      //   blacklist: "1234567890'!\"#$%&/()={}[]+*-_:;<>"
      // })
      //   .then(res => {
      //     this.setState({ text: res });
      //     console.log("OCR Result: ", res);
      //   })
      //   .catch(err => {
      //     console.log("OCR Error: ", err);
      //   })
      //   .done();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button onPress={this.handleSelectImage} title="Select Image"></Button>
        {this.state.image && (
          <Image style={styles.image} source={{ uri: this.state.image }} />
        )}
        {this.state.text && <Text styles={styles.text}>{this.state.text}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  image: {
    width: 100,
    height: 100
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    margin: 20
  }
});
