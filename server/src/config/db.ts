import joi from 'joi';
import dotenv from 'dotenv-safe';

dotenv.config();
const envSchema = joi
  .object({
    DATABASE_URL: joi.string().required(),
  })
  .unknown();

/**
 * Validate the env variables using joi.validate()
 */
const {error, value: envVars} = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const dbConfig = {
  database_url: envVars.DATABASE_URL,
};
