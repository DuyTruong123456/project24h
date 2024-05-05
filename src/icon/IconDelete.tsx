import React, { memo } from "react";
import { Path, Svg } from "react-native-svg";
import { HEIGHT_SCALE_RATIO, WIDTH_SCALE_RATIO } from "../constant/styles";
interface Props {
  height?: number;
  width?: number;
  color?: string;
}

const IconDelete = (props: Props) => {
  const { height, width, color } = props;
  return (
    <Svg
      height={height || 20 * HEIGHT_SCALE_RATIO}
      width={width || 20 * WIDTH_SCALE_RATIO}
      viewBox="0 0 14 16"
      fill="none"
    >
      <Path
        d="M2.33333 5.32V12.52C2.33333 14.1106 3.52724 15.4 5 15.4H9C10.4728 15.4 11.6667 14.1106 11.6667 12.52V5.32M8.33333 7.48V11.8M5.66667 7.48L5.66667 11.8M9.66667 3.16L8.72916 1.64123C8.48187 1.24063 8.06556 1 7.61975 1H6.38025C5.93444 1 5.51813 1.24063 5.27084 1.64123L4.33333 3.16M9.66667 3.16H4.33333M9.66667 3.16H13M4.33333 3.16H1"
        stroke={color || "#FF3B30"}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default memo(IconDelete);
