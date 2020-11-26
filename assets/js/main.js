const input = document.querySelector("input");
const btn = document.querySelector("button");
const divContainer = document.querySelector(".container");

const dates = [];
let id = 1;

// calculate date
const showDate = () => {
  let dateInput = input.value && new Date(input.value);
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

const addDate = () => {
  const newDate = {
    id: id++,
    text: showDate(),
  };
  dates.push(newDate);
};

const addDateItem = (date) => {
  const { id, text } = date;
  const dateItem = document.createElement("p");
  dateItem.textContent = text;
  dateItem.id = id;

  divContainer.appendChild(dateItem);
};

const showDatesList = () => {
  divContainer.textContent = "";
  dates.forEach((date) => {
    addDateItem(date);
  });
};

showDatesList();

btn.addEventListener("click", (e) => {
  e.preventDefault();
  addDate();
  showDatesList();
  input.value = ""; 
//   input.focus()
});
