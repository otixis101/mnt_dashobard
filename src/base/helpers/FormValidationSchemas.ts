/* eslint-disable import/prefer-default-export */
import * as Yup from "yup";

export const AuthSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "min password length is 6 chars.")
    .required("password is required"),
});
