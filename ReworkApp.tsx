// App.js

// Import necessary modules and components
import React, { useEffect, useState } from "react";
import {
  Animated,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles, {
  FS,
  HEIGHT_SCALE_RATIO,
  WIDTH_SCALE_RATIO,
  fixIcon,
} from "./src/constant/styles";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";
import { taskPriority } from "./src/constant/types";
import { Icon } from "react-native-elements";
import TaskItemV2 from "./src/components/TaskItemV2";

const ReworkApp = () => {
  const [currentId, setCurrentId] = useState(3);
  const [sampleData, updateSampleData] = useState([
    {
      id: 0,
      title: "Task 1",
      date: "06/06/2006",
      expiredDate: "2 ngày",
      priority: taskPriority[0],
    },
    {
      id: 1,
      title: "Task 2",
      date: "06/06/2006",
      expiredDate: "2 ngày",
      priority: taskPriority[2],
    },
    {
      id: 2,
      title: "Task 0",
      date: "06/06/2006",
      expiredDate: "2 ngày",
      priority: taskPriority[1],
    },
  ]);
  const deleteTask = (id) => {
    console.log("delete");
    updateSampleData((sampleData) => {
      let newData = sampleData.filter((item) => item.id !== id);
      return newData;
    });
  };
  const addTask = (task) => {
    updateSampleData([...sampleData, task]);
    setCurrentId(currentId + 1);
  };
  const updateTask = (id, task) => {
    updateSampleData((sampleData) => {
      console.log("task", JSON.stringify(task, null, 2));
      let newData = sampleData;
      newData.map((item) => {
        if (item.id === id) {
          item.id = task.id;
          item.date = task.date;
          item.priority = task.priority;
          item.title = task.title;
        }
      });
      return sortedData(newData);
    });
  };

  let sortedData = (data) => {
    data.sort((a, b) => {
      let index2 = taskPriority.indexOf(a.priority);
      let index1 = taskPriority.indexOf(b.priority);
      return index1 == -1 ? 1 : index2 == -1 ? -1 : index1 - index2;
    });
    return data;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F2C94C" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 100 * HEIGHT_SCALE_RATIO,
        }}
      >
        <Text style={{ fontSize: FS(20), color: "white" }}>To-do list</Text>
      </View>
      <FlatList
        style={{
          paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
        }}
        data={sortedData(sampleData)}
        renderItem={(item) => {
          return (
            <TaskItemV2
              editTask={updateTask}
              deleteTask={deleteTask}
              task={item}
            />
          );
        }}
      />
      <View
        style={{
          paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
          height: 100 * HEIGHT_SCALE_RATIO,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            addTask({
              id: currentId,
              title: "Task " + currentId,
              date: "06/06/2006",
              expiredDate: "2 ngày",
              priority: taskPriority[0],
            });
          }}
          style={{
            backgroundColor: "#ff416c",
            paddingHorizontal: 20 * WIDTH_SCALE_RATIO,
            paddingVertical: 4 * HEIGHT_SCALE_RATIO,
            height: 50 * HEIGHT_SCALE_RATIO,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontSize: FS(20) }}
          >
            Tạo task mới +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Export the App component as the default export
export default ReworkApp;
