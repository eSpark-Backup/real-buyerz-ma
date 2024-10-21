import { object, string, bool } from "yup";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const NAME_REGEX = /^[a-zA-Z0-9 ]*$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]+$/;
const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/;
// const PHONE_REGEX = /^03\d{9}$/;

export const UserSignInSchema = {
  signInForm: object().shape({
    email: string()
      .email("Invalid email")
      .required("Email is required")
      .matches(EMAIL_REGEX, { message: "Invalid email" }),
    password: string().required("Password is required!"),
  }),
};

export const UserSignUpSchema = {
  signUpForm: object().shape({
    firstName: string()
      .min(4, "First Name Too Short!")
      .max(50, "First Name Too Long!")
      .required("First Name is Required")
      .matches(NAME_REGEX, {
        message: "Please enter a valid first name",
      }),
    lastName: string()
      .min(4, "Last Name is Too Short!")
      .max(50, "Last Name is Too Long!")
      .required("Last Name is Required")
      .matches(NAME_REGEX, {
        message: "Please enter a valid last name",
      }),
    email: string()
      .email("Invalid email")
      .required("Email is required")
      .matches(EMAIL_REGEX, { message: "Invalid email" }),

    phone: string()
      .matches(PHONE_REGEX, "Contact number is not valid")
      .required("Contact No is Required"),

    password: string()
      .required("Password is required")
      .min(6, "Password must contain at least 8 characters")
      .matches(PASSWORD_REGEX, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }),
    confirmPassword: string()
      .required("Confirm Password is required")
      .test("passwords-match", "Passwords must match", function (value) {
        return value === this.parent.password;
      })
  }),
};

export const ForgotPasswordSchema = object().shape({
  input: string()
    .test(
      "emailOrPhone",
      "Enter a valid email or phone number",
      function (value) {
        const type = this.parent.type;
        // Check if value is defined before performing regex test
        if (value !== undefined) {
          if (type === "email") {
            return EMAIL_REGEX.test(value);
          } else if (type === "phone") {
            return PHONE_REGEX.test(value);
          }
        }
        // If type is not provided or not recognized, return false
        return false;
      }
    )
    .required("This field is required"),
  type: string().oneOf(["email", "phone"]).required("This field is required"),
});

export const ResetPasswordSchema = {
  resetForm: object().shape({
    password: string()
      .required("Password is required")
      .min(6, "Password must contain at least 8 characters")
      .matches(PASSWORD_REGEX, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }),
    confirmPassword: string()
      .required("Confirm Password is required")
      .test("passwords-match", "Passwords must match", function (value) {
        return value === this.parent.password;
      }),
  }),
};
