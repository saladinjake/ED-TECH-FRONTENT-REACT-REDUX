import { GET_COURSES, COURSE_ERROR, SET_LOADING } from "./types";
import { getCourses } from "services/course";

export const fetchCourses = () => async (dispatch) => {
  try {
    await setLoading();
    const res = await getCourses();

    const courses = res.data.data.courses.filter((course) => {
            return  parseInt(course.status) === 1;
          })
    dispatch({
      type: GET_COURSES,
      payload: courses,
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: "An Error occured",
    });
  }
};

export const setLoading = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};
