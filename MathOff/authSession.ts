import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUserToken = async (token: string) => {
  await AsyncStorage.setItem('userToken', token);
};

export const getUserToken = async () => {
  return await AsyncStorage.getItem('userToken');
};

export const clearUserToken = async () => {
  await AsyncStorage.removeItem('userToken');
};