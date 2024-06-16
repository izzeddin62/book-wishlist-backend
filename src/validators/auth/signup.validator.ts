import { celebrate, Joi, Segments } from "celebrate";

export const signupValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
});
