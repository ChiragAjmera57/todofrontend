export async function createTaskWithToken(content) {
    // Get the authentication token from localStorage
    const authToken = localStorage.getItem('token');
  
    if (!authToken) {
      return Promise.reject("Authentication token not found in localStorage");
    }
    // Define the URL for the POST request
    const url = "http://localhost:8080/create-task";
  
    // Define the headers for the request, including the authentication token
    const headers = {
      'Authorization': authToken,
      'Content-Type': 'application/json',
    };
  
    // Define the request body
    const body = JSON.stringify({content});
  console.log(body);
    // Use the fetch API to make the POST request
    return fetch(url, {
      method: 'POST',
      headers,
      body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
  

  

  