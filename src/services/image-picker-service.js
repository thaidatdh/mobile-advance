import * as ImagePicker from "expo-image-picker";

const requestPermission = async () => {
  return await ImagePicker.requestCameraRollPermissionsAsync();
};
const loadImage = async () => {
  return await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0,
    base64: true,
  });
};
const ImagePickerService = { requestPermission, loadImage };
export default ImagePickerService;
