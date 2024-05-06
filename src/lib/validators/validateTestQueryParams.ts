import Joi from 'joi';

const testQueryParams = Joi.object().keys({
  test: Joi.string()
});

const validator = (schema: any) => (payload: any) =>
  schema.validate(payload, {
    abortEarly: false,
    allowUnknown: true,
  });

export const validateTestQueryParams = validator(testQueryParams);