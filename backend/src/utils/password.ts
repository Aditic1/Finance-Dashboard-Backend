import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashPassword = async (rawPassword: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(rawPassword, SALT_ROUNDS);
  return hashedPassword;
};

export const comparePassword = async (
  rawPassword: string,
  hasedPassword: string,
): Promise<boolean> => {
  const credentialsValidity = await bcrypt.compare(rawPassword, hasedPassword);
  return credentialsValidity;
};
