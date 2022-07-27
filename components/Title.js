import { Text, StyleSheet } from "react-native";

const Title = (props) => {
  if (props.h1) {
    return <Text style={{ ...styles.h1, ...props.style }}>{props.title}</Text>;
  } else if (props.h2) {
    return <Text style={{ ...styles.h2, ...props.style }}>{props.title}</Text>;
  } else if (props.h3) {
    return <Text style={{ ...styles.h3, ...props.style }}>{props.title}</Text>;
  } else {
    return <Text style={{ ...props.styles }}>{props.title}</Text>;
  }
};

const styles = StyleSheet.create({
  h1: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  h2: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  h3: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Title;
