import history from '../history';
const apiUrl = 'http://scantronbackend-env.mzszeithxu.us-west-2.elasticbeanstalk.com';

function logout() {
  // return dispatch => {
  //   localStorage.removeItem('user');
  //   dispatch({ type: 'LOGOUT' });
  // }
  localStorage.removeItem('user');
  window.location.reload();
}

function handleResponse(response) {
  return response.text().then((text) => {
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }

      const errorMsg = response.statusText;
      return Promise.reject(errorMsg);
    }
    return text && JSON.parse(text);
  });
}

function login(user) {
  return dispatch => {
    // Send action indicating requesting login
    dispatch({ type: 'LOGIN_REQUEST', email: user.email });

    // Set up GET request
    const url = `${apiUrl}/authentication/login`;
    const params = new URLSearchParams();
    params.set('email', user.email);
    params.set('password', user.password);
    const query = params.toString();

    // GET using fetch API
    fetch(`${url}?${query}`, { method: 'GET', credentials: 'include', })
    .then(handleResponse)
    .then((token) => {
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', user });
      history.push('/');
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: 'LOGIN_FAIL', error });
    })
  };
}

function register(user) {
  return dispatch => {
    // Send action indicating requesting registration
    dispatch({ type: 'REGISTER_REQUEST', user });

    // Set up POST request
    const url = `${apiUrl}/authentication/register`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    // POST using fetch API
    fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      console.log('sending VERIFY_REQUEST messages');
      dispatch({ type: 'VERIFY_REQUEST', email: user.email, firstName: user.firstName });
      history.push('/verify');
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: 'REGISTER_FAIL', error });
    })
  }
}

function verify(user) {
  return dispatch => {
    console.log('attempt to verify');
    // Set up POST request
    const url = `${apiUrl}/authentication/confirm`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }

    // POST using fetch API
    fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      console.log(`dispatching VERIFY_SUCCESS, received ${response}`);
      dispatch({ type: 'VERIFY_SUCCESS' });
      history.push('/login');
    })
    .catch((error) => {
      dispatch({ type: 'VERIFY_FAIL', error });
      console.log(error);
      history.push('/register')
    })
  }
}

function getUser(user) {
  return dispatch => {
    // Set up GET request
    const url = `${apiUrl}/user/${user.email}`;
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
    };

    // GET using fetch API
    fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      console.log(`dispatching GET_USER`);
      dispatch({ type: 'GET_USER', userInfo: response });
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

function updateUser(user) {
  return dispatch => {
    // Set up PUT request
    const url = `${apiUrl}/user/${user.email}`;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(user),
    };

    // PUT using fetch API
    fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      console.log(`updated user, GET updated data`);
      dispatch(getUser(user));
    })
    .catch((error) =>{
      console.log(error);
    })
  }
}

function getCourse(user, courseId) {
  return dispatch => {
    // Set up GET request
    const url = `${apiUrl}/course/${user.email}/${courseId}`;
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
    };

    // GET using fetch API
    fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      dispatch({ type: 'COURSE', course: response });
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

function clearCourse() {
  return dispatch => {
    dispatch({ type: 'CLEAR_COURSE' });
  }
}

function getAllCourses(user) {
  return dispatch => {
    // Set up GET request
    const url = `${apiUrl}/course/${user.email}`;
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
    };

    // GET using fetch API
    fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      dispatch({ type: 'ALL_COURSES', courses: response });
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

function createCourse(user, course) {
  return dispatch => {
    // Set up POST request
    const url = `${apiUrl}/course/${user.email}`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(course),
    };

    // POST using fetch API
    fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      console.log('made new course, getting updated list');
      dispatch(getAllCourses(user));
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

function deleteCourse(user, courseId) {
  return dispatch => {
    // Set up DELETE request
    const url = `${apiUrl}/course/${user.email}/${courseId}`;
    const requestOptions = {
      method: 'DELETE',
      credentials: 'include',
    };

    // DELETE using fetch API
    fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      dispatch(clearCourse());
      history.push('/courses');
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

function createExam(user, courseId, exam) {
  return dispatch => {
    // Set up POST request
    const url = `${apiUrl}/exam/${user.email}/${courseId}`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(exam),
    };

    // POST using fetch API
    fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      console.log('made new exam, getting updated list');
      dispatch(getAllExams(user, courseId));
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

function getExam(user, examId) {
  return dispatch => {
    // Set up GET request
    const url = `${apiUrl}/exam/${user.email}/${examId}`;
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
    };

    // GET using fetch API
    fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      dispatch({ type: 'EXAM', examId, exam: response });
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

function getAllExams(user, courseId) {
  return dispatch => {
    // Set up GET request
    const url = `${apiUrl}/exam/${user.email}/${courseId}/all`;
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
    };

    // GET using fetch API
    fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      const exams = response;
      if (Object.keys(exams).length > 0) {
        dispatch({ type: 'COURSE_EXAMS', exams: response });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

function getAllGrades(user, examId) {
  return dispatch => {
    // Set up GET request
    const url = `${apiUrl}/grade/${user.email}/${examId}/all`;
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
    };

    // GET using fetch API
    fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => {
      const exams = response;
      if (Object.keys(exams).length > 0) {
        dispatch({ type: 'EXAM_GRADES', examId, grades: response });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export default {
    logout,
    login,
    register,
    verify,
    getUser,
    updateUser,
    getCourse,
    clearCourse,
    getAllCourses,
    createCourse,
    deleteCourse,
    createExam,
    getExam,
    getAllExams,
    getAllGrades,
};
