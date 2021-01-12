import React, { useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import {
  usersData,
  searchHistoryData,
  coursesData,
  authorsData,
  defaultSetting,
} from "../data/dataMockup";
import ApiServices from "../services/api-services";
import PhoneStorage from "../services/phone-storage";
import FileSystemApi from "../services/file-system-api";
import { Alert } from "react-native";

const dark = {
  c_0E0F13: "#0E0F13",
  c_1f242a: "#1f242a",
  c_b4b5ba: "#b4b5ba",
  c_2384ae: "#2384ae",
  c_818286: "#818286",
  c_2b2c30: "#2b2c30",
  c_394249: "#394249",
  c_black: "black",
  c_gray: "gray",
  c_lightgray: "lightgray",
  c_darkgray: "darkgray",
  c_white: "white",
  c_f1c40f: "#f1c40f",
  tinBottomBar: "gray",
};
const light = {
  c_0E0F13: "#a3b0e6",
  c_1f242a: "#a8cfff",
  c_b4b5ba: "#b4b5ba",
  c_2384ae: "#2384ae",
  c_818286: "#818286",
  c_2b2c30: "#b8c3f5",
  c_394249: "#4e95ed",
  c_black: "white",
  c_gray: "#5c5b5b",
  c_lightgray: "#575252",
  c_darkgray: "#424040",
  c_white: "black",
  c_f1c40f: "#c7a210",
  tinBottomBar: "white",
};
export const AppTheme = {
  dark,
  light,
};
const english = {
  Home: "Home",
  Download: "Download",
  Download_2: "Download",
  Browse: "Browse",
  Search: "Search",
  SeeAll: "See All",
  Internet: "Internet",
  NoInternetAlert:
    "This application require internet connection.\nYou may not use all feature with offline mode.",
  Profile: "Profile",
  SignIn: "Sign In",
  SignUp: "Sign Up",
  ForgetPassword: "Forget Password",
  ForgotPassword: "Forgot Password",
  Settings: "Settings",
  SignOut: "Sign Out",
  TopSell: "Top Sell",
  TopRated: "Top Rated",
  Recommended: "Recommended",
  NewReleased: "New Released",
  NewReleasedList: ["New", "Releases"],
  Instructors: "Instructors",
  Courses: "Courses",
  RecentSearches: "Recent searches",
  ClearAll: "Clear all",
  NumberCourses: "Number Courses",
  Progress: "Progress",
  Bookmark: "Bookmark",
  FindACourseToDownload: "Find a course to download",
  courses_lower: "courses",
  RemoveAll: "Remove all",
  Signintoskilluptoday: "Sign in to skill up today",
  Keepyourskilluptodate:
    "Keep your skill up-to-date with access to thousands of courses by industry experts.",
  signintostartwatching: "sign in to start watching",
  More: "More",
  AveragePoint: "Average Point",
  Latestlearntime: "Latest learn time",
  hours: "hours",
  Share: "Share",
  AddBookmark: "Add Bookmark",
  RemoveBookmark: "Remove Bookmark",
  BuyCourse: "Buy Course",
  RemoveDownloaded: "Remove Downloaded",
  LogintoBookmark: "Login to Bookmark!",
  Logintobuy: "Login to buy!",
  Cannotbuyselectedcourse: "Can not buy selected course. It's not free!",
  LogintoDownload: "Login to Download!",
  Youhavetoowncoursetodownload: "You have to own course to download!",
  LogintoRatethiscourse: "Login to Rate this course!",
  Youhavetoowncoursetorate: "You have to own course to rate!",
  Bookmarked: "Bookmarked",
  Owned: "Owned",
  Downloaded: "Downloaded",
  Rate: "Rate",
  LastLearn: "Last Learn",
  Description: "Description",
  Ratings: "Ratings",
  Rating: "Rating",
  Content: "Content",
  Transcript: "Transcript",
  Alert: "Alert",
  Youhavetoownedcoursetowatchthislesson:
    "You have to owned course to watch this lesson!",
  Cannotseethisvideobecauseitsaonlinesection:
    "Cannot see this video because it's a online section.",
  Videonotfound: "Video not found",
  Videolinkisnull: "Video link is null",
  Subtitle: "Subtitle",
  Formality: "Formality",
  Presentation: "Presentation",
  Comment: "Comment",
  Cancel: "Cancel",
  PresentationPoint: "Presentation Point",
  ContentPoint: "Content Point",
  FormalityPoint: "Formality Point",
  Buycoursetosee: "This course has no content",
  NoRating: "No Rating",
  Skills: "Skills",
  Major: "Major",
  Phone: "Phone",
  TotalCourses: "Total Courses",
  errorValuesUserInfo: [
    "Please enter required fields (*)",
    "Email is not valid",
    "Password should include atleast 8 characters",
    "Repeat Password is incorrect",
    "Username already exists",
  ],
  SignupFREE: "Sign up FREE",
  Password: "Password",
  Updateduserinfosuccessfully: "Updated user info successfully",
  Updatefailed: "Update failed",
  Pleaseenterdifferentemailtochangeemail:
    "Please enter different email to change email",
  Updatedemailsuccessfully: "Updated email successfully",
  EmailAlreadyExisted: "Email already existed",
  Pleaseenterdifferentpassword: "Please enter different password",
  PwdNotcorrect: "Password is not correct",
  Updatedpasswordsuccessfully: "Updated password successfully",
  Sorryweneedpermissionstomakethiswork:
    "Sorry, we need permissions to make this work",
  UploadImagefailed: "Upload Image failed",
  SelectAvatar: "Select Avatar",
  Update: "Update",
  UpdateEmail: "Update Email",
  UpdatePassword: "Update Password",
  CurrentPassword: "Current Password",
  NewPassword: "New Password",
  Appversion: "App version",
  Language: "Language",
  LanguageValue: "English",
  Account: "Account",
  Free: "Free",
  Subscription: "Subscription",
  DarkModeDesc: "Enable is Dark Mode. Disable is Light Mode",
  DarkMode: "Dark Mode",
  LightMode: "Light Mode",
  Price: "Price",
  Requirement: "Requirement",
  Learn: "Learn",
  RepeatPassword: "Repeat Password",
  Username: "Username",
  canNotLoadVideo: "Can not load video",
  NoContent: "No Content",
  noCoursefound: "No course found",
  noAuthorfound: "No instructor found",
  FullName: "Full Name",
};
const vietnamese = {
  Home: "Home",
  Download: "Download",
  Download_2: "Tải về",
  Browse: "Browse",
  Search: "Tìm kiếm",
  SeeAll: "Xem tất cả",
  Internet: "Internet",
  NoInternetAlert:
    "Ứng dụng cần mạng.\nỨng dụng có thể hoạt động không đúng khi không có mạng.",
  Profile: "Thông tin",
  SignIn: "Đăng nhập",
  SignUp: "Đăng ký",
  ForgetPassword: "Quên mật khẩu",
  ForgotPassword: "Quên mật khẩu",
  Settings: "Cài đặt",
  SignOut: "Đăng xuất",
  TopSell: "Top Sell",
  TopRated: "Top đánh giá",
  Recommended: "Đề xuất",
  NewReleased: "Mới phát hành",
  NewReleasedList: ["Mới", "phát hành"],
  Instructors: "Giảng viên",
  Courses: "Khoá học",
  RecentSearches: "Tìm kiếm gần đây",
  ClearAll: "Xoá tất cả",
  NumberCourses: "Số khoá học",
  Progress: "Đang học",
  Bookmark: "Thích",
  FindACourseToDownload: "Tìm khoá học để tải",
  courses_lower: "khoá học",
  RemoveAll: "Xoá tất cả",
  Signintoskilluptoday: "Đăng nhập ngay hôm nay",
  Keepyourskilluptodate:
    "Cập nhật kỹ năng của bạn với hàng ngàn khoá học của các chuyên gia.",
  signintostartwatching: "đăng nhập để bắt đầu xem",
  More: "Xem thêm",
  AveragePoint: "Điểm trung bình",
  Latestlearntime: "Lần học cuối",
  hours: "giờ",
  Share: "Chia sẻ",
  AddBookmark: "Thích",
  RemoveBookmark: "Bỏ thích",
  BuyCourse: "Mua",
  RemoveDownloaded: "Xoá",
  LogintoBookmark: "Đăng nhập để thích khoá học!",
  Logintobuy: "Đăng nhập để mua khoá học!",
  Cannotbuyselectedcourse: "Không thể mua khoá học này!",
  LogintoDownload: "Đăng nhập để tải!",
  Youhavetoowncoursetodownload: "Cần mua khoá học để tải!",
  LogintoRatethiscourse: "Đăng nhập để đánh giá!",
  Youhavetoowncoursetorate: "Cần mua khoá học để đánh giá!",
  Bookmarked: "Đã thích",
  Owned: "Đã mua",
  Downloaded: "Đã tải",
  Rate: "Đánh giá",
  LastLearn: "Lần cuối",
  Description: "Mô tả",
  Ratings: "Đánh giá",
  Rating: "Đánh giá",
  Content: "Nội dung",
  Transcript: "Transcript",
  Alert: "Cảnh báo",
  Youhavetoownedcoursetowatchthislesson: "Cần mua khoá học để xem!",
  Cannotseethisvideobecauseitsaonlinesection:
    "Không thể xem vì là phần online. Cần Internet.",
  Videonotfound: "Không tìm thấy video",
  Videolinkisnull: "Video link rỗng",
  Subtitle: "Phụ đề",
  Formality: "Hình thức",
  Presentation: "Trình bày",
  Comment: "Bình luận",
  Cancel: "Huỷ",
  PresentationPoint: "Điểm trình bày",
  ContentPoint: "Điểm nội dung",
  FormalityPoint: "Điểm hình thức",
  Buycoursetosee: "Khoá học không có nội dung",
  NoRating: "Không có đánh giá",
  Skills: "Kỹ năng",
  Major: "Major",
  Phone: "Điện thoại",
  TotalCourses: "Tổng khoá học",
  errorValuesUserInfo: [
    "Vui lòng nhập thông tin yêu cầu (*)",
    "Email không hợp lệ",
    "Mật khẩu nên có ít nhất 8 ký tự",
    "Mật khẩu nhập lại không đúng",
    "Tên tài khoản đã tồn tại",
  ],
  SignupFREE: "Đăng ký MIỄN PHÍ",
  Password: "Mật khẩu",
  Updateduserinfosuccessfully: "Cập nhật thông tin thành công",
  Updatefailed: "Cập nhật thất bại",
  Pleaseenterdifferentemailtochangeemail: "Hãy nhập email mới",
  Updatedemailsuccessfully: "Đổi email thành công",
  EmailAlreadyExisted: "Email đã tồn tại",
  Pleaseenterdifferentpassword: "Hãy nhập mật khẩu khác",
  PwdNotcorrect: "Mật khẩu không đúng",
  Updatedpasswordsuccessfully: "Đổi mật khẩu thành công",
  Sorryweneedpermissionstomakethiswork:
    "Ứng dụng cần quyền truy cập để thực hiện hành động",
  UploadImagefailed: "Upload hình thất bại!",
  SelectAvatar: "Chọn hình đại diện",
  Update: "Cập nhật",
  UpdateEmail: "Cập nhật Email",
  UpdatePassword: "Cập nhật mật khẩu",
  CurrentPassword: "Mật khẩu hiện tại",
  NewPassword: "Mật khẩu mới",
  Appversion: "App version",
  Language: "Ngôn Ngữ",
  LanguageValue: "Tiếng Việt",
  Account: "Tài khoản",
  Free: "Miễn phí",
  Subscription: "Subscription",
  DarkModeDesc: "Bật là Dark Mode. Tắt là Light Mode",
  DarkMode: "Dark Mode",
  LightMode: "Light Mode",
  Price: "Giá",
  Requirement: "Yêu cầu",
  Learn: "Học",
  RepeatPassword: "Nhập lại mật khẩu",
  Username: "Tên đăng nhập",
  canNotLoadVideo: "Không thể tải video",
  NoContent: "Không có nội dung",
  noCoursefound: "Không có khóa học nào",
  noAuthorfound: "Không có giáo viên nào",
  FullName: "Họ tên",
};
export const Languages = {
  english,
  vietnamese,
};
export const SettingContext = React.createContext(null);
export default ({ children }) => {
  const [theme, setTheme] = useState(AppTheme.dark);
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState(Languages.english);
  const [isEnglish, setIsEnglish] = useState(true);
  const switchTheme = () => {
    if (isDark) {
      setTheme(AppTheme.light);
      setIsDark(false);
      PhoneStorage.save("@theme", false);
    } else {
      setTheme(AppTheme.dark);
      setIsDark(true);
      PhoneStorage.save("@theme", true);
    }
  };
  const switchLanguage = () => {
    if (isEnglish) {
      setLanguage(Languages.vietnamese);
      setIsEnglish(false);
      PhoneStorage.save("@language", false);
    } else {
      setLanguage(Languages.english);
      setIsEnglish(true);
      PhoneStorage.save("@language", true);
    }
  };
  const loadPersistTheme = () => {
    PhoneStorage.load("@theme", 'json').then((value) => {
      if (value == null || value == undefined) {
        //setIsDark(true);
        //setTheme(AppTheme.dark);
      } else {
        if (value) {
          setIsDark(true);
          setTheme(AppTheme.dark);
        } else {
          setIsDark(false);
          setTheme(AppTheme.light);
        }
      }
    });
    PhoneStorage.load("@language", "json").then((value) => {
      if (value == null || value == undefined) {
        //
      } else {
        if (value) {
          setIsEnglish(true);
          setLanguage(Languages.english);
        } else {
          setIsEnglish(false);
          setLanguage(Languages.vietnamese);
        }
      }
    });
  };
  const store = {
    theme,
    isDark,
    switchTheme,
    loadPersistTheme,
    language,
    isEnglish,
    switchLanguage,
  };

  return (
    <SettingContext.Provider value={store}>{children}</SettingContext.Provider>
  );
};
