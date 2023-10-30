export function fetchDataWithAuthentication() {
    return new Promise((resolve, reject) => {
      // Get the authentication token from local storage
      const token = localStorage.getItem('token');
  
      if (!token) {
        reject('Authentication token is missing.');
        return;
      }
  
      // Set up the request with the token in the headers
      const headers = new Headers({
        'Authorization': `Bearer ${token}`,
      });
  
      fetch('http://localhost:8080/fetch-tasks', { method: 'GET', headers })
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
  fetchDataWithAuthentication()
    .then((data) => {
      console.log('Data received:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  