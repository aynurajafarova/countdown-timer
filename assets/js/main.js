const datepicker = document.querySelector(".datepicker");
const eventName = document.querySelector(".event-name-input");
const addEventBtn = document.querySelector(".add-event");
const eventsList = document.querySelector(".events-list");
const addEventForm = document.querySelector(".add-event-form");
const modal = document.querySelector(".modal");
const addBtn = document.querySelector(".add-btn");
const closeModal = document.querySelector(".close-modal");
const counterDiv = document.querySelector(".countdown");
const finishedDiv = document.querySelector(".finished");
const days = document.querySelector(".day");
const hours = document.querySelector(".hour");
const minutes = document.querySelector(".minute");
const seconds = document.querySelector(".second");

let events = [];
let id = 1;

// calculate date
const changeFormatAze = (formatDate) => {
  let dateInput = formatDate;
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

const changeFormat = (formatDate) => {
  let dateInput = formatDate;
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
    date: new Date(datepicker.value),
    name: eventName.value,
  };
  events.push(newEvent);
};

const deleteEvent = (id) => {
  events = events.filter((item, index) => item.id != id);
};

const startCountdown = (id) => {
  modal.classList.add("active");
  counterDiv.classList.add("active");
  events.forEach((item, index) => {
    if (item.id == id) {
      const eventDate = item.date;

      const sec = 1000,
        min = sec * 60,
        hour = min * 60,
        day = hour * 24;
      const countDown = new Date(eventDate).getTime();
      const interval = setInterval(() => {
        let now = new Date().getTime();
        let distance = countDown - now;
        if (distance > 0) {
          days.textContent = Math.floor(distance / day);
          hours.textContent = Math.floor((distance % day) / hour);
          minutes.textContent = Math.floor((distance % hour) / min);
          seconds.textContent = Math.floor((distance % min) / sec);
        } else if (distance < 0) {
          counterDiv.classList.remove("active");
          finishedDiv.classList.add("active");
          clearInterval(interval);
        }

        closeModal.addEventListener("click", () => {
          clearInterval(interval);
        });
      }, 1000);
    }
  });
};

const addEventItem = (item) => {
  const { id, date, name } = item;
  const formatDate = changeFormat(date);

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

  countdownBtn.addEventListener("click", () => startCountdown(id));

  eventListItem.id = id;
  eventDate.textContent = formatDate;
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
  removeActive();
});

addBtn.addEventListener("click", () => {
  modal.classList.add("active");
  addEventForm.classList.add("active");
  eventName.focus();
});

closeModal.addEventListener("click", () => {
  removeActive();
});

// when the user clicks anywhere outside of the modal
// window.onclick = function (event) {
//   if (event.target == modal) {
//     removeActive();
//   }
// };

const removeActive = () => {
  modal.classList.remove("active");
  addEventForm.classList.remove("active");
  counterDiv.classList.remove("active");
  finishedDiv.classList.remove("active");
};
