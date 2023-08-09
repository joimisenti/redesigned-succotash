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
//                 // Save mood label-color data to the server
//                 await saveColorDataToServer(this.dataset.day, selectedColor);
//             } else {
//                 this.style.backgroundColor = '';
//                 // Remove mood label-color data from the server
//                 await saveColorDataToServer(this.dataset.day, null);
//             }
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
//     const colorData = await loadColorDataFromServer(); // Load color data

//     loadCalendarMonths();
//     loadCalendarYears();
//     loadCalendarDays();

//     // Apply stored color data to the respective days
//     Object.keys(colorData).forEach(day => {
//         const dayElement = document.getElementById(`calendarday_${day}`);
//         const color = colorData[day];
//         if (dayElement && color) {
//             dayElement.style.backgroundColor = color;
//             dayElement.classList.add('selected');
//         }
//     });
// });

// // Save color data to your server-side database
// async function saveColorDataToServer(day, color) {
//     try {
//         if (color !== null) {
//             await axios.put(`http://localhost:4007/api/colors/${day}`, { color }); // Update color
//         } else {
//             await axios.delete(`http://localhost:4007/api/colors/${day}`); // Delete color data
//         }
//     } catch (error) {
//         console.error('Error saving color data:', error);
//     }
// }

// // Load color data from your server-side database
// async function loadColorDataFromServer() {
//     try {
//         const response = await axios.get('http://localhost:4007/api/colors'); // Adjust the URL if needed
//         return response.data;
//     } catch (error) {
//         console.error('Error loading color data:', error);
//         return {};
//     }
// }
