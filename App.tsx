import React from "react"
import { View } from "react-native"
import * as Font from "expo-font"
import App from "./src"

export default class AppContainer extends React.Component<any, { isReady: boolean }> {
  state = {
    isReady: false,
  }

  componentDidMount() {
    this._loadAssetsAsync()
  }

  _loadAssetsAsync = async () => {
    await Font.loadAsync({
      "Gotham Rounded": require("./assets/GothamRnd-Book.otf"),
      "Gotham Rounded Bold": require("./assets/GothamRnd-Bold.otf"),
    })

    this.setState({ isReady: true })
  }

  render() {
    if (!this.state.isReady) {
      return <View />
    }

    return <App {...this.props} />
  }
}
