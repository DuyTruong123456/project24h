// components/TaskModal.js
import React from "react";
import { View, Text, TextInput, Modal } from "react-native";
import DatePicker from "react-native-modern-datepicker";
import styles, {
  HEIGHT_SCALE_RATIO,
  WIDTH_SCALE_RATIO,
} from "../constant/styles";
import { Button } from "react-native-elements";

const TaskModal = ({
  modalVisible,
  task,
  setTask,
  handleAddTask,
  handleCancel,
  validationError,
}) => {
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={false}>
      {/* Container for the modal */}
      <View style={styles.modalContainer}>
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
      </View>
    </Modal>
  );
};

export default TaskModal;
