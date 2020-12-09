const datepicker = document.querySelector(".datepicker");
const eventName = document.querySelector(".event-name-input");
const addEventBtn = document.querySelector(".add-event");
const eventsList = document.querySelector(".events-list");

let events = [];
let id = 1;


// let today = new Date().toISOString();
// console.log(datepicker.min);
// datepicker.min=today;



// calculate date
const showDateAze = () => {
  let dateInput = datepicker.value && new Date(datepicker.value);
  let hours = dateInput.getHours();
  let minutes = dateInput.getMinutes();
  const date = dateInput.getDate();
  const year = dateInput.getFullYear();
  const month = dateInput.getMonth();
  let weekday = dateInput.getDay();

  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;
  weekday = weekday == 0 ? 7 : weekday;

  const monthsAze = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "İyun",
    "İyul",
    "Avqust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];
  const weekdaysAze = [
    "Bazar ertəsi",
    "Çərşənbə axşamı",
    "Çərşənbə",
    "Cümə axşamı",
    "Cümə",
    "Şənbə",
    "Bazar",
  ];

  return `${date} ${monthsAze[month]} ${year}, ${
    weekdaysAze[weekday - 1]
  } ${hours}: ${minutes}`;
};

const showDate = () => {
  let dateInput = datepicker.value && new Date(datepicker.value);
  let hours = dateInput.getHours();
  let minutes = dateInput.getMinutes();
  const date = dateInput.getDate();
  const year = dateInput.getFullYear();
  const month = dateInput.getMonth();
  let weekday = dateInput.getDay();

  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${date} ${months[month]} ${year}, ${days[weekday]}, ${hours}:${minutes}`;
};

const addEvent = () => {
  const newEvent = {
    id: id++,
    // date: showDateAze(),
    date: showDate(),
    name: eventName.value,
  };
  events.push(newEvent);
};

const deleteEvent = (id) => {
  events = events.filter((item, index) => item.id != id);
};

const addEventItem = (item) => {
  const { id, date, name } = item;
  const eventListItem = document.createElement("li");
  eventListItem.className = "event-list-item";

  const eventDate = document.createElement("span");
  eventDate.className = "date";

  const eventName = document.createElement("span");
  eventName.className = "name";

  // delete eventbtn
  const divBtns = document.createElement("div");
  divBtns.className = "buttons";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.title = "Remove";
  const deleteIcon = document.createElement("i");
  deleteIcon.className = "icon-trash-alt-regular";

  deleteBtn.addEventListener("click", () => {
    deleteEvent(id);
    showEventsList();
  });

  // start countdown btn
  const countdownBtn = document.createElement("button");
  countdownBtn.className = "countdown-btn";
  countdownBtn.title = "Start countdown";
  const countdownIcon = document.createElement("i");
  countdownIcon.className = "icon-calendar-alt-regular";

  eventListItem.id = id;
  eventDate.textContent = date;
  eventName.textContent = name;

  deleteBtn.appendChild(deleteIcon);
  countdownBtn.appendChild(countdownIcon);

  divBtns.appendChild(countdownBtn);
  divBtns.appendChild(deleteBtn);

  eventListItem.appendChild(eventName);
  eventListItem.appendChild(eventDate);
  eventListItem.appendChild(divBtns);

  eventsList.appendChild(eventListItem);
};

const showEventsList = () => {
  eventsList.textContent = "";
  events.forEach((date) => {
    addEventItem(date);
  });
};

showEventsList();

addEventBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addEvent();
  showEventsList();
  datepicker.value = "";
  eventName.value = "";
  modal.classList.remove("active");
});

// add event modal
const modal = document.querySelector(".modal");
const openModal = document.querySelector(".open-modal");
const closeModal = document.querySelector(".close-modal");

openModal.addEventListener("click", () => {
  modal.classList.add("active");
  eventName.focus();
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

// when the user clicks anywhere outside of the modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.remove("active");
  }
};

// (function () {
//   datepicker.datetimepicker({
//     minDate: new Date(),
//   });
// }());
