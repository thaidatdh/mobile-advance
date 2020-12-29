import AsyncStorage from "@react-native-async-storage/async-storage";

const save = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log("err at save");
    console.log(err);
  }
};
const load = async (key, type) => {
  try {
    if (type == "json") {
      const value = await AsyncStorage.getItem(key);
      if (value) return await JSON.parse(value);
      else return null;
    } else {
      return await AsyncStorage.getItem(key);
    }
  } catch (err) {
    console.log("err at load storage");
    console.log(err);
    return null;
  }
};
const remove = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.log("err at remove");
    console.log(err);
  }
};
const PhoneStorage = { save, load, remove };
export default PhoneStorage;
