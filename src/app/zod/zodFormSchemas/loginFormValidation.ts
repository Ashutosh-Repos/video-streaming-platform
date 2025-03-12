import {
  userValidation,
  emailValidation,
  passwordValidation,
} from "../commonValidations";
import { z } from "zod";

export const loginValidation = z.object({
  identifier: z.union([userValidation, emailValidation]),
  password: passwordValidation,
});
