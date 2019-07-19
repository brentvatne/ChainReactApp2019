import * as React from "react"
import { View, ViewStyle } from "react-native"
import { getScreenWidth, palette, spacing } from "../../theme"
import { AttractionsList } from "../attractions-list"

const ROOT: ViewStyle = {
  paddingTop: spacing.large,
  backgroundColor: palette.portGoreLight,
}

import Constants from 'expo-constants';

let AttractionsMap;
if (Constants.appOwnership === 'expo') {
  // You can put some placeholder or alternative implementation here!
  AttractionsMap = View;
} else {
  AttractionsMap = require('../attractions-map').AttractionsMap;
}


export class NearbyAttractions extends React.Component<{}, {}> {
  render() {
    const fullWidth = {
      width: getScreenWidth(),
    }
    return (
      <View style={{ ...ROOT, ...fullWidth }}>
        <AttractionsList />
        <AttractionsMap />
      </View>
    )
  }
}
