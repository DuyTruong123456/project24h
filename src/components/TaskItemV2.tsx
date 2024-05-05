import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from "../constant/styles";
import { useEffect, useState } from "react";
import { taskPriority } from "../constant/types";
import IconDelete from "../icon/IconDelete";
import { Icon } from "react-native-elements";
interface TaskItemProps {
  task: any;
  deleteTask: (id: any) => void;
  editTask: (id: any, task: any) => void;
}
const TaskItemV2: React.FC<TaskItemProps> = (props) => {
  const { deleteTask, editTask } = props;
  const { id, title, date, expiredDate, priority } = props.task.item;
  const [open, setOpen] = useState(false);
  const [slideAnim, setSlideAnim] = useState(new Animated.Value(1));
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
  const [fadeAnim2, setFadeAnim2] = useState(new Animated.Value(1));
  const [taskTitle, setTitle] = useState(title);
  const [taskDeadline, setTaskDeadline] = useState(date);
  const [currentPriority, setCurrentPriority] = useState(priority);
  useEffect(() => {
    console.log("props.task", JSON.stringify(props.task, null, 2));
  }, []);

  const extendTask = () => {
    // Will change slideAnim value to 1 in 5 seconds
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false, // Add This line
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(fadeAnim2, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const shrinkTask = () => {
    // Will change slideAnim value to 1 in 5 seconds

    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false, // Add This line
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(fadeAnim2, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const priorityAtt = (id) => {
    switch (id) {
      case taskPriority[0]:
        return "#62F95C";
      case taskPriority[1]:
        return "#E7D200";
      case taskPriority[2]:
        return "#F44336";
      default:
        return "black";
    }
  };
  return (
    <Animated.View
      style={[
        {
          height: slideAnim?.interpolate({
            inputRange: [0, 1],
            outputRange: [300 * HEIGHT_SCALE_RATIO, 150 * HEIGHT_SCALE_RATIO], // 0 : 150, 0.5 : 75, 1 : 0
          }),
        },
        {
          backgroundColor: "white",
          borderRadius: 10,
          borderWidth: 0,
          paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
          paddingVertical: 16 * HEIGHT_SCALE_RATIO,
          marginTop: 10 * HEIGHT_SCALE_RATIO,
        },
      ]}
    >
      <Animated.View
        style={{
          position: "absolute",

          top: 20 * HEIGHT_SCALE_RATIO,
          right: 20 * WIDTH_SCALE_RATIO,
          opacity: fadeAnim,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 30 * HEIGHT_SCALE_RATIO,
            width: 60 * WIDTH_SCALE_RATIO,
          }}
          onPress={
            open
              ? () => {
                  deleteTask(id);
                }
              : () => {
                  console.log("test");
                }
          }
        >
          <IconDelete color={"black"} />
          <Text>Xóa</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          flexDirection: "row",
          top: 20 * HEIGHT_SCALE_RATIO,
          right: 20 * WIDTH_SCALE_RATIO,
          opacity: fadeAnim2,
        }}
      >
        <TouchableOpacity
          onPress={
            !open
              ? () => {
                  extendTask();
                  setOpen(!open);
                }
              : () => {}
          }
        >
          <Icon type="material-community" name="pencil" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 20 * WIDTH_SCALE_RATIO,
          position: "absolute",
          top: slideAnim?.interpolate({
            inputRange: [0, 1],
            outputRange: [30 * HEIGHT_SCALE_RATIO, 15 * HEIGHT_SCALE_RATIO], // 0 : 150, 0.5 : 75, 1 : 0
          }),
          left: slideAnim?.interpolate({
            inputRange: [0, 1],
            outputRange: [16 * WIDTH_SCALE_RATIO, 32 * WIDTH_SCALE_RATIO], // 0 : 150, 0.5 : 75, 1 : 0
          }),
        }}
      >
        <Animated.View
          style={{
            width: 20 * WIDTH_SCALE_RATIO,
            height: 20 * WIDTH_SCALE_RATIO,
            backgroundColor: "#aaaaaa",
            borderRadius: 3,
            opacity: fadeAnim2,
          }}
        ></Animated.View>
        <TextInput
          onChangeText={(text) => {
            setTitle(text);
          }}
          editable={open}
          style={[
            {
              borderWidth: 0,
              borderBottomWidth: open ? 1 : 0,
              width: !open ? undefined : 50 * WIDTH_SCALE_RATIO,
              flex: !open ? undefined : 1,
              color: "black",
            },
          ]}
          placeholder="Title"
          value={taskTitle}
        />
      </Animated.View>
      <Animated.View
        style={{
          flexDirection: "row",
          alignItems: "center",
          opacity: fadeAnim2,
          flex: 1,
          justifyContent: "space-between",
          position: "absolute",
          top: 50 * HEIGHT_SCALE_RATIO,
          left: 16 * WIDTH_SCALE_RATIO,
          right: 16 * WIDTH_SCALE_RATIO,
        }}
      >
        <Text style={{ color: "red" }}>
          ưu tiên:{" "}
          <Text style={{ color: priorityAtt(priority) }}>{priority}</Text>
        </Text>
        <Text style={{ color: "red" }}>Còn lại: {expiredDate}</Text>
      </Animated.View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20 * WIDTH_SCALE_RATIO,
          marginTop: 60 * HEIGHT_SCALE_RATIO,
        }}
      >
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            opacity: fadeAnim,
          }}
        >
          <TextInput
            onChangeText={(text) => {
              setTaskDeadline(text);
            }}
            style={[
              {
                borderWidth: 0,
                borderBottomWidth: 1,
                flex: 1,
                color: "black",
              },
            ]}
            placeholder="Title"
            value={taskDeadline}
          />
        </Animated.View>
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            opacity: fadeAnim,
          }}
        >
          <TextInput
            onChangeText={(text) => {
              setCurrentPriority(text);
            }}
            style={[
              {
                borderWidth: 0,
                borderBottomWidth: 1,
                flex: 1,
                color: "black",
              },
            ]}
            placeholder="Title"
            value={currentPriority}
          />
        </Animated.View>
      </View>
      {open && (
        <View style={{ paddingHorizontal: 100 * WIDTH_SCALE_RATIO }}>
          <TouchableOpacity
            onPress={() => {
              console.log("hi");
              shrinkTask();

              setOpen(!open);
              editTask(id, {
                id: id,
                title: taskTitle,
                date: taskDeadline,
                expiredDate: "2 ngày",
                priority: currentPriority,
              });
            }}
            style={{
              backgroundColor: "#3BB54A",
              paddingHorizontal: 20 * WIDTH_SCALE_RATIO,
              paddingVertical: 4 * HEIGHT_SCALE_RATIO,
              borderRadius: 16,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Xong</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};
export default TaskItemV2;
