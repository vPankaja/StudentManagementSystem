import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { ImageBackground } from "react-native-web";

class SplashScreen extends Component {
  componentDidMount() {
    // You can add any logic here to run when the splash screen loads
    // such as fetching data or initializing services
    setTimeout(() => {
      this.props.navigation.navigate("Add Notice"); // replace 'Main' with the name of your main app component
    }, 3000); // replace 3000 with the desired number of milliseconds for your splash screen to display
  }

  render() {
    return (
      <ImageBackground
        source={require("../../assets/SLIIT.png")}
        style={styles.background}
      >
        <Image
          source={{
            uri: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif",
          }}
          style={styles.gif}
        />
      </ImageBackground>
    );
  }
}

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  gif: {
    position: "absolute",
    bottom: 0, // adjust this value to position the image
    left: 0, // adjust this value to position the image
    right: 0,
    height: 150, // adjust this value to change the height of the image
    resizeMode: "contain", // adjust this value to change the image's resizing behavior
  },
});
