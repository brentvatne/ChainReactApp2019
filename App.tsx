import React from "react"
import * as Font from "expo-font"
import Constants from "expo-constants"
import App from "./src"

let AppContainer
if (Constants.appOwnership === 'expo') {
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
  // Otherwise don't bother. We could use react-native-splash-screen if wanted
  // to here.
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
