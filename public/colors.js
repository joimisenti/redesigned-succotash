
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

// Animated Background for the balls bouncing around page
// Some random colors // default: ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#885A5A"]
const ballColors = ["#f6bd60", "#f7ede2", "#f5cac3", "#84a59d", "#f28482"];

const numBalls = 50;
const balls = [];

for (let i = 0; i < numBalls; i++) {
    let ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.background = ballColors[Math.floor(Math.random() * ballColors.length)];
    ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
    ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
    ball.style.transform = `scale(${Math.random()})`;
    ball.style.width = `${Math.random()}em`;
    ball.style.height = ball.style.width;

    balls.push(ball);
    document.body.append(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
    let to = {
        x: Math.random() * (i % 2 === 0 ? -11 : 11),
        y: Math.random() * 12
};

let anim = el.animate(
    [
        { transform: "translate(0, 0)" },
        { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
        {
        duration: (Math.random() + 1) * 2000, // random duration
        direction: "alternate",
        fill: "both",
        iterations: Infinity,
        easing: "ease-in-out"
        }
    );
});
  
// Call the function to display color labels on page load
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOMContentLoaded event fired');
    await displayColorLabels();
});