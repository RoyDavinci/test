import joi from 'joi';
import dotenv from 'dotenv-safe';

dotenv.config();
const envSchema = joi
  .object({
    NODE_ENV: joi.string().allow('development', 'production', 'test'),
    PORT: joi.string().required(),
    SECRET: joi.string().required(),
    TOKENEXPIRATIONTIME: joi.string().required(),
    FRONTEND_HOST: joi.string().required(),
  })
  .unknown();

/**
 * Validate the env variables using joi.validate()
 */
const {error, value: envVars} = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const serverConfig = {
  env: envVars.NODE_ENV,
  isTest: envVars.NODE_ENV === 'test',
  isDevelopment: envVars.NODE_ENV === 'development',
  server: {
    port: envVars.PORT || '3900',
    secret: envVars.SECRET,
    tokenExpirationTime: envVars.TOKENEXPIRATIONTIME,
    FRONTEND_HOST: envVars.FRONTEND_HOST,
  },
};
