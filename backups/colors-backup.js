// document.addEventListener("DOMContentLoaded", function() {
//     // Sample data for color labels and mood colors
//     const colorData = [
//       { moodLabel: "Happy", color: "#FFD700" },
//       { moodLabel: "Sad", color: "#6495ED" },
//       // Add more color data entries
//     ];

//   // Get the color list element
//   const colorList = document.getElementById("color-list");

//   // Populate the color list
//   colorData.forEach(color => {
//     const listItem = document.createElement("li");
//     listItem.classList.add("color-item");

//     // Create an SVG image element
//     const svgImage = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     svgImage.classList.add("color-svg");
//     svgImage.innerHTML = '<img class="color-svg" src="../kawaii-mallow-edit.svg" alt="Mood Image"/>'; // Replace with your SVG content
//     svgImage.querySelector(".color-svg").style.fill = color.color;

//     // Create the color label element
//     const colorLabel = document.createElement("span");
//     colorLabel.classList.add("color-label");
//     colorLabel.textContent = color.moodLabel;

//     // Append the SVG and label to the list item
//     listItem.appendChild(svgImage);
//     listItem.appendChild(colorLabel);

//     // Append the list item to the color list
//     colorList.appendChild(listItem);
//   });
// });