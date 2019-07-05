import React from "react"
import AnimatedSplashScreen from "./AnimatedSplashScreen"
import * as Font from "expo-font"
import App from "./src"

export default class AppContainer extends React.Component {
  _loadAssetsAsync = async () => {
    await Promise.all([
      Font.loadAsync({
        "Gotham Rounded": require("./assets/GothamRnd-Book.otf"),
        "Gotham Rounded Bold": require("./assets/GothamRnd-Bold.otf"),
      }),
    ])
  }

  render() {
    return (
      <AnimatedSplashScreen
        loadAsync={this._loadAssetsAsync}
        splashImageSource={require("./assets/splash.png")}
      >
        <App {...this.props} />
      </AnimatedSplashScreen>
    )
  }
}
