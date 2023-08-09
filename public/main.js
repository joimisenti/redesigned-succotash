// const variables = document.querySelector('form')
// const variables = document.querySelector('#id-name')
// const variables = document.querySelector('.class-name')

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Get current date
const currentDate = new Date();

// Get the weekday, day, month, year
const dayOfWeek = daysOfWeek[currentDate.getDay()];
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();

// Format the date to preference
const formattedDate = `${dayOfWeek}, ${months[month - 1]} ${day}, ${year}`;

// Update content of the span element with id="today-date"
const currentDateElement = document.querySelector("#today-date");
currentDateElement.textContent = formattedDate;

// Create a variable for the span element with id="today-mood". This will be updated in the event listener alongside click that changes the mood color.
const currentMoodElement = document.querySelector("#today-mood");

// Assign the animal box to a variable
const kawaiiAnimalBox = document.getElementById("mood-box");
const moodBox = document.querySelector(".mood-box");

// The event listener responds to a click to start the jiggle animation
kawaiiAnimalBox.addEventListener("click", () => {
  // Toggle the jiggle class
  kawaiiAnimalBox.classList.toggle("jiggle");

  // Remove the jiggle class after the animation completes
  setTimeout(() => {
    kawaiiAnimalBox.classList.remove("jiggle");
  }, 300); // Adjust the duration of the animation here
});

document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Mood-label color pairs from the server with axios using GET request
    const response = await axios.get("http://localhost:4007/api/colors");
    const data = response.data;

    // Reference the legend section container by variable
    const legendSection = document.getElementById("legendSection");

    // Loop through the data and generate legend elements
    data.forEach((item) => {
      const moodLabel = item.moodLabel;
      const color = item.color;

      // Create SVG and text elements for mood label-color pair
      const moodElement = document.createElement("div");
      moodElement.classList.add("mood-label");

      const svg = document.createElement("img");
      svg.classList.add("mood-icon");
      svg.style.backgroundColor = color; // Set color

      /// Set the src attribute to the path of desired SVG image file
      svg.src = "../kawaii-mallow-edit.svg";

      const text = document.createElement("span");
      text.classList.add("mood-text");
      text.textContent = moodLabel;

      // Append SVG and text to moodElement
      moodElement.appendChild(svg);
      moodElement.appendChild(text);

      // Append moodElement to the legend section
      legendSection.appendChild(moodElement);
      // Add sproing to each mood element
      moodElement.addEventListener("click", async () => {
        // Toggle the sproing class
        moodElement.classList.toggle("sproing");
        const calendarData = {
          day,
          month: month - 1,
          year,
          color: item.color,
          colorLabelId: item.id
        };
        const response = await axios.post(
          "http://localhost:4007/api/calendar?override=true",
          [calendarData]
        )
        console.log({ response })
        // Remove the sproing class after the animation completes
        setTimeout(() => {
          moodElement.classList.remove("sproing");
        }, 300); // Adjust the duration of the animation

        // Change the color of Today's Mood empty icon element to fill with the selected color from legend
        kawaiiAnimalBox.style.backgroundColor = color;
        currentMoodElement.textContent = moodLabel;
      });
    });
  } catch (error) {
    console.error(error);
    // Handle error
  }
});

// General front-end syntax for axios HTTP request functions and associated handler submit functions

// function handleSubmit(e) {
//axios.post
// }

// function get____() {
// axios.get('http://localhost:___/___/')
// .then(res => {
//
// })
// }

// function delete(id) {
// axios.delete('http://localhost:___/${id})
// }
