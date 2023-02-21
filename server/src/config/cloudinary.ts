import joi from 'joi';
/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi
  .object({
    CLOUDINARY_NAME: joi.string(),
    CLOUDINARY_API_KEY: joi.string(),
    CLOUDNIARY_API_SECRET: joi.string(),
  })
  .unknown()
  .required();

/**
 * Validate the env variables using joi.validate()
 */
const {error, value: envVars} = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  cloudinaryConfig: {
    api_secret: envVars.CLOUDNIARY_API_SECRET,
    api_key: envVars.CLOUDINARY_API_KEY,
    name: envVars.CLOUDINARY_NAME,
  },
};
export default config;
