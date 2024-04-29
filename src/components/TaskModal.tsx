// components/TaskModal.js
import React from "react";
import { View, Text, TextInput, Modal, ScrollView } from "react-native";
import DatePicker from "react-native-modern-datepicker";
import styles, {
  FS,
  HEIGHT_SCALE_RATIO,
  WIDTH_SCALE_RATIO,
  fixIcon,
} from "../constant/styles";
import { Button, Icon } from "react-native-elements";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";
import { taskPriority, taskTypes } from "../constant/types";

const TaskModal = ({
  modalVisible,
  task,
  setTask,
  handleAddTask,
  handleCancel,
  validationError,
}) => {
  const renderOptions = (item: any) => {
    return (
      <MenuOption
        onSelect={async () => {
          console.log("set task", item);
          setTask({
            ...task,
            priority: item,
          });
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
            {item}
          </Text>
        </View>
      </MenuOption>
    );
  };
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={false}>
      {/* Container for the modal */}
      <ScrollView style={styles.modalContainer}>
        <Text style={styles.inputLabel}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={task.title}
          onChangeText={(text) => setTask({ ...task, title: text })}

          // Update the title when text changes
        />
        <Text style={styles.inputLabel}>Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={task.description}
          onChangeText={(text) =>
            setTask({
              ...task,
              description: text,
            })
          }
        />
        <MenuProvider
          style={{
            borderRadius: 12 * WIDTH_SCALE_RATIO,
          }}
        >
          <Menu>
            <MenuTrigger
              style={{
                borderWidth: 2,
                borderRadius: 12 * WIDTH_SCALE_RATIO,
                justifyContent: "center",
                alignItems: "center",
                overflow: "visible",
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
                      color: "black",
                    },
                  ]}
                >
                  {task.priority ? task.priority : taskPriority[0]}
                </Text>
                <Icon
                  type="Feather"
                  name="arrow-drop-down"
                  size={20 * WIDTH_SCALE_RATIO}
                  style={fixIcon(true)}
                  color={"black"}
                />
              </View>
            </MenuTrigger>

            <MenuOptions customStyles={optionMenuOption}>
              <ScrollView style={{ height: 50 * HEIGHT_SCALE_RATIO }}>
                {taskPriority.map((item) => {
                  return renderOptions(item);
                })}
              </ScrollView>
            </MenuOptions>
          </Menu>
        </MenuProvider>
        <Text style={styles.inputLabel}>Deadline:</Text>
        <DatePicker
          style={[
            styles.datePicker,
            {
              borderRadius: 16 * WIDTH_SCALE_RATIO,
              borderWidth: 0.5,
              elevation: 1,
            },
          ]}
          mode="date"
          selected={task.deadline}
          onDateChange={(date) => setTask({ ...task, deadline: date })}
        />

        {validationError && (
          <Text style={styles.errorText}>
            Please fill in all fields correctly.
          </Text>
        )}
        <Button
          containerStyle={{
            marginTop: 10 * HEIGHT_SCALE_RATIO,
          }}
          buttonStyle={{
            backgroundColor: "#07FCF1",
            borderRadius: 16 * WIDTH_SCALE_RATIO,
          }}
          title={task.id ? "Update" : "Add"}
          onPress={handleAddTask}
        />

        <Button
          containerStyle={{
            marginTop: 10 * HEIGHT_SCALE_RATIO,
          }}
          buttonStyle={{
            backgroundColor: "#FC074E",
            borderRadius: 16 * WIDTH_SCALE_RATIO,
          }}
          title="Cancel"
          onPress={handleCancel}
        />
      </ScrollView>
    </Modal>
  );
};
const optionMenuOption = {
  optionTouchable: {
    activeOpacity: 0.7,
  },
};
export default TaskModal;
