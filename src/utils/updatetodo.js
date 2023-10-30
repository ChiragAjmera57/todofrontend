export async function updateTask(taskId, newContent) {
    const url = `http://localhost:8080/update-task/${taskId}`;
    const authToken = localStorage.getItem('token');
    // Create an object with the request data, including the method and body (content to update).
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken, // You can adjust the content type if needed.
      },
      body: JSON.stringify({ content: newContent }), // Convert the content to JSON format.
    };
  
    // Use the fetch API to make the POST request and handle it with promises.
    return fetch(url, request)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Assuming the server responds with JSON data.
      })
      .then(data => {
        // Handle the response data here, if needed.
        console.log('Task updated successfully:', data);
        return data; // You can return the data to the caller if desired.
      })
      .catch(error => {
        // Handle any errors that occurred during the request.
        console.error('Error updating task:', error);
        throw error; // Rethrow the error to propagate it to the caller.
      });
  }
  
  // Example usage:
//   const taskId = 123; // Replace with the actual task ID.
//   const newContent = 'Updated task content'; // Replace with the new content.
//   updateTask(taskId, newContent)
//     .then(result => {
//       // Handle the result, if needed.
//       console.log('Task update result:', result);
//     })
//     .catch(error => {
//       // Handle any errors that occurred during the update.
//       console.error('Task update error:', error);
//     });
  