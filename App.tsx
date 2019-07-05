import React from "react"
import { StyleSheet } from "react-native"
import * as Font from "expo-font"
import Constants from "expo-constants"
import App from "./src"

let AppContainer
if (Constants.manifest) {
  // Use AnimatedSplashScreen from the 'expo' package if we are in managed context
  let AnimatedSplashScreen = require("./AnimatedSplashScreen").default
  AppContainer = class extends React.Component {
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
} else {
  // Otherwise just use a simple AppContainer. We also need to temporarily set
  // font processor
  StyleSheet.setStyleAttributePreprocessor("fontFamily", Font.processFontFamily)
  AppContainer = class extends React.Component<any, { loaded: boolean }> {
    constructor(props) {
      super(props)
      this._loadAssetsAsync()

      this.state = {
        loaded: false,
      }
    }

    _loadAssetsAsync = async () => {
      await Promise.all([
        Font.loadAsync({
          "Gotham Rounded": require("./assets/GothamRnd-Book.otf"),
          "Gotham Rounded Bold": require("./assets/GothamRnd-Bold.otf"),
        }),
      ])

      this.setState({ loaded: true })
    }

    render() {
      if (!this.state.loaded) {
        return null
      }

      return <App {...this.props} />
    }
  }
}

export default AppContainer
