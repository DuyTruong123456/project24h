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
import { TabBar, TabView } from "react-native-tab-view";
import { taskTypes } from "../constant/types";

const TaskItem = ({
  task,
  handleEditTask,
  handleToggleCompletion,
  handleDeleteTask,
}) => {
  const renderCalendar = (item: any) => {
    const { status } = item;
    return (
      <MenuOption
        onSelect={async () => {
          handleToggleCompletion(task.id, item.status);
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
            {status}
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
          borderColor: task.statusBg,
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
                backgroundColor: task.statusBg,
                borderRadius: 12 * WIDTH_SCALE_RATIO,
                justifyContent: "center",
                alignItems: "center",
                overflow: "visible",
                borderColor: task.statusBd,
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
                  {task.status}
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
                {taskTypes.map((item) => {
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
            console.log(task.status);
            let newIndex = taskTypes.findIndex(
              (item) => item.status === task.status
            );
            if (newIndex === taskTypes.length || newIndex === -1) {
              newIndex = 0;
            } else newIndex = newIndex + 1;
            handleToggleCompletion(task.id, taskTypes[newIndex].status);
          }}
          style={[styles.editButton, { marginTop: 10 * HEIGHT_SCALE_RATIO }]}
        >
          <Text style={styles.buttonText}>{task.btnLabel}</Text>
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
