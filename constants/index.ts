import { Dimensions } from "react-native";
import * as Yup from "yup";

export const WINDOW_HEIGHT = Dimensions.get("window").height;
export const WINDOW_WIDTH = Dimensions.get("window").width;

export const SCREEN_HEIGHT = Dimensions.get("screen").height;

// export const validationSchema = Yup.object().shape({
//   username: Yup.string().required("Username is required").label("Username"),
//   password: Yup.string()
//     .required("Password is required")
//     .min(6, "Password must be at least 6 characters")
//     .label("Password"),
// });

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Username is required")
    .label("Username"),
  password: Yup.string().required().min(6).label("Password"),
});
