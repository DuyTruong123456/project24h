// App.js

// Import necessary modules and components
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Button } from "react-native";

// Import TaskList component

// Import TaskModal component
import styles, {
  FS,
  HEIGHT_SCALE_RATIO,
  WIDTH,
  WIDTH_SCALE_RATIO,
} from "./src/constant/styles";
import TaskList from "./src/components/TaskList";
import TaskModal from "./src/components/TaskModal";
import { TabBar, TabView } from "react-native-tab-view";
import { taskPriority, taskTypes } from "./src/constant/types";
import storage from "./src/components/storage";
import configureStore from "./src/store";
// Define the main App component
const App = () => {
  // Define state variables
  // Array to store tasks
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(taskTypes[0]);

  // Task object for creating/editing tasks

  // Modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Task being edited
  const [editingTask, setEditingTask] = useState(null);
  const [validationError, setValidationError] = useState(false); // Validation flag

  // Function to add a new task or update an existing task
  const handleSetTask = async (taskList: any) => {
    console.log("add");
    await storage.save({
      key: "task", // Note: Do not use underscore("_") in key!
      data: taskList,
      expires: null,
    });
    handleGetTask();
  };
  const handleGetTask = () => {
    storage
      .load({
        key: "task",

        autoSync: true,

        syncInBackground: true,

        syncParams: {
          extraFetchOptions: {},
          someFlag: true,
        },
      })
      .then((ret) => {
        // found data go to then()
        console.log("ret", JSON.stringify(ret, null, 2));
        setTasks(ret);
      })
      .catch((err) => {
        // any exception including data not found
        // goes to catch()
        console.warn(err.message);
        switch (err.name) {
          case "NotFoundError":
            // TODO;
            break;
          case "ExpiredError":
            // TODO
            break;
        }
      });
  };
  useEffect(() => {
    handleGetTask();
  }, []);

  const handleAddTask = () => {
    if (task.title.trim() !== "" && task.deadline !== "") {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();

      if (editingTask) {
        // If editing an existing task, update it
        const updatedTasks = tasks.map((t) =>
          t.id === editingTask.id ? { ...t, ...task } : t
        );
        setTasks((task) => {
          handleSetTask(updatedTasks);
          return updatedTasks;
        });
        setEditingTask(null);
      } else {
        // If adding a new task, create it
        const newTask = {
          id: Date.now(),
          ...task,

          // Set the creation date and time as a string
          createdAt: formattedDate,
        };
        setTasks((task) => {
          handleSetTask([...tasks, newTask]);
          return [...tasks, newTask];
        });
      }

      // Clear the task input fields and reset state
      setTask(taskTypes[0]);
      // Close the modal
      setModalVisible(false);

      // Reset validation error
      setValidationError(false);
    } else {
      // Show validation error if fields are not filled
      setValidationError(true);
    }
  };

  // Function to handle task editing
  const handleEditTask = (task) => {
    // Set the task being edited
    setEditingTask(task);

    // Pre-fill the input with task data
    setTask(task);
    // Open the modal for editing
    setModalVisible(true);
  };
  // Function to delete all done task
  const handleDeleteAllDoneTask = () => {
    const updatedTasks = tasks.filter((t) => t.status !== "Completed");
    setTasks(() => {
      handleSetTask(updatedTasks);
      return updatedTasks;
    });
  };
  // Function to delete a task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(() => {
      handleSetTask(updatedTasks);
      return updatedTasks;
    });
  };

  // Function to toggle task completion status
  const handleToggleCompletion = (taskId, status) => {
    let newIndex = taskTypes.findIndex((task) => task.status === status);
    if (newIndex === taskTypes.length || newIndex === -1) {
      newIndex = 0;
    }
    const updatedTasks = tasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            status: status,
            statusBg: taskTypes[newIndex].statusBg,
            statusBd: taskTypes[newIndex].statusBd,
            btnLabel: taskTypes[newIndex].btnLabel,
            key: taskTypes[newIndex].key,
          }
        : t
    );
    setTasks(() => {
      handleSetTask(updatedTasks);
      return updatedTasks;
    });
  };
  const testdata = [
    {
      id: 0,
      status: "Incomplete",
      key: "incomplete",
    },
    {
      id: 1,
      status: "In-progress",
      key: "inprogress",
    },
    {
      id: 2,
      status: "Completed",
      key: "completed",
    },
  ];
  const renderTaskList = (taskToRender: any[]) => {
    const sorted = taskToRender.sort((a, b) => {
      let index2 = taskPriority.indexOf(a.priority);
      let index1 = taskPriority.indexOf(b.priority);
      return index1 == -1 ? 1 : index2 == -1 ? -1 : index1 - index2;
    });
    return (
      <TaskList
        tasks={taskToRender}
        handleEditTask={handleEditTask}
        handleToggleCompletion={handleToggleCompletion}
        handleDeleteTask={handleDeleteTask}
      />
    );
  };
  return (
    <>
      <Text
        style={[
          styles.title,
          {
            backgroundColor: "#4FC8ED",
            borderBottomLeftRadius: 30 * WIDTH_SCALE_RATIO,
            borderBottomRightRadius: 30 * WIDTH_SCALE_RATIO,
          },
        ]}
      >
        Task Manager
      </Text>
      <View style={styles.container}>
        <TabView
          swipeEnabled={false}
          keyboardDismissMode="on-drag"
          navigationState={{ index: selectedIndex, routes: testdata }}
          renderScene={({ route }) => {
            let taskToRender = tasks.filter((task) => {
              return task.status === route.status;
            });
            return renderTaskList(taskToRender);
          }}
          onIndexChange={(index) => {
            setSelectedIndex(index);
          }}
          renderTabBar={(props) => (
            <TabBar
              scrollEnabled={true}
              style={{
                shadowOffset: { height: 0, width: 0 },
                shadowColor: "transparent",
                shadowOpacity: 0,
                elevation: 0,
                backgroundColor: "transparent",
                justifyContent: "space-between",
              }}
              pressColor="white"
              activeColor={"white"}
              inactiveColor={"#032E42"}
              tabStyle={{
                width: testdata.length > 0 ? "auto" : undefined,
                paddingHorizontal: 4,
                // margin: 4,
              }}
              renderLabel={({ route, focused }) => {
                let taskToRender = tasks.filter((task) => {
                  return task.status === route.status;
                });
                return (
                  <View
                    style={{
                      backgroundColor: focused
                        ? "#0A8FD8"
                        : "rgba(236, 236, 236, 1)",
                      borderRadius: 30,
                      height: 36 * HEIGHT_SCALE_RATIO,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
                      flexDirection: "row",

                      width: WIDTH / 3,
                    }}
                  >
                    <Text
                      style={[
                        {
                          fontSize: FS(14),
                          marginTop: 1,
                          color: focused ? "white" : "#032E42",
                          alignSelf: "center",
                          textAlign: "center",
                        },
                      ]}
                    >
                      {`${route.status}(${taskToRender.length})`}
                    </Text>
                  </View>
                );
              }}
              indicatorStyle={{
                backgroundColor: "transparent",
              }}
              // scrollEnabled={true}
              {...props}
            />
          )}
        />
        {/* Render the TaskList component */}
        <TaskModal
          modalVisible={modalVisible}
          task={task}
          setTask={setTask}
          handleAddTask={handleAddTask}
          handleCancel={() => {
            setEditingTask(null);
            setTask(taskTypes[1]);
            setModalVisible(false);
            setValidationError(false);
          }}
          validationError={validationError}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            handleDeleteAllDoneTask();
          }}
        >
          <Text style={styles.addButtonText}>{"Delete All Done"}</Text>
        </TouchableOpacity>

        {/* Button to add or edit tasks */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setEditingTask(null);
            setTask(taskTypes[0]);
            setModalVisible(true);
            setValidationError(false);
          }}
        >
          <Text style={styles.addButtonText}>
            {editingTask ? "Edit Task" : "Add Task"}
          </Text>
        </TouchableOpacity>
        {/* Render the TaskModal component */}
      </View>
    </>
  );
};

// Export the App component as the default export
export default App;
