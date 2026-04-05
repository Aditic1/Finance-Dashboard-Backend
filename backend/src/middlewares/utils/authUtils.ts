import { AppError } from "../../errors/AppError";

const isAuthTokenValid = (authTokens: string[]): boolean => {
  return (
    authTokens[0]?.toLowerCase() === "bearer" &&
    (authTokens[1]?.length ?? 0) > 0
  );
};

export const getAccessToken = (authHeader: string): string => {
  if (!authHeader) throw new AppError("Authorization incorrect.", 401);

  const authTokens = authHeader.split(" ");

  if (!isAuthTokenValid(authTokens))
    throw new AppError("Authorization not valid.", 401);
  return authTokens[1];
};
