import React from "react"
import { View } from "react-native"
import { AttractionsList } from "./src/components/attractions-list"
import { color } from "./src/theme"

export default () => (
  <View style={{ backgroundColor: color.palette.portGore, flex: 1 }}>
    <AttractionsList />
  </View>
)
