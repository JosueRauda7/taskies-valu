import { Text, StyleSheet, Pressable, View } from "react-native";

const Item = (props) => {
  return (
    <View style={styles.itemView}>
      <Pressable
        android_ripple={{ color: "#4726BF" }}
        onPress={() => props.onDeleteItem(props.item.id)}>
        <Text style={styles.item}>📌 {props.item.goal}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  itemView: {
    backgroundColor: "#7559D9",
    borderRadius: 8,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderRightColor: "#4726BF",
    borderBottomColor: "#4726BF",
    marginBottom: 10,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    color: "#fff",
    fontSize: 18,
  },
});

export default Item;
