export function fetchDataWithAuthentication(page) {
    return new Promise((resolve, reject) => {
      // Get the authentication token from local storage
      const token = localStorage.getItem('token');
  
      if (!token) {
        reject('Authentication token is missing.');
        return;
      }
  
      // Set up the request with the token in the headers
      const headers = new Headers({
        'Authorization': token,
      });
  
      fetch(`http://localhost:8080/fetch-tasks?page=${page}`, { method: 'GET', headers })
        .then((response) => {
          if (!response.ok) {
            reject('Request failed with status: ' + response.status);
            return;
          }
  
          // Parse the response data as JSON
          return response.json();
        })
        .then((data) => {
          // Resolve the promise with the data
          resolve(data);
        })
        .catch((error) => {
          // Reject the promise with the error
          reject(error);
        });
    });
  }
  
  // Example usage

  