// Welcome to the main entry point of the app.
//
// In this file, we'll be kicking off our app or storybook.
import { StatefulNavigator } from "./navigation"
import "./i18n"
import { Platform, StatusBar } from "react-native"
import { Rehydrated } from "aws-appsync-react"
import { ApolloProvider } from "react-apollo"
import AWSAppSyncClient from "aws-appsync"
import * as React from "react"
import { RootStore, setupRootStore } from "./models/root-store"
import { Provider } from "mobx-react"
import { BackButtonHandler } from "./navigation/back-button-handler"
import { contains } from "ramda"
import { DEFAULT_NAVIGATION_CONFIG } from "./navigation/navigation-config"
import { palette } from "./theme/palette"
import AppSyncConfig from "./aws-exports"

const client: any = new AWSAppSyncClient({
  url: AppSyncConfig.aws_appsync_graphqlEndpoint,
  region: AppSyncConfig.aws_project_region,
  auth: {
    type: AppSyncConfig.aws_appsync_authenticationType,
    apiKey: AppSyncConfig.aws_appsync_apiKey,
    // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
  },
})

interface AppState {
  rootStore?: RootStore
}

/**
 * This is the main component of our app.
 */
export default class App extends React.Component<{}, AppState> {
  componentWillMount() {
    if (Platform.OS === "android") StatusBar.setBackgroundColor(palette.portGore)
    StatusBar.setBarStyle("light-content")
  }
  /**
   * When the component is mounted. This happens asynchronously and simply
   * re-renders when we're good to go.
   */
  async componentDidMount() {
    this.setState(
      {
        rootStore: await setupRootStore(),
      },
      () => {
        // SplashScreen.hide()
      },
    )
  }

  /**
   * Are we allowed to exit the app?  This is called when the back button
   * is pressed on android.
   *
   * @param routeName The currently active route name.
   */
  canExit(routeName: string) {
    return contains(routeName, DEFAULT_NAVIGATION_CONFIG.exitRoutes)
  }

  render() {
    const rootStore = this.state && this.state.rootStore

    // Before we show the app, we have to wait for out state to be ready.
    // In the meantime, don't render anything. This will be the background
    // color set in native by rootView's background color.
    //
    // This step should be completely covered over by the splash screen though.
    //
    // You're welcome to swap in your own component to render if your boot up
    // sequence is too slow though.
    if (!rootStore) {
      return null
    }

    // otherwise, we're ready to render the app

    const injectableStores = {
      navigationStore: rootStore.navigationStore,
      talkStore: rootStore.talkStore,
    }

    return (
      <ApolloProvider client={client}>
        <Rehydrated>
          <Provider {...injectableStores}>
            <BackButtonHandler canExit={this.canExit}>
              <StatefulNavigator />
            </BackButtonHandler>
          </Provider>
        </Rehydrated>
      </ApolloProvider>
    )
  }
}
