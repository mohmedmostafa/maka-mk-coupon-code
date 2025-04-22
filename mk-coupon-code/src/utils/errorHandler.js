export default {
    handle(error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            return 'Bad request - please check your input';
          case 401:
            return 'Session expired - please login again';
          case 403:
            return 'You are not authorized to perform this action';
          case 404:
            return 'Resource not found';
          case 500:
            return 'Server error - please try again later';
          default:
            return error.response.data.message || 'An error occurred';
        }
      } else if (error.request) {
        return 'Network error - please check your connection';
      } else {
        return 'An unexpected error occurred';
      }
    }
  };