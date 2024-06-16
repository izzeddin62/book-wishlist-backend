import { celebrate, Joi, Segments } from "celebrate";

export const loginValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim(),
  }),
});
