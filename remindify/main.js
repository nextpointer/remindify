// Add new Category Function
const AddCategory = document.querySelector("#adding-catagory-btn");
const AddCategoryInput = document.querySelector("#adding-catagory-input-value");
const CategoryZone = document.querySelector("#all-catagories");
const selectCategories = document.querySelector("#Catagories");
const reminderContainerZone = document.querySelector('#all-learning-container-zone');
const deleteReminderContainer = document.querySelector("#delete-reminder-conatainer");

AddCategory.addEventListener("click", (e) => {
  // Check if the input value is empty
  if (AddCategoryInput.value.trim() === '') {
    AddCategory.style.backgroundColor = 'red';
    return; // Exit the function if input is empty
  }

  // Reset background color if input is not empty
  AddCategory.style.backgroundColor = '';

  // Category Add
  const newCategoryelemnt = document.createElement("button");
  newCategoryelemnt.classList.add("catagory-button");
  const newCategoryInnerHTML = `<p>${AddCategoryInput.value}</p>`;
  newCategoryelemnt.innerHTML = newCategoryInnerHTML;
  CategoryZone.append(newCategoryelemnt);

  // Add the category to the select zone
  const optionCreateElemen = document.createElement("option");
  optionCreateElemen.value = AddCategoryInput.value;
  const optionInnerHTML = `${AddCategoryInput.value}`;
  optionCreateElemen.innerHTML = optionInnerHTML;
  selectCategories.append(optionCreateElemen);

  const reminderContainer = document.createElement("div");
  reminderContainer.classList.add('all-learning-containers', AddCategoryInput.value);
  reminderContainerZone.append(reminderContainer);
  AddCategoryInput.value = "";
});

// Add event listener for deleting the category
deleteReminderContainer.addEventListener("click", () => {
  const selectedCategory = selectCategories.value;

  // Remove the category button
  const categoryButtons = document.querySelectorAll(".catagory-button");
  categoryButtons.forEach(button => {
    if (containsText(button, selectedCategory)) {
      button.remove();
    }
  });

  // Remove the category from the select zone
  const optionToRemove = selectCategories.querySelector(`option[value='${selectedCategory}']`);
  if (optionToRemove) {
    optionToRemove.remove();
  }

  // Remove the category div and its content
  const categoryDivToRemove = reminderContainerZone.querySelector(`.${selectedCategory}`);
  if (categoryDivToRemove) {
    categoryDivToRemove.remove();
  }
});

// select the div and elements
const whatsNew = document.querySelector("#whats-new input[type=text]");
const whatsAbout = document.querySelector("#more-about input[type=text]");
const addButton = document.querySelector("#add");

const remimderDataField = document.querySelector('#all-learning-container-zone');

remimderDataField.addEventListener('click', (e) => {
  const deleteButton = e.target.closest('.container-deleteUpdate');
  if (deleteButton) {
    const deleteItem = deleteButton.closest('.reminder-container');
    if (deleteItem) {
      deleteItem.remove();
    }
  }
});

addButton.addEventListener("click", () => {
  const parentDiv = document.createElement("div");
  parentDiv.classList.add("reminder-container");

  const remainderContainer = `
    <div class="remainder-details">
      <div class="container-heading">
        <p>${whatsNew.value}</p>
      </div>
      <div class="container-subHeading">
        <p><span>| </span>${whatsAbout.value}</p>
      </div>
      <div class="container-remimdTime">
        <p>Remind me <span>every</span></p>
        <p>Sunday</p>
        <p>Repeat</p>
        <input type="checkbox">
      </div>
    </div>
    <div class="container-deleteUpdate">
      <img src="./assets/delete.png" alt="">
    </div>`;

  whatsNew.value = "";
  whatsAbout.value = "";
  parentDiv.innerHTML = remainderContainer;
  const remainderDataField = document.querySelectorAll(".all-learning-containers");
  remainderDataField.forEach(container => {
    if (container.classList.contains(selectCategories.value)) {
      container.appendChild(parentDiv);
    }
  });
});

// Showing the container as per category
CategoryZone.addEventListener('click', (e) => {
  const clickedCategoryButton = e.target.closest('.catagory-button');

  if (clickedCategoryButton) {
    const categoryClassName = clickedCategoryButton.textContent;

    // Iterate through reminder containers
    const reminderContainers = reminderContainerZone.querySelectorAll('.all-learning-containers');
    reminderContainers.forEach(container => {
      if (container.classList.contains(categoryClassName)) {
        container.classList.add('visible');
      } else {
        container.classList.remove('visible');
      }
    });
  }
});

// Custom function to check if an element contains specific text
function containsText(element, text) {
  return element.innerText.includes(text);
}
