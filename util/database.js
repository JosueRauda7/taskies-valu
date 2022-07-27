import * as SQLite from "expo-sqlite";
import { Goal } from "../models/goal";

const database = SQLite.openDatabase("goals.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS goals (
        id INTEGER PRIMARY KEY NOT NULL,
        goal TEXT NOT NULL
      )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          //error callback
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insertGoal(goal) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO goals (goal) VALUES (?)`,
        [goal],
        (_, result) => {
          resolve(result);
        },
        (_, err) => reject(err)
      );
    });
  });
}

export function deleteGoal(goalId) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM goals WHERE id=?`,
        [goalId],
        (_, result) => {
          resolve(result);
        },
        (_, err) => reject(err)
      );
    });
  });
}

export function fetchGoals() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM goals",
        [],
        (_, result) => {
          const goals = [];
          for (const gl of result.rows._array) {
            goals.push(new Goal(gl.id, gl.goal));
          }
          resolve(goals);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
}
