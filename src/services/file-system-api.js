import PhoneStorage from "./phone-storage";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
const cacheDirectory = FileSystem.cacheDirectory + "sv1712324/";
const appDirectory = FileSystem.documentDirectory + "sv1712324/";
const getFileExt = (filePath) =>
  filePath.includes("lh3.googleusercontent.com")
    ? "png"
    : filePath.substring(filePath.lastIndexOf(".") + 1);
const courseBaseDir = () => appDirectory + `Course/`;
const courseDir = (course_id) => appDirectory + `Course/${course_id}/`;
const courseVideoDir = (course_id, ext) =>
  courseDir(course_id) + `video.${ext}`;
const courseImageDir = (course_id, image_ext) =>
  courseDir(course_id) + `image.${image_ext}`;
const lessonDir = (course_id, lesson_id, ext) =>
  courseDir(course_id) + `lesson_${lesson_id}.${ext}`;
const instructorDir = (instructor_id) =>
  appDirectory + `instructor_${instructor_id}/`;
const instructorImageDir = (instructor_id, fileExt) =>
  instructorDir(instructor_id) + `image.${fileExt}`;
const createDir = async (dirPath) => {
  const dirInfo = await FileSystem.getInfoAsync(dirPath);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });
  }
};
const downloadCourse = async (courseDownloadInfo, course_id) => {
  try {
    await createDir(courseDir(course_id));

    NetInfo.addEventListener((state) => {});
    const state = await NetInfo.fetch();
    if (!state.isInternetReachable) {
      return null;
    }
    return await Promise.all(
      courseDownloadInfo.map((data) => {
        const filePath =
          data.type == "course"
            ? courseVideoDir(data.id, getFileExt(data.path))
            : data.type == "courseImage"
            ? courseImageDir(data.id, getFileExt(data.path))
            : lessonDir(data.id, getFileExt(data.path));
        FileSystem.getInfoAsync(filePath).then((fileInfo) => {
          if (!fileInfo.exists) {
            FileSystem.downloadAsync(data.path, filePath);
          } else {
            console.log("exists");
          }
        });
      })
    );
  } catch (e) {
    console.error("Couldn't download course files:", e);
    return null;
  }
};
const downloadCourseImage = async (course_id, imagePath) => {
  try {
    NetInfo.addEventListener((state) => {});
    const state = await NetInfo.fetch();
    if (!state.isInternetReachable) {
      return null;
    }
    await createDir(courseDir(course_id));

    const imageExt = getFileExt(imagePath);
    const fileUri = courseImageDir(course_id, imageExt);
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
      await FileSystem.downloadAsync(imagePath, fileUri);
    }
  } catch (e) {
    console.error("Couldn't download image file:", e);
  }
};
const downloadInstructorImage = async (instructor_id, imagePath) => {
  try {
    await createDir(instructorDir(instructor_id));
    NetInfo.addEventListener((state) => {});
    const state = await NetInfo.fetch();
    if (!state.isInternetReachable) {
      return null;
    }
    const imageExt = getFileExt(imagePath);
    const fileUri = instructorImageDir(instructor_id, imageExt);
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    try {
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(fileUri);
      }
    } catch (err) {}
    await FileSystem.downloadAsync(imagePath, fileUri);
  } catch (e) {
    console.error("Couldn't download image file:", e);
  }
};
const deleteAllCourse = async () => {
  return await FileSystem.deleteAsync(courseBaseDir());
};
const deleteCourse = async (course_id) => {
  return await FileSystem.deleteAsync(courseDir(course_id));
};
const downloadImageCouseList = async (payloadStr) => {
  const payload = JSON.parse(payloadStr);
  NetInfo.addEventListener((state) => {});
  try {
    const state = await NetInfo.fetch();
    if (!state.isInternetReachable) {
      return null;
    }
  } catch (err) {
    return null;
  }
  return Promise.all(
    payload.map((course) =>
      course.imageUrl
        ? FileSystemApi.downloadCourseImage(course.id, course.imageUrl)
        : course.courseImage
        ? FileSystemApi.downloadCourseImage(course.id, course.courseImage)
        : null
    )
  );
};
const getCourseVideo = async (course_id, filePath) => {
  try {
    const fileUri = courseVideoDir(course_id, getFileExt(filePath));
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      const rsUrl = FileSystem.getContentUriAsync(fileUri);
      return rsUrl;
    }
    return null;
  } catch (err) {
    return null;
  }
};
const getCourseImage = async (course_id, filePath) => {
  try {
    const fileUri = courseImageDir(course_id, getFileExt(filePath));
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      const rsUrl = FileSystem.getContentUriAsync(fileUri);
      return rsUrl;
    }
    return null;
  } catch (err) {
    return null;
  }
};
const getInstructorImage = async (id, filePath) => {
  try {
    const fileUri = instructorImageDir(id, getFileExt(filePath));
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      const rsUrl = FileSystem.getContentUriAsync(fileUri);
      return rsUrl;
    }
    return null;
  }
  catch(err) {
    return null;
  }
};
const FileSystemApi = {
  downloadCourseImage,
  downloadCourse,
  getFileExt,
  courseDir,
  lessonDir,
  courseVideoDir,
  courseImageDir,
  createDir,
  deleteCourse,
  downloadInstructorImage,
  downloadImageCouseList,
  deleteAllCourse,
  getCourseVideo,
  getCourseImage,
  getInstructorImage,
};
export default FileSystemApi;
