import React from "react";
import { StyleSheet, View, Button } from "react-native";
import Picache from "./lib/Picache";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const App = () => {
  const [show, setShow] = React.useState(false);
  return (
    <View style={styles.container}>
      <Button title="toggle picture" onPress={() => setShow(!show)} />
      {show ? (
        <React.Fragment>
          <Picache
            style={{ height: 200, width: 200 }}
            source={{ uri: "http://via.placeholder.com/200x200" }}
          />
          <Picache
            style={{ height: 150, width: 350 }}
            source={require("./square.png")}
          />
          <Picache
            style={{ height: 50, width: 50 }}
            source={[
              {
                uri: "http://via.placeholder.com/25x25",
                height: 25,
                width: 25
              },
              {
                uri: "http://via.placeholder.com/50x50",
                height: 50,
                width: 50
              }
            ]}
          />
        </React.Fragment>
      ) : null}
    </View>
  );
};

export default App;
