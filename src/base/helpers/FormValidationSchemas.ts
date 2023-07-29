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

export const StringSchema = Yup.string().typeError(
  "Only strings are accepted as a valid format"
);

export const EmailSchema = Yup.string()
  .email()
  .typeError("Please pass in a valid email");

export const InviteFamilyMemberSchema = Yup.array()
  .of(Yup.string())
  .min(1, "At least one email is required");

export const CardFormValidationSchema = Yup.object().shape({
  nameOnCard: Yup.string().required("Name on card is required"),
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^[0-9]{16}$/, "Card number must be 16 digits"),
  // expireDate: Yup.string()
  //   .required("Expiration date is required")
  //   .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Invalid expiration date (DD/MM)"),
  cvv: Yup.string()
    .required("CVV is required")
    .matches(/^[0-9]{3}$/, "CVV must be 3 digits"),
});
