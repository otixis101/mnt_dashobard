import * as Yup from "yup";

export const AuthSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "min password length is 6 chars.")
    // .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    // .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
    // .matches(/[0-9]/, "Password must contain at least 1 number")
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

export const SeparatorInputStringSchema = Yup.string().typeError(
  "Only strings are accepted as a valid format"
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

export const CardFormValidationSchema = Yup.object().shape({
  nameOnCard: Yup.string().required("Name on card is required"),
});

/** 
 *  number: Yup.string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be a 16-digit number"),
  exp_month: Yup.string()
    .required("Month is required")
    .matches(/^(0[1-9]|1[0-2])$/, "Month must be a valid two-digit month"),
  exp_year: Yup.string()
    .required("Year is required")
    .matches(/^\d{4}$/, "Year must be a valid four-digit year"),
  cvc: Yup.string()
    .required("CVC is required")
    .matches(/^\d{3,4}$/, "CVC must be a 3 or 4-digit number"),
 */
