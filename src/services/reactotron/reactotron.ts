// import Tron from "reactotron-react-native"
// import { RootStore } from "../../models/root-store"
// import { onSnapshot } from "mobx-state-tree"
// import { ReactotronConfig, DEFAULT_REACTOTRON_CONFIG } from "./reactotron-config"
// import { mst } from "reactotron-mst"
// import { withCustomActions } from "./with-custom-actions-reactotron"

// // Teach TypeScript about the bad things we want to do.
// declare global {
//   interface Console {
//     /**
//      * Hey, it's Reactotron if we're in dev, and no-ops if we're in prod.
//      */
//     tron: typeof Tron
//   }
// }

// /** Do Nothing. */
// const noop = () => undefined

// // in dev, we attach Reactotron, in prod we attach a interface-compatible mock.
// if (__DEV__) {
//   console.tron = Tron // attach reactotron to `console.tron`
// } else {
//   // attach a mock so if things sneaky by our __DEV__ guards, we won't crash.
//   // @ts-ignore
//   console.tron = {
//     configure: noop,
//     connect: noop,
//     use: noop,
//     useReactNative: noop,
//     clear: noop,
//     log: noop,
//     display: noop,
//     error: noop,
//     logImportant: noop,
//   }
// }

// /**
//  * You'll probably never use the service like this since we hang the Reactotron
//  * instance off of `console.tron`. This is only to be consistent with the other
//  * services.
//  */
// export class Reactotron {
//   config: ReactotronConfig
//   rootStore: any

//   /**
//    * Create the Reactotron service.
//    *
//    * @param config the configuration
//    */
//   constructor(config: ReactotronConfig = DEFAULT_REACTOTRON_CONFIG) {
//     // merge the passed in config with some defaults
//     this.config = {
//       host: "localhost",
//       useAsyncStorage: true,
//       clearOnLoad: true,
//       ...config,
//       state: {
//         initial: false,
//         snapshots: false,
//         ...(config && config.state),
//       },
//     }
//   }

//   /**
//    * Hook into the root store for doing awesome state-related things.
//    *
//    * @param rootStore The root store
//    */
//   setRootStore(rootStore: any, initialData: any) {
//     if (__DEV__) {
//       rootStore = rootStore as RootStore // typescript hack
//       this.rootStore = rootStore

//       const { initial, snapshots } = this.config.state
//       const name = "ROOT STORE"

//       // logging features
//       if (initial) {
//         console.tron.display({ name, value: initialData, preview: "Initial State" })
//       }
//       // log state changes?
//       if (snapshots) {
//         onSnapshot(rootStore, snapshot => {
//           console.tron.display({ name, value: snapshot, preview: "New State" })
//         })
//       }

//       // @ts-ignore
//       console.tron.trackMstNode(rootStore)
//     }
//   }

//   /**
//    * Configure reactotron based on the the config settings passed in, then connect if we need to.
//    */
//   async setup() {
//     // only run this in dev... metro bundler will ignore this block: 🎉
//     if (__DEV__) {
//       // configure reactotron
//       Tron.configure({
//         name: this.config.name || require("../../../package.json").name,
//         host: this.config.host,
//       })

//       // hookup middleware
//       Tron.useReactNative({
//         asyncStorage: this.config.useAsyncStorage ? undefined : false,
//       })

//       Tron.use(
//         mst({
//           filter: event => {
//             return !event.name.endsWith("@APPLY_SNAPSHOT")
//           },
//         }),
//       )

//       Tron.use(withCustomActions(() => this.rootStore))

//       // connect to the app
//       Tron.connect()

//       // clear if we should
//       if (this.config.clearOnLoad) {
//         Tron.clear()
//       }
//     }
//   }
// }
