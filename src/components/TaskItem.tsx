// components/TaskItem.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
} from "react-native";
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
import { taskPriority, taskTypes } from "../constant/types";

const TaskItem = ({
  task,
  handleEditTask,
  handleToggleCompletion,
  handleDeleteTask,
  handleOpenTask,
}) => {
  const [open, setOpen] = useState(true);
  const [slideAnim, setSlideAnim] = useState(new Animated.Value(0));
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));
  const extendTask = () => {
    // Will change slideAnim value to 1 in 5 seconds
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true, // Add This line
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const shrinkTask = () => {
    // Will change slideAnim value to 1 in 5 seconds

    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true, // Add This line
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
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
  const priorityAtt = (id) => {
    switch (id) {
      case 0:
        return "#62F95C";
      case 1:
        return "#E7D200";
      case 2:
        return "#F44336";
      default:
        return "black";
    }
  };
  return (
    <View
      style={[
        {
          borderColor: task.statusBg,
          borderWidth: 0,
          flexDirection: "column",
          padding: 0,
        },
      ]}
    >
      <View
        style={[
          styles.taskItem,
          {
            borderColor: task.statusBg,
            borderWidth: 1,
            flexDirection: "column",
            flex: 1,
            elevation: 0,
            borderBottomWidth: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            marginBottom: 0,
          },
        ]}
      >
        <View
          style={[
            {
              flexDirection: "row",
              flex: 1,
              height: 200 * HEIGHT_SCALE_RATIO,
            },
          ]}
        >
          <View style={styles.taskTextContainer}>
            <Text
              style={[
                styles.taskText,
                task.status === "Completed" && styles.completedTaskText,
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.taskDescription}>Title: </Text>
                <TextInput
                  style={[{ borderWidth: 0, color: "black" }]}
                  placeholder="Title"
                  value={task.title}
                  editable={false}
                />
              </View>
            </Text>

            <Text
              style={[
                { color: priorityAtt(taskPriority.indexOf(task.priority)) },
              ]}
            >
              Priority: {task.priority}
            </Text>
            {
              <Animated.View style={{ opacity: fadeAnim }}>
                <Text style={styles.taskDeadline}>
                  Deadline: {task.deadline}
                </Text>
                <Text style={styles.taskCreatedAt}>
                  Created: {task.createdAt}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.taskDescription}>Description: </Text>
                  <TextInput
                    style={[{ borderWidth: 0, color: "black" }]}
                    placeholder="Description"
                    value={task.description}
                    editable={false}
                  />
                </View>
              </Animated.View>
            }
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
      </View>
      <Animated.View
        style={[
          {
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -120 * WIDTH_SCALE_RATIO], // 0 : 150, 0.5 : 75, 1 : 0
                }),
              },
            ],
          },
          styles.taskItem,
          {
            borderColor: task.statusBg,
            borderWidth: 1,
            flexDirection: "column",
            flex: 1,
            elevation: 0,
            borderTopWidth: 0,
            marginTop: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
        ]}
      >
        <View
          style={[
            styles.buttonContainer,
            { marginTop: 30 * HEIGHT_SCALE_RATIO },
          ]}
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
        <TouchableOpacity
          onPress={() => {
            if (open) shrinkTask();
            else extendTask();
            setOpen(!open);
          }}
        >
          <Icon
            type="Feather"
            name={!open ? "arrow-drop-down" : "arrow-drop-up"}
            size={20 * WIDTH_SCALE_RATIO}
            style={fixIcon(true)}
            color={"black"}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
const optionMenuOption = {
  optionTouchable: {
    activeOpacity: 0.7,
  },
};
export default TaskItem;
