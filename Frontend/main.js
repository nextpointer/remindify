// import a svg
const redirectSVG =`<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000"><polyline points="48 28 48 16 36 16"/><line x1="48" y1="16" x2="16" y2="48"/></svg>`


// Add new Category Function
const AddCategory = document.querySelector("#adding-catagory-btn");
const AddCategoryInput = document.querySelector("#adding-catagory-input-value");
const CategoryZone = document.querySelector("#all-catagories");
const selectCategories = document.querySelector("#Catagories");
const reminderContainerZone = document.querySelector(
  "#all-learning-container-zone"
);
const deleteReminderContainer = document.querySelector(
  "#delete-reminder-conatainer"
);
// Handle custom interval inputs
const timerDaySelect = document.getElementById("timer-day");
const customDateInput = document.getElementById("custom-date");
const customTimeInput = document.getElementById("custom-time");

let renderTime ='' //this is only showing on remainder container


// color selection
const root = document.documentElement;
const redColor = getComputedStyle(root).getPropertyValue("--primary-color-red");
const greenColor = getComputedStyle(root).getPropertyValue(
  "--primary-color-green"
);
// generates randome color
function generateLightColor() {
  // Generate random values for R, G, B within the range of light colors
  const r = Math.floor(Math.random() * 156) + 100; // 100-255
  const g = Math.floor(Math.random() * 156) + 100; // 100-255
  const b = Math.floor(Math.random() * 156) + 100; // 100-255

  // Convert to a valid RGB color string
  return `rgb(${r}, ${g}, ${b})`;
}

const randomLightColor = generateLightColor()

// select inputHeader
const inputHeader = document.querySelector("#whats-new>input");
// select the alert text content
const alertTextContent = document.querySelector(".alert>span:nth-child(2");

// For cheking whether any catagory created or not,if not then show error
AddCategory.addEventListener("click", (e) => {
  // Check if the input value is empty
  if (AddCategoryInput.value.trim() === "") {
    showAlert();
    alertBar.style.backgroundColor = redColor;
    alertTextContent.textContent = "Please create a category first";
    return;
  } 



  // Category Add
  const newCategoryElement = document.createElement("button");
  newCategoryElement.classList.add("catagory-button");
  const newCategoryInnerHTML = `<p>${AddCategoryInput.value}</p>`;
  newCategoryElement.innerHTML = newCategoryInnerHTML;
  CategoryZone.append(newCategoryElement);

  // Add the category to the select zone
  const optionCreateElement = document.createElement("option");
  optionCreateElement.value = AddCategoryInput.value;
  const optionInnerHTML = `${AddCategoryInput.value}`;
  optionCreateElement.innerHTML = optionInnerHTML;
  selectCategories.append(optionCreateElement);

  const reminderContainer = document.createElement("div");
  reminderContainer.classList.add(
    "all-learning-containers",
    AddCategoryInput.value
  );
  reminderContainerZone.append(reminderContainer);
  
  // Auto-focus the newly created category
  const clickedCategoryButton = newCategoryElement;
  const categoryClassName = clickedCategoryButton.textContent;
  const reminderContainers = reminderContainerZone.querySelectorAll(".all-learning-containers");
  reminderContainers.forEach((container) => {
    if (container.classList.contains(categoryClassName)) {
      container.classList.add("visible");
    } else {
      container.classList.remove("visible");
    }
  });

  AddCategoryInput.value = "";
  showAlert();
  alertBar.style.backgroundColor = greenColor;
  alertTextContent.textContent = "Category created";
});

// Add event listener for deleting the category
deleteReminderContainer.addEventListener("click", () => {
  const selectedCategory = selectCategories.value;

  // Remove the category button
  const categoryButtons = document.querySelectorAll(".catagory-button");
  categoryButtons.forEach((button) => {
    if (containsText(button, selectedCategory)) {
      button.remove();
    }
  });

  // Remove the category from the select zone
  const optionToRemove = selectCategories.querySelector(
    `option[value='${selectedCategory}']`
  );
  if (optionToRemove) {
    optionToRemove.remove();
  }

  // Remove the category div and its content
  const categoryDivToRemove = reminderContainerZone.querySelector(
    `.${selectedCategory}`
  );
  if (categoryDivToRemove) {
    categoryDivToRemove.remove();
    showAlert();
    alertBar.style.backgroundColor = greenColor;
    alertTextContent.textContent = "Category removed";
  }
});

// select the div and elements
const whatsNew = document.querySelector("#whats-new input[type=text]");
const whatsAbout = document.querySelector("#more-about input[type=text]");
const addButton = document.querySelector("#add");

const remimderDataField = document.querySelector(
  "#all-learning-container-zone"
);

remimderDataField.addEventListener("click", (e) => {
  const deleteButton = e.target.closest(".container-deleteUpdate");
  if (deleteButton) {
    const deleteItem = deleteButton.closest(".reminder-container");
    if (deleteItem) {
      deleteItem.remove();
      showAlert();
      alertBar.style.backgroundColor = greenColor;
      alertTextContent.textContent = "Reminder removed";
    }
  }
});

