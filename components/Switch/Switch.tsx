import * as React from "react";
import { View } from "react-native";
import { Switch, Text } from "react-native-paper";

const SwitchComponent = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={{ margin: 16, display: "flex", rowGap: 12 }}>
      <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      <Text>{isSwitchOn ? "Enabled" : "Disabled"}</Text>
    </View>
  );
};

export default SwitchComponent;
