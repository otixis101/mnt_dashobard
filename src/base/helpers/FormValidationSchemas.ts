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

export const UpdateUserAboutSchema = Yup.object().shape({
  address: Yup.string().required("Address cannot be blank"),
  occupation: Yup.string().required("Occupation cannot be blank"),
  // gender: Yup.string().required("Gender cannot be blank"),
  // maritalStatus: Yup.string().required("Marital status cannot be blank"),
});

export const NumberSchema = Yup.number().typeError(
  "Only numbers are accepted as a valid format"
);

export const StringSchema = Yup.object().shape({
  interests: Yup.string(),
  about: Yup.string(),
});

export const EmailSchema = Yup.string()
  .email()
  .typeError("Please pass in a valid email");

export const InviteFamilyMemberSchema = Yup.array()
  .of(Yup.string())
  .min(1, "At least one email is required");
