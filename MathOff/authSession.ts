let userToken: string | null = null;

export const setUserToken = (token: string) => {
  userToken = token;
};

export const getUserToken = () => {
  return userToken;
};

export const clearUserToken = () => {
  userToken = null;
};