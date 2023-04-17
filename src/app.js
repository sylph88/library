let myLibrary = [];
const tableBody = document.getElementById("library-table-body");
const form = document.getElementById("form");
const title = document.getElementsByName("title")[0];
const author = document.getElementsByName("author")[0];
const pages = document.getElementsByName("pages")[0];
const readStatus = document.getElementsByName("read-status")[0];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
  let book = new Book(title, author, pages, status);
  myLibrary.push(book);
}

function createRow(book, index) {
  return `
      <tr class="custom-border" data-index=${index}>
          <td class="py-2">${book.title}</td>
          <td class="py-2">${book.author}</td>
          <td class="py-2">${book.pages}</td>
          <td class="py-2">${book.status}</td>
          <td class="py-2">
              <button class="p-1 bg-[#d9f24f] rounded text-black font-bold delete">Delete</button>
          </td>
      </tr>
    `;
}

function renderLibrary(library) {
  tableBody.innerHTML = "";
  library.forEach((book, index) => {
    tableBody.insertAdjacentHTML("beforeend", createRow(book, index));
  });
}

function handleFormSubmission(event) {
  event.preventDefault();

  readStatus.value = readStatus.checked ? "Read" : "Not Read";

  addBookToLibrary(
    title.value,
    author.value,
    parseInt(pages.value),
    readStatus.value
  );

  const newIndex = myLibrary.length - 1;
  const newRow = createRow(myLibrary[newIndex], newIndex);

  tableBody.insertAdjacentHTML("beforeend", newRow);
}

function toggleForm(e) {
  if (e.target != formContainer && !formContainer.contains(e.target)) {
    formOverlay.classList.add("hidden");
    document.removeEventListener("click", toggleForm);
  }
}

//add default book entry to array
addBookToLibrary("A Song of Ice and Fire", "George R.R. Martin", 1088, "Read");
renderLibrary(myLibrary);

//form popup
const addBookBtn = document.getElementById("formPopUp");
const formOverlay = document.getElementById("form-overlay");
const formContainer = document.getElementById("form-container");

addBookBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  formOverlay.classList.remove("hidden");
  document.addEventListener("click", toggleForm);
});

// process form submission
form.addEventListener("submit", handleFormSubmission);

// handle entry deletion
tableBody.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    const currentRow = event.target.closest("tr");
    const bookIndex = parseInt(currentRow.getAttribute("data-index"));

    // remove book instance from array
    myLibrary.splice(bookIndex, 1);
    renderLibrary(myLibrary);
  }
});
