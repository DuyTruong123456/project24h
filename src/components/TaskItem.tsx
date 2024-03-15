// components/TaskItem.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles, {
  FS,
  HEIGHT_SCALE_RATIO,
  WIDTH_SCALE_RATIO,
  fixIcon,
} from "../constant/styles";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";
import ScrollViewIndicator from "react-native-scroll-indicator";
import { Icon } from "react-native-elements";

const TaskItem = ({
  task,
  handleEditTask,
  handleToggleCompletion,
  handleDeleteTask,
}) => {
  const testdata = [
    {
      id: 0,
      label: "Incomplete",
      statusBg: "#f7a59c",
      statusBd: "#F44336",
      btnLabel: "Start",
    },
    {
      id: 1,
      label: "In-progress",
      statusBg: "#F9EF5C",
      statusBd: "#E7D200",
      btnLabel: "Resolve",
    },
    {
      id: 2,
      label: "Completed",
      statusBg: "#62F95C",
      statusBd: "#0C4A09",
      btnLabel: "Reopen",
    },
  ];
  const [status, setStatus] = useState(testdata[0]);
  const renderCalendar = (item: any) => {
    const { label } = item;
    return (
      <MenuOption
        onSelect={async () => {
          setStatus(item);
          handleToggleCompletion(task.id, item.label);
        }}
      >
        <View
          style={{
            borderBottomWidth: 0.5,
            borderColor: "#D6D6D6",
            height: 40 * HEIGHT_SCALE_RATIO,
          }}
        >
          <Text
            style={{
              fontSize: FS(16),
            }}
          >
            {label}
          </Text>
        </View>
      </MenuOption>
    );
  };

  return (
    <View
      style={[
        styles.taskItem,
        {
          borderColor: status.statusBg,
          borderWidth: 1,
          flexDirection: "column",
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          height: 200 * HEIGHT_SCALE_RATIO,
        }}
      >
        <View style={styles.taskTextContainer}>
          <Text
            style={[
              styles.taskText,
              task.status === "Completed" && styles.completedTaskText,
            ]}
          >
            Title: {task.title}
          </Text>
          <Text style={styles.taskDescription}>
            Description: {task.description}
          </Text>
          <Text style={styles.taskStatus}>Status: {task.status}</Text>
          <Text style={styles.taskDeadline}>Deadline: {task.deadline}</Text>
          <Text style={styles.taskCreatedAt}>Created: {task.createdAt}</Text>
        </View>
        <MenuProvider style={{ borderRadius: 12 * WIDTH_SCALE_RATIO }}>
          <Menu
            style={{
              maxHeight: 250 * HEIGHT_SCALE_RATIO,
            }}
          >
            <MenuTrigger
              style={{
                borderWidth: 2,
                backgroundColor: status.statusBg,
                borderRadius: 12 * WIDTH_SCALE_RATIO,
                justifyContent: "center",
                alignItems: "center",
                overflow: "visible",
                borderColor: status.statusBd,
                minHeight: 50 * HEIGHT_SCALE_RATIO,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      fontSize: FS(17),
                    },
                  ]}
                >
                  {status.label}
                </Text>
                <Icon
                  type="Feather"
                  name="arrow-drop-down"
                  size={20 * WIDTH_SCALE_RATIO}
                  style={fixIcon(true)}
                  color={"white"}
                />
              </View>
            </MenuTrigger>

            <MenuOptions customStyles={optionMenuOption}>
              <ScrollView
                style={{
                  borderRadius: 12 * WIDTH_SCALE_RATIO,
                  height: 200 * HEIGHT_SCALE_RATIO,
                  borderWidth: 1,
                }}
              >
                {testdata.map((item) => {
                  return renderCalendar(item);
                })}
              </ScrollView>
            </MenuOptions>
          </Menu>
        </MenuProvider>
      </View>
      <View
        style={[styles.buttonContainer, { marginTop: 30 * HEIGHT_SCALE_RATIO }]}
      >
        <TouchableOpacity
          onPress={() => {
            setStatus((status) => {
              let newIndex = testdata.findIndex(
                (item) => item.id === status.id
              );
              if (newIndex === testdata.length - 1 || newIndex === -1)
                newIndex = 0;
              else newIndex = newIndex + 1;
              handleToggleCompletion(task.id, testdata[newIndex].label);
              console.log(newIndex, testdata.length);
              return testdata[newIndex];
            });
          }}
          style={[styles.editButton, { marginTop: 10 * HEIGHT_SCALE_RATIO }]}
        >
          <Text style={styles.buttonText}>{status.btnLabel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleEditTask(task)}
          style={[
            styles.editButton,
            {
              marginTop: 10 * HEIGHT_SCALE_RATIO,
              backgroundColor: "#E7D200",
            },
          ]}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDeleteTask(task.id)}
          style={[
            styles.deleteButton,
            {
              marginTop: 10 * HEIGHT_SCALE_RATIO,
              backgroundColor: "#F44336",
            },
          ]}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const optionMenuOption = {
  optionTouchable: {
    activeOpacity: 0.7,
  },
};
export default TaskItem;
