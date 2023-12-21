var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var indexUpdate = 0;
var nameMessage = document.getElementById("nameMessage");
var urlMessage = document.getElementById("urlMessage");

var bookMarkList = [];

if (localStorage.getItem("bookMarks") != null) {
  bookMarkList = JSON.parse(localStorage.getItem("bookMarks"));
  displayData();
}

function addBookMark() {
  if (validationName() == true && validationUrl() == true) {
    var bookMark = {
      name: siteNameInput.value,
      link: siteUrlInput.value,
    };

    bookMarkList.push(bookMark);
    localStorage.setItem("bookMarks", JSON.stringify(bookMarkList));

    console.log(bookMarkList);
    displayData();
    clearForm();
  }
}
function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

function displayData() {
  var cartona = "";
  for (var i = 0; i < bookMarkList.length; i++) {
    cartona += `<tr>
      <td>${i}</td>
      <td>${bookMarkList[i].name}</td>

      <td><a href="${bookMarkList[i].link}" target="_blank" class="btn btn-dark btn-md"> <i class="fa-solid fa-eye pe-1 "></i>  Visit</a></td>



      <td>

        
        <button onclick="deleteItem(${i})" class="btn btn-danger btn-md">  <i class="fas fa-trash-alt pe"></i>  delete</button>
        

      </td>
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function setData(index) {
  indexUpdate = index;
  bookMarkList.splice(index, 1);
  displayData();
}

function deleteItem(index) {
  bookMarkList.splice(index, 1);
  localStorage.setItem("bookMarks", JSON.stringify(bookMarkList));

  displayData();
}

function validationName() {
  var text = siteNameInput.value;

  var regexName = /^[A-Z][a-z]{3,20}$/;

  if (regexName.test(text)) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");

    nameMessage.classList.add("d-none");

    return true;
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    nameMessage.classList.remove("d-none");

    return false;
  }
}

function validationUrl() {
  var text = siteUrlInput.value;

  var regexURL = /^(ftp|http|https):\/\/[^ "]+$/;

  if (regexURL.test(text)) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    urlMessage.classList.add("d-none");

    return true;
  } else {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");

    urlMessage.classList.remove("d-none");

    return false;
  }
}
