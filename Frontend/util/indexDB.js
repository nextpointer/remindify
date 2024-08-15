// util/indexDB.js

const dbName = "ReminderAppDB";
const storeName = "Categories";

// Create or open the database
export async function createDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "name" });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

// Add a category to the database
export async function addCategoryToDB(categoryName) {
  const db = await createDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.add({ name: categoryName, reminders: [] });

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

// Get all categories
export async function getCategoryDetails() {
  const db = await createDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

// Add a reminder to a specific category
export async function addReminderToDB(reminderData) {
  const db = await createDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.get(reminderData.category);

    request.onsuccess = (event) => {
      const category = event.target.result;
      category.reminders.push(reminderData);

      const updateRequest = store.put(category);
      updateRequest.onsuccess = () => {
        resolve();
      };
      updateRequest.onerror = (event) => {
        reject(event.target.error);
      };
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

// Get reminders from a specific category
export async function getRemindersFromDB(categoryName) {
  const db = await createDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(categoryName);

    request.onsuccess = (event) => {
      resolve(event.target.result.reminders);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

// Delete a category from the database
export async function deleteCategoryFromDB(categoryName) {
  const db = await createDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(categoryName);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

// Delete a specific reminder from a category
export async function deleteReminderFromDB(categoryName, reminderTitle) {
  const db = await createDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.get(categoryName);

    request.onsuccess = (event) => {
      const category = event.target.result;
      category.reminders = category.reminders.filter(
        (reminder) => reminder.title !== reminderTitle
      );

      const updateRequest = store.put(category);
      updateRequest.onsuccess = () => {
        resolve();
      };
      updateRequest.onerror = (event) => {
        reject(event.target.error);
      };
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}