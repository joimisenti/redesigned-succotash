// var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// var startYear = 2020;
// var endYear = 2025;
// var month = 0;
// var year = 0;
// var selectedDays = new Array();
// var mousedown = false;
// var mousemove = false;

// // Fetch mood options from the server and populate the dropdown
// async function fetchAndPopulateMoodOptions() {
//     try {
//         const response = await axios.get('http://localhost:4007/api/colors'); // Adjust the URL if needed
//         const moodOptions = response.data;

//         const moodDropdown = document.getElementById('mood-dropdown');
//         moodOptions.forEach(option => {
//             const optionElement = document.createElement("option");
//             optionElement.value = option.color;
//             optionElement.textContent = option.moodLabel;
//             moodDropdown.appendChild(optionElement);

//             // Store the colorLabelId in a data attribute
//             optionElement.dataset.colorLabelId = option.id;
//         });
//         console.log(moodOptions)
//         return moodOptions;
//     } catch (error) {
//         console.error('Error fetching mood options:', error);
//         return [];
//     }
// }

// function loadCalendarMonths() {
//     for (var i = 0; i < months.length; i++) {
//         var doc = document.createElement("div");
//         doc.innerHTML = months[i];
//         doc.classList.add("dropdown-item");

//         doc.onclick = (function () {
//             var selectedMonth = i;
//             return function () {
//                 month = selectedMonth;
//                 document.getElementById("curMonth").innerHTML = months[month];
//                 loadCalendarDays();
//                 return month;
//             };
//         })();

//         document.getElementById("months").appendChild(doc);
//     }
// }

// function loadCalendarYears() {
//     document.getElementById("years").innerHTML = "";

//     for (var i = startYear; i <= endYear; i++) {
//         var doc = document.createElement("div");
//         doc.innerHTML = i;
//         doc.classList.add("dropdown-item");

//         doc.onclick = (function () {
//             var selectedYear = i;
//             return function () {
//                 year = selectedYear;
//                 document.getElementById("curYear").innerHTML = year;
//                 loadCalendarDays();
//                 return year;
//             };
//         })();

//         document.getElementById("years").appendChild(doc);
//     }
// }

// function loadCalendarDays() {
//     document.getElementById("calendarDays").innerHTML = "";

//     var tmpDate = new Date(year, month, 0);
//     var num = daysInMonth(month, year);
//     var dayofweek = tmpDate.getDay(); // find where to start calendar day of week

//     for (var i = 0; i <= dayofweek; i++) {
//         var d = document.createElement("div");
//         d.classList.add("day");
//         d.classList.add("blank");
//         document.getElementById("calendarDays").appendChild(d);
//     }

//     for (var i = 0; i < num; i++) {
//         var tmp = i + 1;
//         var d = document.createElement("div");
//         d.id = "calendarday_" + tmp;
//         d.className = "day";
//         d.innerHTML = tmp;
//         d.dataset.day = tmp;

//         d.addEventListener('click', async function(){
//             this.classList.toggle('selected');

//             if (!selectedDays.includes(this.dataset.day))
//                 selectedDays.push(this.dataset.day);
//             else
//                 selectedDays.splice(selectedDays.indexOf(this.dataset.day), 1);

//             // Get the selected color from the dropdown
//             var moodDropdown = document.getElementById('mood-dropdown');
//             var selectedColor = moodDropdown.value;

//             if (this.classList.contains('selected')) {
//                 // Apply the selected color to the background of the day
//                 this.style.backgroundColor = selectedColor;
//             } else {
//                 this.style.backgroundColor = '';
//             }

//             // Prepare the data for saving
//             const calendarData = selectedDays.map(day => ({ day, color: selectedColor }));
//             const selectedData = gatherSelectedDays();
//             await saveCalendarData(selectedData);
//         });

//         d.addEventListener('mousemove', function(e){
//            e.preventDefault();
//             if (mousedown)
//             {
//                 this.classList.add('selected');

