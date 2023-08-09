
// Get references to HTML elements
const colorForm = document.getElementById("color-form");
const colorList = document.getElementById("color-list");

// Function to create a new color label
async function createColorLabel(moodLabel, color) {
    try {
      const response = await axios.post('http://localhost:4007/api/colors', { moodLabel, color });
      return response.data.newColorLabel; // Return the newly created color label
    } catch (error) {
      console.error('Error creating color label:', error);
      throw error; // Rethrow the error for error handling in the calling code
    }
  }

// Function to get all color labels
async function getColorLabels() {
    try {
      const response = await axios.get('http://localhost:4007/api/colors');
      return response.data; // Return the array of color labels
    } catch (error) {
      console.error('Error retrieving color labels:', error);
      throw error; // Rethrow the error for error handling in the calling code
    }
}

// Add an event listener to the color form
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
    } catch (error) {
        // handle the error, e.g., display an error message to the user
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
    });
    
    // Add event listeners for update and delete buttons
    const updateButtons = document.querySelectorAll('.update-button');
    updateButtons.forEach(button => {
        button.addEventListener('click', handleUpdate);
    });
    
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', handleDelete);
    });
    
} catch (error) {
    // Handle the error gracefully, e.g., display an error message to the user
}
}

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

async function handleUpdate(event) {
    const colorId = event.target.getAttribute('data-id');
    const newMoodLabel = prompt('Enter new mood label:');
    
    if (newMoodLabel !== null) {
        try {
            const updatedColorLabel = await updateMoodLabel(colorId, newMoodLabel);
            // Update the displayed label with the new mood label
            // You can do this by selecting the corresponding list item and updating its content
        } catch (error) {
            // Handle the error
        }
    }
}

async function deleteColor(id) {
    try {
        await axios.delete(`http://localhost:4007/api/colors/${id}`);
        console.log('Color label deleted successfully');
    } catch (error) {
        console.error('Error deleting color label:', error);
        throw error;
    }
}

async function handleDelete(event) {
    const colorId = event.target.getAttribute('data-id');
    
    const shouldDelete = confirm('Are you sure you want to delete this color label?');
  if (shouldDelete) {
    try {
        await deleteColor(colorId);
        // Remove the deleted label from the displayed list
        // You can do this by selecting the corresponding list item and removing it
    } catch (error) {
        // Handle the error
    }
}
}
  
// Call the function to display color labels on page load
document.addEventListener('DOMContentLoaded', async () => {
    await displayColorLabels();
});

// You might have additional code here to handle saving the color labels to storage or sending them to a server.
/*
This JavaScript code adds an event listener to the color form. When the user submits the form, it prevents the default form submission behavior and then extracts the values entered by the user for the mood label and color picker. It then creates a new list item (<li>) element and sets its innerHTML to display the mood label with the selected color. Finally, it appends this new list item to the color list (<ul>) element.

This is a basic example. Depending on your requirements, you might want to add more advanced functionality such as saving the color labels to local storage, sending them to a server, or handling other interactions.

Remember to place this JavaScript code in a file named script.js and link it in your HTML file using the <script> tag at the bottom of the body, as shown in the previous HTML example.
*/