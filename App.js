import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TextInput,
  Modal,
  ScrollView,
  ToastAndroid,
  Keyboard,
} from "react-native";
import Item from "./components/Item";
import Button from "./components/Button";
import Title from "./components/Title";
import { deleteGoal, fetchGoals, init, insertGoal } from "./util/database";
import AppLoading from "expo-app-loading";

export default function App() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [newGoal, setNewGoal] = useState("");
  const [goals, setGoals] = useState([]);
  const [dbInitialized, setDbInitialized] = useState(false);

  async function loadGoals() {
    const updatedGoals = await fetchGoals();
    setGoals(updatedGoals);
  }

  // Inicializar SQLite
  useEffect(() => {
    init()
      .then((res) => {
        setDbInitialized(true);
      })
      .catch((err) => console.log(err));

    loadGoals();
  }, []);

  const handleNewGoal = (newItem) => setNewGoal(newItem);
  const handleAddGoal = async () => {
    if (newGoal) {
      await insertGoal(newGoal);
      handleToogleModal();
      loadGoals();
      ToastAndroid.show("Nueva tarea añadida 🎯", ToastAndroid.SHORT);
    }
  };
  const handleDeleteGoal = async (idItemToDelete) => {
    await deleteGoal(idItemToDelete);
    loadGoals();
    ToastAndroid.show("Tarea completada 🏆", ToastAndroid.SHORT);
  };
  const handleToogleModal = () => {
    setIsShowModal(!isShowModal);
    setNewGoal("");
  };

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title h1 title='Tareas 📚' center />
      </View>
      {isShowModal && (
        <Modal animationType='slide' style={styles.modal}>
          <View style={styles.formViewModal}>
            <Title h1 title='📝 Nueva Tarea' style={{ ...styles.center }} />
            <TextInput
              style={styles.addGoalInput}
              onChangeText={handleNewGoal}
              value={newGoal}
              placeholder='Tarea a completar'
              onSubmitEditing={Keyboard.dismiss}
            />
            <Button
              style={styles.spaceVerticalButton}
              title='Añadir tarea'
              onPress={handleAddGoal}
              primary
            />
            <Button
              style={styles.spaceVerticalButton}
              title='Regresar'
              onPress={handleToogleModal}
              danger
            />
          </View>
        </Modal>
      )}
      <View style={styles.listOfGoals}>
        <ScrollView style={styles.scrollGoals}>
          {goals.map((item, id) => (
            <Item key={item.id} item={item} onDeleteItem={handleDeleteGoal} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.formView}>
        <Button primary title='Nueva Tarea' onPress={handleToogleModal} />
      </View>
      <Title
        style={{ ...styles.center, ...styles.footer }}
        title='Para Valeria ❤'
        h3
      />
      <StatusBar style='light' backgroundColor='#7559D9' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  formView: {
    flex: 1,
    height: 20,
  },
  formViewModal: {
    flex: 3,
    height: 20,
    backgroundColor: "#1D1459",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  listOfGoals: {
    flex: 8,
  },
  footer: {
    paddingVertical: 5,
  },
  spaceVerticalButton: {
    marginVertical: 5,
  },
  center: {
    textAlign: "center",
  },
  addGoalInput: {
    backgroundColor: "#fff",
    fontSize: 18,
    padding: 7,
    marginVertical: 15,
    borderRadius: 5,
  },
  scrollGoals: {
    marginTop: 7,
    marginBottom: 1,
  },
});
