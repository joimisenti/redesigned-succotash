
// Assign references to elements in HTML with variables
const colorForm = document.getElementById("color-form");
const colorList = document.getElementById("color-list");

// Function creates new color label with axios POST request to the server
async function createColorLabel(moodLabel, color) {
    try {
      const response = await axios.post('http://localhost:4007/api/colors', { moodLabel, color });
      return response.data.newColorLabel; // Return the newly created color label
    } catch (error) {
      console.error('Error creating color label:', error);
      throw error; // Rethrow the error for error handling in the calling code
    }
  }

// Function with GET request for all color labels in server

async function getColorLabels() {
    try {
      const response = await axios.get('http://localhost:4007/api/colors');
      return response.data; // Return the array of color labels
    } catch (error) {
      console.error('Error retrieving color labels:', error);
      throw error;
    }
}

// Event listener for the color form
colorForm.addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form submission

    // Get user input values
    const moodLabel = document.getElementById("mood-label").value;
    const colorPicker = document.getElementById("color-picker").value;
    try {
        const newColorLabel = await createColorLabel(moodLabel, colorPicker);

        // Create a new list item element, display the new color label in the list
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span style="color: ${colorPicker}">${moodLabel}</span>
        `;
        // Append the new list item to the color list
        colorList.appendChild(listItem);

        // Clear the form inputs
        document.getElementById("mood-label").value = "";
        document.getElementById("color-picker").value = "#ff0000";
        window.location.reload();
    } catch (error) {
        // Display an error message to the user
    }
});


// Function to display color labels on page load
async function displayColorLabels() {
    try {
        const colorLabels = await getColorLabels();
        
        colorLabels.forEach(label => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span style="color: ${label.color}">${label.moodLabel}</span>
                <button class="update-button" data-id="${label.id}">Update</button>
                <button class="delete-button" data-id="${label.id}">Delete</button>
            `;
            colorList.appendChild(listItem);

            // Add event listeners for update and delete buttons
            const updateButtons = document.querySelectorAll('.update-button');
            updateButtons.forEach(button => {
                button.addEventListener('click', handleUpdate);
            });
        
            const deleteButtons = document.querySelectorAll('.delete-button');
            deleteButtons.forEach(button => {
                button.addEventListener('click', handleDelete);
            });
        });
    } catch (error) {
        // Display an error message to the user
    }
}

// Function that will send PUT request to server with newly entered user information for mood label
async function updateMoodLabel(id, newMoodLabel) {
    try {
        const response = await axios.put(`http://localhost:4007/api/colors/${id}`, null, {
            params: {
                newMoodLabel: newMoodLabel
            }
        });
        return response.data.colorLabel;
    } catch (error) {
        console.error('Error updating mood label:', error);
        throw error;
    }
}

// Handler function that prompts user to enter new mood label
async function handleUpdate(event) {
    const colorId = event.target.getAttribute('data-id');
    const newMoodLabel = prompt('Enter new mood label:');
    
    if (newMoodLabel !== null) {
        try {
            const updatedColorLabel = await updateMoodLabel(colorId, newMoodLabel);
            // Update the displayed label with the new mood label
            // You can do this by selecting the corresponding list item and updating its content
            window.location.reload();
        } catch (error) {
            // Handle the error
        }
    }
}

// Function that will send axios DELETE request to server
async function deleteColor(id) {
    try {
        await axios.delete(`http://localhost:4007/api/colors/${id}`);
        console.log('Color label deleted successfully');
    } catch (error) {
        console.error('Error deleting color label:', error);
        throw error;
    }
}

// Handler function that checks for the user to confirm delete
async function handleDelete(event) {
    const colorId = event.target.getAttribute('data-id');
    
    const shouldDelete = confirm('Are you sure you want to delete this color label?');
    if (shouldDelete) {
        try {
            await deleteColor(colorId);
            // Remove the deleted label from the displayed list
            // You can do this by selecting the corresponding list item and removing it
            window.location.reload();
        } catch (error) {
            // Handle the error
        }
    }
}
  
// Call the function to display color labels on page load
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOMContentLoaded event fired');
    await displayColorLabels();
});