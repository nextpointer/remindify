// Import the necessary functions and SVG
import {
  createDB,
  addCategoryToDB,
  addReminderToDB,
  deleteCategoryFromDB,
  deleteReminderFromDB,
  getCategoryDetails,
  getRemindersFromDB,
} from "./util/indexDB.js";

// SVG for redirect icon
const redirectSVG = `<?xml version="1.0" encoding="utf-8"?>
<svg width="800px" height="800px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000">
  <polyline points="48 28 48 16 36 16"/>
  <line x1="48" y1="16" x2="16" y2="48"/>
</svg>`;

// Select elements
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
const timerDaySelect = document.getElementById("timer-day");
const customDateInput = document.getElementById("custom-date");
const customTimeInput = document.getElementById("custom-time");
const whatsNew = document.querySelector("#whats-new input[type=text]");
const whatsAbout = document.querySelector("#more-about input[type=text]");
const addButton = document.querySelector("#add");
const alertBar = document.querySelector(".alert");
const alertClosebtn = document.querySelector(".alert>span:nth-child(3)");

// Color selection
const root = document.documentElement;
const redColor = getComputedStyle(root).getPropertyValue("--primary-color-red");
const greenColor = getComputedStyle(root).getPropertyValue(
  "--primary-color-green"
);

// Generates a random light color
function generateLightColor() {
  const r = Math.floor(Math.random() * 156) + 100;
  const g = Math.floor(Math.random() * 156) + 100;
  const b = Math.floor(Math.random() * 156) + 100;
  return `rgb(${r}, ${g}, ${b})`;
}

// Display alert messages
const showAlert = (message, type) => {
  alertBar.classList.remove("hide");
  alertBar.classList.add("show");
  alertBar.style.backgroundColor = type === "success" ? greenColor : redColor;
  alertBar.querySelector("span:nth-child(2)").textContent = message;
  setTimeout(() => {
    alertBar.classList.remove("show");
    alertBar.classList.add("hide");
  }, 3000);
};

// Schedule push notifications
function schedulePushNotification(title, options) {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification(title, options);
        // Customize notification further if needed
      }
    });
  }
}

// Enable or disable custom date/time inputs
timerDaySelect.addEventListener("change", () => {
  const isCustom = timerDaySelect.value === "custom";
  customDateInput.disabled = !isCustom;
  customTimeInput.disabled = !isCustom;
});

// Fetch and display all categories and reminders on load
async function loadData() {
  try {
    // Fetch categories
    const categories = await getCategoryDetails();
    categories.forEach(async (category, index) => {
      const newCategoryElement = document.createElement("button");
      newCategoryElement.classList.add("catagory-button");
      newCategoryElement.innerHTML = `<p>${category.name}</p>`;
      CategoryZone.append(newCategoryElement);

      const optionElement = document.createElement("option");
      optionElement.value = category.name;
      optionElement.textContent = category.name;
      selectCategories.append(optionElement);

      const reminderContainer = document.createElement("div");
      reminderContainer.classList.add("all-learning-containers", category.name);
      reminderContainerZone.append(reminderContainer);

      // Fetch reminders and display them
      const reminders = await getRemindersFromDB(category.name);
      reminders.forEach((reminder) => {
        const parentDiv = document.createElement("div");
        parentDiv.classList.add("reminder-container");
        parentDiv.style.backgroundColor = generateLightColor();

        const reminderHTML = `
          <div class='remainder-link'>
            <a href='${reminder.link}' target='_blank'>${redirectSVG}</a>
          </div>
          <div class="remainder-details">
            <div class="container-heading">
              <p>${reminder.title}</p>
            </div>
            <div class="container-remimdTime">
              <p>Reminds <span>on</span></p>
              <p><span>${reminder.remindTime}</span></p>
            </div>
          </div>
          <div class="container-deleteUpdate">
            <img src="./assets/delete.png" alt="Delete">
          </div>
        `;

        parentDiv.innerHTML = reminderHTML;

        const reminderContainer = document.querySelector(`.${category.name}`);
        if (reminderContainer) {
          reminderContainer.appendChild(parentDiv);
        }

        // Schedule a push notification for the reminder
        scheduleReminderNotification(reminder);
      });

      // Auto-focus the first category on page load
      if (index === 0) {
        highlightCategory(category.name);
      }
    });
  } catch (e) {
    console.error("Something went wrong:", e);
  }
}

// Add category
AddCategory.addEventListener("click", async () => {
  if (AddCategoryInput.value.trim() === "") {
    showAlert("Please enter a category name", "error");
    return;
  }

  const categoryName = AddCategoryInput.value.trim();
  const newCategoryElement = document.createElement("button");
  newCategoryElement.classList.add("catagory-button");
  newCategoryElement.innerHTML = `<p>${categoryName}</p>`;
  CategoryZone.append(newCategoryElement);

  const optionElement = document.createElement("option");
  optionElement.value = categoryName;
  optionElement.textContent = categoryName;
  selectCategories.append(optionElement);

  const reminderContainer = document.createElement("div");
  reminderContainer.classList.add("all-learning-containers", categoryName);
  reminderContainerZone.append(reminderContainer);

  await addCategoryToDB(categoryName);

  // Highlight the newly created category
  highlightCategory(categoryName);

  AddCategoryInput.value = "";
  showAlert("Category created", "success");
});

