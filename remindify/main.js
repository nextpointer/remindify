// select the div and elements
const whatsNew = document.querySelector("#whats-new input[type=text]");
const whatsAbout = document.querySelector("#more-about input[type=text]");
const remainderDataField = document.querySelector("#all-learning-container");
const addButton = document.querySelector("#add");

remainderDataField.addEventListener("click", (e) => {
  if (e.target.classList.contains("container-deleteUpdate")) {
    const deleteItem = e.target.parentNode;
    deleteItem.remove();
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
  remainderDataField.append(parentDiv);
});

// Add new Category Function
const AddCategory = document.querySelector("#adding-catagory-btn");
const AddCategoryInput = document.querySelector("#adding-catagory-input-value");
const CategoryZone = document.querySelector("#all-catagories");
const selectCategories = document.querySelector("#Catagories");

AddCategory.addEventListener("click", (e) => {
  const newCategoryelemnt = document.createElement("button");
  const optionCreateElemen = document.createElement("option");

  newCategoryelemnt.classList.add("catagory-button");
  optionCreateElemen.value = AddCategoryInput.value;

  const newCategoryInnerHTML = `<p>${AddCategoryInput.value}</p>`;
  const optionInnerHTML = `${AddCategoryInput.value}`;

  newCategoryelemnt.innerHTML = newCategoryInnerHTML;
  optionCreateElemen.innerHTML=optionInnerHTML
  AddCategoryInput.value = "";

  CategoryZone.append(newCategoryelemnt);
  selectCategories.append(optionCreateElemen);
});




