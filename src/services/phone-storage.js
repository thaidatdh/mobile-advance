import AsyncStorage from "@react-native-async-storage/async-storage";

const save = async (key, value) => {
  try {
    typeof value == "string"
      ? await AsyncStorage.setItem(key, value)
      : await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log("err at save");
    console.log(err);
  }
};
const load = async (key, type) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (type == "json") {
      if (value) return await JSON.parse(value);
      else return null;
    } else {
      return value;
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