// Highlight the selected category
function highlightCategory(categoryName) {
  document.querySelectorAll(".catagory-button").forEach((button) => {
    button.classList.toggle(
      "active",
      button.textContent.trim() === categoryName
    );
  });

  document.querySelectorAll(".all-learning-containers").forEach((container) => {
    container.classList.toggle(
      "visible",
      container.classList.contains(categoryName)
    );
  });

  // Update the select option to the focused category
  selectCategories.value = categoryName;
}

// Listen for category button clicks to highlight and show reminders
CategoryZone.addEventListener("click", (event) => {
  if (event.target.closest(".catagory-button")) {
    const categoryName = event.target
      .closest(".catagory-button")
      .textContent.trim();
    highlightCategory(categoryName);
  }
});

// Delete category
deleteReminderContainer.addEventListener("click", async () => {
  const selectedCategory = selectCategories.value;
  if (!selectedCategory) {
    showAlert("Please select a category to delete", "error");
    return;
  }

  const categoryButtons = document.querySelectorAll(".catagory-button p");
  const currentCategoryIndex = Array.from(categoryButtons).findIndex(
    (button) => button.innerText.trim() === selectedCategory
  );

  // Remove category button and option
  document.querySelectorAll(".catagory-button").forEach((button) => {
    if (button.querySelector("p").innerText.trim() === selectedCategory) {
      button.remove();
    }
  });
  document.querySelector(`option[value='${selectedCategory}']`).remove();

  // Remove category div and its reminders
  const categoryDivToRemove = document.querySelector(`.${selectedCategory}`);
  if (categoryDivToRemove) {
    categoryDivToRemove.remove();
    await deleteCategoryFromDB(selectedCategory);
    showAlert("Category removed", "success");

    // Focus on the previous or next category
    const newFocusIndex =
      currentCategoryIndex === 0
        ? 0
        : currentCategoryIndex - 1 < categoryButtons.length
        ? currentCategoryIndex - 1
        : categoryButtons.length - 1;

    const newCategoryToFocus =
      categoryButtons[newFocusIndex]?.textContent.trim();
    if (newCategoryToFocus) {
      highlightCategory(newCategoryToFocus);
    }
  }
});

// Add reminder
addButton.addEventListener("click", async () => {
  if (selectCategories.selectedIndex === -1) {
    showAlert("Please select a category", "error");
    return;
  }

  if (whatsNew.value.trim() === "") {
    showAlert("Please enter a reminder heading", "error");
    return;
  }

  const parentDiv = document.createElement("div");
  parentDiv.classList.add("reminder-container");
  parentDiv.style.backgroundColor = generateLightColor();

  let renderTime;
  if (timerDaySelect.value === "custom") {
    const dateValue = customDateInput.value;
    const timeValue = customTimeInput.value;

    // Combine date and time into a single string in a standard format
    renderTime = `${dateValue} ${timeValue}`;
  } else {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + parseInt(timerDaySelect.value));
    renderTime = currentDate.toISOString();
  }

  const reminderHTML = `
    <div class='remainder-link'>
      <a href='${whatsAbout.value}' target='_blank'>${redirectSVG}</a>
    </div>
    <div class="remainder-details">
      <div class="container-heading">
        <p>${whatsNew.value}</p>
      </div>
      <div class="container-remimdTime">
        <p>Reminds <span>on</span></p>
        <p><span>${renderTime}</span></p>
      </div>
    </div>
    <div class="container-deleteUpdate">
      <span>✕</span>
    </div>
  `;

  parentDiv.innerHTML = reminderHTML;

  const reminderContainer = document.querySelector(
    `.${selectCategories.value}`
  );
  if (reminderContainer) {
    reminderContainer.appendChild(parentDiv);

    // Add reminder to database
    const reminderData = {
      title: whatsNew.value,
      category: selectCategories.value,
      remindTime: renderTime,
      link: whatsAbout.value,
    };
    await addReminderToDB(reminderData);

    showAlert("Reminder created", "success");

    // Schedule push notification
    scheduleReminderNotification(reminderData);
  }

  whatsNew.value = "";
  whatsAbout.value = "";
});

