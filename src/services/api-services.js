const login = (email, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };
  return fetch("http://api.dev.letstudy.org/user/login", requestOptions);
};
const getFavoriteCourses = (token) => {
  const requestOptionsUser = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token.includes("Bearer ") ? token : "Bearer " + token,
    },
  };
  return fetch(
    "http://api.dev.letstudy.org/user/get-favorite-courses",
    requestOptionsUser
  );
};
const getProcessCourses = (token) => {
  const requestOptionsUser = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token.includes("Bearer ") ? token : "Bearer " + token,
    },
  };
  return fetch(
    "http://api.dev.letstudy.org/user/get-process-courses",
    requestOptionsUser
  );
};
const register = (user) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      username: user.username,
      phone: user.phone,
    }),
  };
  return fetch("http://api.dev.letstudy.org/user/register", requestOptions);
};
const changeLikeCourse = async (course_id, token) => {
  const requestOptionsUser = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      courseId: course_id,
    }),
  };
  fetch(
    "http://api.dev.letstudy.org/user/like-course",
    requestOptionsUser
  ).catch((err) => console.log(err));
};
const getFreeCourses = async (course_id, token) => {
  const requestOptionsUser = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      courseId: course_id,
    }),
  };
  try {
    let res = await fetch(
      "http://api.dev.letstudy.org/payment/get-free-courses",
      requestOptionsUser
    );
    let response = await res.json();
  } catch (err) {
    console.log(err);
  }
};
const getInstructorDetail = (id) => {
  const url = "http://api.dev.letstudy.org/instructor/detail/" + id;
  const requestOptionsUser = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, requestOptionsUser);
};
const getTopNew = (limit, page) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      limit: limit,
      page: page,
    }),
  };
  return fetch("http://api.dev.letstudy.org/course/top-new", requestOptions);
};
const getTopSell = (limit, page) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      limit: limit,
      page: page,
    }),
  };
  return fetch("http://api.dev.letstudy.org/course/top-sell", requestOptions);
};
const getTopRated = (limit, page) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      limit: limit,
      page: page,
    }),
  };
  return fetch("http://api.dev.letstudy.org/course/top-rate", requestOptions);
};
const getAllCategory = () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch("http://api.dev.letstudy.org/category/all", requestOptions);
};
const getAllInstructor = () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch("http://api.dev.letstudy.org/instructor", requestOptions);
};
const search = (categories, keyword, limit, page) => {
  const url = "http://api.dev.letstudy.org/course/search";
  const requestOptionsUser = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      keyword: keyword,
      opt: {
        sort: {
          attribute: "price",
          rule: "ASC",
        },
        category: categories,
        time: [{ min: 0 }],
        price: [
          {
            min: 0,
          },
        ],
      },
      limit: limit,
      offset: page,
    }),
  };
  return fetch(url, requestOptionsUser);
};
const getCourseInfo = (id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(
    "http://api.dev.letstudy.org/course/get-course-info?id=" + id,
    requestOptions
  );
};
const getCourseDetailWithLesson = (id, token) => {
  const url = "http://api.dev.letstudy.org/course​/detail-with-lesson​/" + id;
  const requestOptionsUser = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return fetch(url, requestOptionsUser);
};
const ApiServices = {
  login,
  register,
  getFavoriteCourses,
  getProcessCourses,
  changeLikeCourse,
  getFreeCourses,
  getInstructorDetail,
  getTopNew,
  getTopSell,
  getTopRated,
  getAllCategory,
  getAllInstructor,
  search,
  getCourseInfo,
  getCourseDetailWithLesson,
};
export default ApiServices;
