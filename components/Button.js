import { Pressable, StyleSheet, View, Text } from "react-native";

const Button = (props) => {
  return (
    <View
      style={{
        ...(props.primary && styles.primaryButton),
        ...(props.danger && styles.dangerButton),
        ...styles.buttonContainer,
        ...props.style,
      }}>
      <Pressable android_ripple={{ color: "#7559D9" }} onPress={props.onPress}>
        <Text style={styles.buttonTitle}>{props.title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    borderRadius: 4,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  primaryButton: {
    backgroundColor: "#4726BF",
    borderBottomColor: "#7559D9",
    borderRightColor: "#7559D9",
  },
  dangerButton: {
    backgroundColor: "#F2274C",
    borderBottomColor: "#D92525",
    borderRightColor: "#D92525",
  },
  buttonTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 12,
  },
});

export default Button;
