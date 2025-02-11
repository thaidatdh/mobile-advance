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
  if (!token) token = "";
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
  if (!token) token = "";
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
const loadRecommended = (token, user_id, limit, page) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: token,
    },
  };
  const url = `http://api.dev.letstudy.org/user/recommend-course/${user_id}/${limit}/${page}`;
  return fetch(url, requestOptions);
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
const getLessonSubtitle = (token, course_id, lesson_id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  const url = `http://api.dev.letstudy.org/lesson/subtitle/${course_id}/${lesson_id}`;
  return fetch(
    url,
    requestOptions
  );
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
const search = (categories, keyword, limit, offset) => {
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
        time: [],
        price: [],
      },
      limit: limit,
      offset: offset,
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
  const url = "http://api.dev.letstudy.org/course/detail-with-lesson/" + id;
  const requestOptionsUser = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return fetch(url, requestOptionsUser);
};
const getCourseDetails = (id, userid) => {
  const url = `http://api.dev.letstudy.org/course/get-course-detail/${id}/${userid}`;
  const requestOptionsUser = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, requestOptionsUser);
};
const getUserInfo = (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return fetch(
    "http://api.dev.letstudy.org/user/me",
    requestOptions
  );
};
const changePassword = (token, data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data)
  };
  return fetch("http://api.dev.letstudy.org/user/change-password", requestOptions);
};
const updateProfile = (token, data) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };
  return fetch(
    "http://api.dev.letstudy.org/user/update-profile",
    requestOptions
  );
};
const updateEmail = (token, data) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };
  return fetch(
    "http://api.dev.letstudy.org/user/change-user-email",
    requestOptions
  );
};
const forgetPassword = (email) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  };
  return fetch(
    "http://api.dev.letstudy.org/user/forget-pass/send-email",
    requestOptions
  );
};
const ratingCourse = (
  token,
  course_id,
  formalityPoint,
  presentationPoint,
  contentPoint,
  content
) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      courseId: course_id,
      formalityPoint: formalityPoint,
      contentPoint: presentationPoint,
      presentationPoint: contentPoint,
      content: content,
    }),
  };
  return fetch(
    "http://api.dev.letstudy.org/course/rating-course",
    requestOptions
  );
};
const searchV2 = (keyword, limit, offset) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      keyword: keyword,
      limit: limit,
      offset: offset,
      opt: {
        category: [],
        time: [],
        price: [],
      },
    }),
  };
  return fetch("http://api.dev.letstudy.org/course/searchV2", requestOptions);
};
const updateLessonStatus = (token, lesson_id) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      lessonId: lesson_id
    }),
  };
  return fetch("http://api.dev.letstudy.org/lesson/update-status", requestOptions);
}
const getLastWatchLesson = (token, course_id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return fetch("http://api.dev.letstudy.org/course/last-watched-lesson/" + course_id, requestOptions);
}
const OnMoreButton = {
  onLoadMoreNewRelease : (offset) => {
    return getTopNew(10, offset + 1)
      .then((res) => res.json())
      .then((response) => {
        return {
          data: response.payload,
          offset: offset + 1,
        };
      });
  },
  onLoadMoreTopRate : (offset) => {
    return getTopRated(10, offset + 1)
      .then((res) => res.json())
      .then((response) => {
        return {
          data: response.payload,
          offset: offset + 1,
        };
      });
  },
  onLoadMoreTopSell : (offset) => {
    return getTopSell(10, offset + 1)
      .then((res) => res.json())
      .then((response) => {
        return {
          data: response.payload,
          offset: offset + 1,
        };
      });
  },
  onLoadMoreRecommended : (offset, token, user) => {
    if (token && user) {
      return loadRecommended(token, user.id, 10, offset + 1)
        .then((res) => res.json())
        .then((response) => {
          return {
            data: response.payload,
            offset: offset + 1,
          };
        });
    } else {
      return null;
    }
  },
  onMoreSearchCourse : async (currentLength, keyword) => {
    try {
      let res = await searchV2(keyword, 10, currentLength);
      let response = await res.json();
      if (
        response.payload !== undefined &&
        response.payload.courses != undefined &&
        response.payload.courses.data != undefined
      ) {
        return {
          data: response.payload.courses.data,
          offset: currentLength,
        };
      } else return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  onMoreCategory : async (currentLength, categoryId) => {
    try {
      let categoryList = [categoryId];
      let res = await ApiServices.search(categoryList, "", 10, currentLength);
      let response = await res.json();
      if (
        response.payload !== undefined &&
        response.payload.rows != undefined
      ) {
        return {
          data: response.payload.rows,
          offset: categoryId,
        };
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
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
  loadRecommended,
  getAllCategory,
  getAllInstructor,
  search,
  getCourseInfo,
  getCourseDetailWithLesson,
  getCourseDetails,
  getLessonSubtitle,
  getUserInfo,
  changePassword,
  updateProfile,
  updateEmail,
  forgetPassword,
  ratingCourse,
  searchV2,
  OnMoreButton,
  updateLessonStatus,
  getLastWatchLesson,
};
export default ApiServices;
