import { celebrate, Joi, Segments } from "celebrate";

export const createBookValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    author: Joi.string().required().trim(),
    genres: Joi.array().items(Joi.string()).required(),
    imageUrl: Joi.string().optional().allow(null),
  })
});


export const updateBookValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().optional().trim(),
    description: Joi.string().optional().trim(),
    author: Joi.string().optional().trim(),
    genres: Joi.array().items(Joi.string()).optional(),
    imageUrl: Joi.string().optional().allow(null),
    done: Joi.boolean().optional(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

export const getBookValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

export const getMyBooksValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    owner: Joi.number().required(),
  }),
});
