import { object, string, bool } from "yup";

// import * as Yup from "yup";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const NAME_REGEX = /^[a-zA-Z0-9 ]*$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]+$/;
const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/;

export const UserSignInSchema = {
  signInForm: object().shape({
    username: string().required("Username is required!"),
    password: string().required("Password is required!"),
    agreeToTerms: bool().oneOf(
      [true],
      "You must agree to the Terms and Conditions!"
    ),
  }),
};

// option 1

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

    applicant: string().required("appplicant is required"),
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
    agreeToTerms: bool().oneOf(
      [true],
      "You must agree to the Terms and Conditions"
    ),
  }),
};