addButton.addEventListener("click", () => {
  if (selectCategories.selectedIndex == -1) {
    showAlert();
  }
  if (inputHeader.value.trim() === "" && CategoryZone.hasChildNodes()) {
    while (true) {
      inputHeader.style.borderColor = redColor;
      showAlert();
      alertBar.style.backgroundColor = redColor;
      alertTextContent.textContent = "Please create a category first";
      setTimeout(() => {
        inputHeader.style.borderColor = "";
      }, 5000);
      break;
    }
    return;
  }
  else if(inputHeader.value.trim() === "" && CategoryZone.hasChildNodes()){
    while (true) {
      inputHeader.style.borderColor = redColor;
      showAlert();
      alertBar.style.backgroundColor = redColor;
      alertTextContent.textContent = "Please give a reminder heading";
      setTimeout(() => {
        inputHeader.style.borderColor = "";
      }, 5000);
      break;
    }
    return;
  }
  else {
    inputHeader.style.borderColor = "";
  }
  const parentDiv = document.createElement("div");
  parentDiv.classList.add("reminder-container");
  parentDiv.style.backgroundColor = generateLightColor()
  

  if(timerDaySelect.value==='custom'){
    renderTime = customDateInput.value +" "+customTimeInput.value
  }
  else{
    renderTime = 'every '+ timerDaySelect.value+' days'
  }

  const remainderContainer = `
    <div class='remainder-link'>
      <a href='${whatsAbout.value}'target ='_blank'>${redirectSVG}</a>
    </div>
    <div class="remainder-details">
      <div class="container-heading">
        <p>${whatsNew.value}</p>
      </div>
      <div class="container-remimdTime">
        <p>Reminds <span>on</span></p>
        <p>
          <span>${renderTime}</span>

        </p>
        
      </div>
    </div>
    <div class="container-deleteUpdate">
      <img src="./assets/delete.png" alt="">
    </div>`;

  whatsNew.value = "";
  whatsAbout.value = "";
  renderTime = ''
  parentDiv.innerHTML = remainderContainer;
  const remainderDataField = document.querySelectorAll(".all-learning-containers");
  remainderDataField.forEach((container) => {
    if (container.classList.contains(selectCategories.value)) {
      container.appendChild(parentDiv);
      showAlert();
      alertBar.style.backgroundColor = greenColor;
      alertTextContent.textContent = "Reminder created";
    }
  });
});

// Showing the container as per category
CategoryZone.addEventListener("click", (e) => {
  const clickedCategoryButton = e.target.closest(".catagory-button");

  if (clickedCategoryButton) {
    const categoryClassName = clickedCategoryButton.textContent;

    // Iterate through reminder containers
    const reminderContainers = reminderContainerZone.querySelectorAll(".all-learning-containers");
    reminderContainers.forEach((container) => {
      if (container.classList.contains(categoryClassName)) {
        container.classList.add("visible");
      } else {
        container.classList.remove("visible");
      }
    });
  }
});

// Custom function to check if an element contains specific text
function containsText(element, text) {
  return element.innerText.includes(text);
}

// Showing Alert message
// create a function for displaying the alert
const alertBar = document.querySelector(".alert");
const showAlert = () => {
  alertBar.classList.remove("hide");
  alertBar.classList.add("show");
  setTimeout(() => {
    alertBar.classList.remove("show");
    alertBar.classList.add("hide");
  }, 3000);
};
// add feature to the close button
const alertClosebtn = document.querySelector(".alert>span:nth-child(3)");
alertClosebtn.addEventListener("click", () => {
  alertBar.classList.remove("show");
  alertBar.classList.add("hide");
});

// Function to schedule a push notification
function schedulePushNotification(title, options) {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification(title, options);
        // You can customize the notification further if needed
      }
    });
  }
}



timerDaySelect.addEventListener("change", () => {
  if (timerDaySelect.value === "custom") {
    customDateInput.disabled = false;
    customTimeInput.disabled = false;
  } else {
    customDateInput.disabled = true;
    customTimeInput.disabled = true;
  }
});

// Modify the addButton click event to schedule push notification
addButton.addEventListener("click", () => {
  const reminderDataField = document.querySelectorAll(".all-learning-containers");
  reminderDataField.forEach((container) => {
    if (container.classList.contains(selectCategories.value)) {
      // Schedule push notification
      const selectedInterval = timerDaySelect.value;
      let notificationDateTime;

      if (selectedInterval === "custom") {
        const reminderTime = customTimeInput.value;
        const reminderDate = customDateInput.value;

        if (reminderTime && reminderDate) {
          notificationDateTime = new Date(`${reminderDate}T${reminderTime}`);
        }
      } else {
        const intervalDays = parseInt(selectedInterval);
        notificationDateTime = new Date();
        notificationDateTime.setDate(notificationDateTime.getDate() + intervalDays);
      }

      if (notificationDateTime) {
        const currentTime = new Date();
        if (notificationDateTime > currentTime) {
          const timeDifference = notificationDateTime - currentTime;
          setTimeout(() => {
            schedulePushNotification(whatsNew.value, { body: whatsAbout.value });
          }, timeDifference);
        }
      }
    }
  });
});