//                 if (!selectedDays.includes(this.dataset.day))
//                     selectedDays.push(this.dataset.day);
//             }
//         });

//         d.addEventListener('mousedown', function(e){
//             e.preventDefault();
//             mousedown = true;
//         });
        
//         d.addEventListener('mouseup', function(e){
//             e.preventDefault();
//             mousedown = false;
//         });

//         document.getElementById("calendarDays").appendChild(d);
//     }

//     var clear = document.createElement("div");
//     clear.className = "clear";
//     document.getElementById("calendarDays").appendChild(clear);
// }

// function daysInMonth(month, year) {
//     var d = new Date(year, month + 1, 0);
//     return d.getDate();
// }

// window.addEventListener('load', async function () {
//     var date = new Date();
//     month = date.getMonth();
//     year = date.getFullYear();
//     document.getElementById("curMonth").innerHTML = months[month];
//     document.getElementById("curYear").innerHTML = year;

//     const moodOptions = await fetchAndPopulateMoodOptions();

//     loadCalendarMonths();
//     loadCalendarYears();
//     loadCalendarDays();

//     // Display saved calendar day color data
//     displaySavedCalendarData();
// });

// function gatherSelectedDays() {
//     const moodDropdown = document.getElementById('mood-dropdown');
//     const selectedColor = moodDropdown.value;
//     const selectedColorId = moodDropdown.options[moodDropdown.selectedIndex].dataset.colorLabelId;

//     const selectedData = selectedDays.map(day => ({
//         day: parseInt(day),
//         month: month, // Include the selected month
//         year: year,   // Include the selected year
//         color: selectedColor,
//         colorLabelId: selectedColorId // Replace with the actual ID of the selected color
//     }));

//     return selectedData;
// }


// async function fetchSavedCalendarData() {
//     try {
//         const response = await axios.get('http://localhost:4007/api/calendar'); // Adjust the URL if needed
//         console.log(response.data)
//         return response.data; // Return the array of saved calendar data
//     } catch (error) {
//         console.error('Error fetching saved calendar data:', error);
//         return [];
//     }
// }

// async function displaySavedCalendarData() {
//     try {
//         const savedCalendarData = await fetchSavedCalendarData();

//         // Filter saved data based on the current month and year
//         const filteredData = savedCalendarData.filter(item => item.month === month && item.year === year);
        
//         // Loop through the saved data and update the UI for each day
//         filteredData.forEach(item => {
//             const dayElement = document.getElementById(`calendarday_${item.day}`);
//             const savedColor = item.color; // Use the color from the saved data
            
//             // Apply the saved color to the background of the day
//             dayElement.style.backgroundColor = savedColor;
//             dayElement.classList.add('selected');
//             selectedDays.push(item.day);
//         });
//     } catch (error) {
//         console.error('Error displaying saved calendar data:', error);
//     }
// }
// async function saveCalendarData(calendarData) {
//     try {
//         const response = await axios.post('http://localhost:4007/api/calendar', calendarData);
//         console.log('Calendar data saved successfully', response.data);
//     } catch (error) {
//         console.error('Error saving calendar data', error);
//     }
// }

// document.getElementById('save-calendar-button').addEventListener('click', async () => {
//     const calendarData = gatherSelectedDays();

//     if (calendarData.length > 0) {
//         await saveCalendarData(calendarData);
//     } else {
//         console.log('No data to save.');
//     }
// });

// // // Save color data to your server-side database
// // async function saveColorDataToServer(day, color) {
//     //     try {
//         //         await axios.put(`http://localhost:4007/api/colors/${day}`, { color }); // Adjust the URL if needed
//         //     } catch (error) {
//             //         console.error('Error saving color data:', error);
//             //     }
//             // }
            
//             // // Load color data from your server-side database
//             // async function loadColorDataFromServer() {
// //     try {
//     //         const response = await axios.get('http://localhost:4007/api/colors'); // Adjust the URL if needed
//     //         return response.data;
// //     } catch (error) {
// //         console.error('Error loading color data:', error);
// //         return {};
// //     }
// // }