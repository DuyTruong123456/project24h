// styles.js

import {
  Dimensions,
  PixelRatio,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";

export const WIDTH = Dimensions.get("window").width;
export const HEIGHT = Dimensions.get("window").height;
export const HEIGHT_MODAL = Math.max(
  Dimensions.get("window").height,
  Dimensions.get("screen").height
);

export const IS_ANDROID = Platform.OS === "android";
export const IS_IOS = Platform.OS === "ios";
export const STATUS_BAR_ANDROID_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight : 0;

// Use iPhone6 as base size which is 375 x 667
const baseWidth = 398;
const baseHeight = 736;

///screen scale
export const WIDTH_SCALE_RATIO = Math.min(
  Dimensions.get("window").width / baseWidth,
  Dimensions.get("window").height / baseHeight
);
export const HEIGHT_SCALE_RATIO = Dimensions.get("window").height / baseHeight;
export const PAGING_LIMIT = 5;

export const headerHeight = 56 * HEIGHT_SCALE_RATIO;
export const iconSize = 24 * WIDTH_SCALE_RATIO;
export const heightBottomBar = 69 * HEIGHT_SCALE_RATIO;
export const textInputHeight = 36 * HEIGHT_SCALE_RATIO;

export const heightCarouselSpotAccomodation = 160 * HEIGHT_SCALE_RATIO;
export const heightCarouselBlog = 188 * HEIGHT_SCALE_RATIO;
export const heightCarouselSpot = 120 * HEIGHT_SCALE_RATIO;
/*
        Returns the device pixel density. Some examples:
            PixelRatio.get() === 1
            mdpi Android devices (160 dpi)
            PixelRatio.get() === 1.5
            hdpi Android devices (240 dpi)
            PixelRatio.get() === 2
            iPhone 4, 4S
            iPhone 5, 5c, 5s
            iPhone 6
            xhdpi Android devices (320 dpi)
            PixelRatio.get() === 3
            iPhone 6 plus
            xxhdpi Android devices (480 dpi)
            PixelRatio.get() === 3.5
            Nexus 6
*/
export const fontSize =
  PixelRatio.get() <= 1.5
    ? 14
    : PixelRatio.get() > 1.5 && PixelRatio.get() < 3
    ? 15
    : 16;
//font scale
const scale = Math.min(WIDTH_SCALE_RATIO, HEIGHT_SCALE_RATIO);
export const FS = (size = fontSize) => Math.ceil(size * scale);
export const fixIcon = (isText = false) => {
  return isText
    ? { marginBottom: IS_IOS ? -3 * WIDTH_SCALE_RATIO : -3 * WIDTH_SCALE_RATIO }
    : {
        marginBottom: IS_IOS ? -3 * WIDTH_SCALE_RATIO : -1 * WIDTH_SCALE_RATIO,
      };
};

export const ptColor = {
  none: "none",
  greenSuccess: "#3BB54A",
  blue: "#0A8FD8",
  yellow: "#F3C74D",
  warning: "#FA791C",
  stroke: "#D6DFE3",
  gray6: "#F2F2F2",
  grayblue: "6699CC",
  appColor: "#0A8FD8",
  appColor2: "#0070C3",
  appColorHover: "#aaaaaa",
  textColor: "#032E42",
  textPlaceholderColor: "#aaaaaa",
  textSubColor: "#828282",
  borderColor: "#828282",
  borderColor2: "#aaaaaa",
  appDisableButtonColor: "rgba(227, 227, 227, 1)",
  appDisableTextColor: "rgba(161, 165, 176, 1)",
  PRIMARY: "#d73232",
  PLACEHOLDER: "#fafafa",
  DIVIDER: "#aaaaaa",
  evergreen: "#052d32",
  black: "#222222",
  brown_grey: "#aaaaaa",
  dark_aqua: "#06576a",
  reddish: "rgba(255, 29, 29, 1)",
  error: "rgba(255, 59, 48, 1)",
  white: "#ffffff",
  noWhite: "#f5f5f5",
  brownish_grey: "#666666",
  brown_grey_two: "#999999",
  greyblue: "#5ab4be",
  evergreen_two: "#022222",
  black_two: "#333333",
  backdropColor: "#00000020",
  transparent: "transparent",
  lineGradientBlue: ["#2797D6", "#2797D6"],
  lineGradientRed: ["#ff416c", "#ff4b2b"],
  lineGradientGreen: ["#D8C04A", "#8DB933"],
  gray8: "#D6DFE3",
  gray4: "#e3e3e3",
  wifi_good: "#53c31b",
  wifi_poor: "#fa9d1c",
  wifi_bad: "#f5212d",
  pink: "#EA35CD",
  bg: "rgba(247, 247, 247, 1)",
  fadeText: "rgba(180, 180, 180, 1)",
  orange: "orange",
  userTextLinearGradientBlue: ["#4FC8ED", "#2797D6"],
  lineGradienPlaceholder: ["#7B8794", "#7B8794", "#7B8794"],
  lineGradientHeader: ["#0090DF", "#0090DF", "#01B5F2"],
  lineGradientWhite: ["#ffffff", "#ffffff"],
  lineGradientblack: [
    "rgba(225, 225, 225, 0.01)",
    "rgba(225, 225, 225, 0.03)",
    "rgba(0, 0, 0, 0.5)",
    "rgba(0, 0, 0, 0.8)",
  ],
  btnDisabled: "rgba(203, 210, 217, 1)",
  lineGradientApp: ["rgba(0, 234, 255, 1)", "rgba(60, 140, 231, 1)"],
  UMCtextColor: "#12263F",
  NotiTitle: "rgba(12, 26, 67, 1)",
  online: "#3BB54A",
  offline: "#D0D0D0",
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 1,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  completedTaskText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  taskDescription: {
    fontSize: 16,
    color: "#666",
  },
  taskTime: {
    fontSize: 14,
    color: "#666",
  },
  taskStatus: {
    fontSize: 16,
    color: "#666",
  },
  buttonContainer: {
    // Or 'row' depending on your layout
    flexDirection: "row",
    // Adjust the value as needed for the
    // desired spacing
    marginVertical: 2,
  },

  editButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    width: 100 * WIDTH_SCALE_RATIO,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginBottom: 10,
  },
  completeButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    width: 110,
  },
  completedButton: {
    backgroundColor: "#808080",
  },
  buttonText: {
    color: "#fff",
    fontSize: FS(16),
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#FF9500",
    borderRadius: 5,
    padding: 10,
    width: 110,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 16,
    marginBottom: 10,
  },
  taskDeadline: {
    color: "#FF3B12",
  },
  taskCreatedAt: {
    color: "#5497FF",
  },
});

export default styles;