// Schedule a push notification for a reminder
function scheduleReminderNotification(reminderData) {
  const reminderDateTime = new Date(reminderData.remindTime);
  const currentTime = new Date();
  const timeDifference = reminderDateTime - currentTime;

  if (timeDifference > 0) {
    setTimeout(() => {
      schedulePushNotification(reminderData.title, { body: reminderData.link });
    }, timeDifference);
  }
}
// Delete a reminder
reminderContainerZone.addEventListener("click", async (event) => {
  if (event.target.matches(".container-deleteUpdate span")) {
    const reminderElement = event.target.closest(".reminder-container");
    const categoryName = selectCategories.value;
    const title = reminderElement.querySelector(
      ".container-heading p"
    ).textContent;

    reminderElement.remove();
    await deleteReminderFromDB(categoryName, title);
    showAlert("Reminder removed", "success");
  }
});

// Close alert
alertClosebtn.addEventListener("click", () => {
  alertBar.classList.remove("show");
  alertBar.classList.add("hide");
});

// Toggle dark mode
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark-mode");
}

const moon = document.querySelector(".moon");
const sun = document.querySelector(".sun");
const earth = document.querySelector(".earth");

moon.addEventListener("click", () => {
  document.documentElement.classList.add("dark-mode");
  earth.style.justifyContent = "start";
});

sun.addEventListener("click", () => {
  document.documentElement.classList.remove("dark-mode");
  earth.style.justifyContent = "end";
});

//  New user identity
if (!localStorage.getItem("NewUser")) {
  // create the new user help container
  const helpContainer = document.createElement("div");
  helpContainer.classList.add("helpContainer");
  let body = document.querySelector("body");
  helpContainer.innerHTML = `
    <div class='blur-overlay'></div>
    <button class='delete-manual'>✕</button>

    <div class='help-manual'>
       <center><h1 class='manual-header'>Welcome to Remindify! 🎉</h1> </center>
    <p>Let’s get you set up so you never forget those important concepts and topics again. Follow these simple steps, and you'll be mastering your learning journey in no time!</p>

    <h2 class="emoji">🗂️ Adding Categories</h2>
    <ul>
        <li><strong>Create a New Category ➕</strong></li>
        <ul>
            <li>Click on the <em>'Add Category'</em> button to create a new category.</li>
            <li>Enter a name for your category (e.g., JavaScript Tricks, Machine Learning Theories).</li>
            <li>Hit the <em>Add</em> button, and voilà! You've got your first category!</li>
        </ul>
        <li><strong>Manage Categories 🗄️</strong></li>
        <ul>
            <li>Manage any category to focus on it and view all reminders related to that topic.</li>
            <li>If you want to delete a category, click the <em>Trash Icon</em> ✕ next to it—say goodbye to clutter!</li>
        </ul>
    </ul>

    <h2 class="emoji">⏰ Setting Custom Reminders</h2>
    <ul>
        <li><strong>Add a Reminder 🔔</strong></li>
        <ul>
            <li>Click on the <em>'Add Reminder'</em> button to set a new reminder.</li>
            <li>Fill in the details: add a title, description, select the category, and choose the date and time.</li>
            <li>Choose if you want this reminder to repeat daily, weekly, or monthly.</li>
            <li>Click <em>'Add'</em> to save your reminder. Easy as pie! 🥧</li>
        </ul>
        <li><strong>Stay Notified 📬</strong></li>
        <ul>
            <li>Ensure your browser allows notifications from Remindify.</li>
            <li>When the time comes, a notification will pop up to remind you of what you've learned! 💡</li>
        </ul>
    </ul>

    <h2 class="emoji">🌈 Light & Dark Mode</h2>
    <ul>
        <li><strong>Switch Themes 🌞🌜</strong></li>
        <ul>
            <li>Click the <em>'Theme Toggle'</em> button to switch between Light Mode (for day) and Dark Mode (for night).</li>
            <li>Enjoy learning in the style that suits you best!</li>
        </ul>
    </ul>

    <h2 class="emoji">🎯 Tips and Tricks</h2>
    <ul>
        <li><strong>Organize Like a Pro 📂</strong></li>
        <ul>
            <li>Use categories to break down your topics into smaller chunks.</li>
            <li>Group similar reminders to easily focus on one subject at a time.</li>
        </ul>
        <li><strong>Repeat and Retain 🔁</strong></li>
        <ul>
            <li>Set recurring reminders to regularly revisit important concepts.</li>
            <li>Use this feature to make sure knowledge sticks for the long run!</li>
        </ul>
        <li><strong>Embrace Simplicity 🛠️</strong></li>
        <ul>
            <li>Remindify is all about keeping things simple. Don’t overwhelm yourself with too many reminders at once.</li>
            <li>Focus on one category or concept at a time to make the most of your study sessions.</li>
        </ul>
    </ul>
    <center><h2 class="emoji">😊Enjoy!😎</h2></center>
    </div>
    
    `;
  body.appendChild(helpContainer);

  localStorage.setItem("NewUser", true);
}

document.querySelector('.help-manual').addEventListener('click', function(event) {
  if (event.target.closest('.help-manual') && event.target === this) {
    // Close or remove the help manual container here
    this.parentElement.style.display = 'none';
  }
});


// Initial setup: create database and load data
document.addEventListener("DOMContentLoaded", async () => {
  await createDB();
  await loadData();
});
