import config from '../config';

export const forgotPasswordLink = (token: string, validity?: string) => {
  if (validity)
    return `${config.server.FRONTEND_HOST}/forgot/password?token=${token}&validity=${validity}`;

  return `${config.server.FRONTEND_HOST}/forgot/password?token=${token}`;
};
