/* eslint-disable import/prefer-default-export */
import * as Yup from "yup";

export const AuthSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "min password length is 6 chars.")
    .required("password is required"),
});

export const CreateUserSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  mothersName: Yup.string().required("Required"),
  homeTown: Yup.string().required("Required"),
});

export const NumberSchema = Yup.number().typeError(
  "Only numbers are accepted as a valid format"
);

export const StringSchema = Yup.string().typeError(
  "Only strings are accepted as a valid format"
);

export const EmailSchema = Yup.string()
  .email()
  .typeError("Please pass in a valid email");
