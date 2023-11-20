import React, { useState } from "react";
import { TextInput, View, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { MyInputProps } from "../../types";

export default function MyInput({
  label,
  placeholder,
  password = false,
  onChange,
  onBlur,
  value,
  text,
  style,
  rightIcon,
  placeholderColor,
}: MyInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputContainerStyle: ViewStyle = {
    ...styles.inputContainerStyle,
  };

  return (
    <View style={[styles.inputContainerStyle, style, inputContainerStyle]}>
      <TextInput
        secureTextEntry={password ? (showPassword ? false : true) : false}
        placeholder={placeholder}
        style={[
          styles.inputStyle,
          placeholderColor ? { color: placeholderColor } : null,
        ]}
        value={text!}
        onChangeText={(val): void => onChange?.(val)}
      />
      {password && (
        <Ionicons
          name={showPassword ? "eye-outline" : "md-eye-off-outline"}
          size={15}
          color="grey"
          onPress={() => setShowPassword(!showPassword)}
        />
      )}
      {rightIcon && (
        <MaterialIcons
          name={rightIcon.name}
          size={rightIcon.size || 15}
          color={rightIcon.color || "grey"}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: "#f3f4f6",

    flexDirection: "row",
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    elevation: 3,
  },
  inputStyle: {
    flex: 1,
    padding: 10,
  },
});

// import React, { useState } from "react";
// import { TextInput, View, StyleSheet, ViewStyle } from "react-native";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// import { MyInputProps } from "../../types";

// export default function MyInput({
//   placeholder,
//   password = false,
//   onChange,
//   onBlur,
//   value,
//   placeholderColor,
//   rightIcon,
//   style,
// }: MyInputProps) {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleTextChange = (text: string) => {
//     if (onChange) {
//       onChange(text);
//     }
//   };

//   return (
//     <View style={[styles.inputContainerStyle, style]}>
//       <TextInput
//         secureTextEntry={password ? (showPassword ? false : true) : false}
//         placeholder={placeholder}
//         style={[
//           styles.inputStyle,
//           placeholderColor ? { color: placeholderColor } : null,
//         ]}
//         onChangeText={handleTextChange}
//         value={value}
//       />
//       {password && (
//         <Ionicons
//           name={showPassword ? "eye-outline" : "md-eye-off-outline"}
//           size={15}
//           color="grey"
//           onPress={() => setShowPassword(!showPassword)}
//         />
//       )}
//       {rightIcon && (
//         <MaterialIcons
//           name={rightIcon.name}
//           size={rightIcon.size || 15}
//           color={rightIcon.color || "grey"}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   inputContainerStyle: {
//     backgroundColor: "#f3f4f6",
//     flexDirection: "row",
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     elevation: 3,
//   },
//   inputStyle: {
//     flex: 1,
//     padding: 10,
//   },
// });
