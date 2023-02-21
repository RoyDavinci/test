import joi from 'joi';
import dotenv from 'dotenv-safe';

dotenv.config();
const envSchema = joi
  .object({
    SMS_API_KEY: joi.string().required(),
    SMS_CLIENT_ID: joi.string().required(),
    SMS_SENDER_ID: joi.string().required(),
  })
  .unknown();

/**
 * Validate the env variables using joi.validate()
 */
const {error, value: envVars} = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const smsConfig = {
  sms: {
    SMS_API_KEY: envVars.SMS_API_KEY,
    SMS_CLIENT_ID: envVars.SMS_CLIENT_ID,
    SMS_SENDER_ID: envVars.SMS_SENDER_ID,
  },
};
