const form = document.querySelector('#passwordform');
const countoftotalpasswords = document.getElementById('passwordCount');

// Function to update password count
function updatePasswordCount() {
    const passwordListItems = document.querySelectorAll('#userlist li');
    const passwordCount = passwordListItems.length;//counts li items entered by user using queryselectorall
    countoftotalpasswords.textContent = passwordCount;//this line used to display passwordcount on browser    
}

// Event listener for input in the search field
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function() {
    const searchValue = this.value.toLowerCase(); // Get the value entered in the search input field
    const userItems = document.querySelectorAll('#userlist li'); // Get all the password items

    for (let i = 0; i < userItems.length; i++) {
        const item = userItems[i];
        const itemText = item.textContent.toLowerCase(); // Get the text content of each password item
        if (itemText.includes(searchValue)) {
            item.style.display = 'block'; // Show the item if it includes the search value
        } else {
            item.style.display = 'none'; // Hide the item if it does not include the search value
        }
    }
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const EmailInput = document.getElementById('text');
    const passwordInput = document.getElementById('passwords');

    const Emailtitle = EmailInput.value;
    const password = passwordInput.value;

    //EmailInput.value = '';
   // passwordInput.value = '';
    
    const obj = {
        Emailtitle: Emailtitle,
        password: password,
    };

    const newobj = JSON.stringify(obj);
    localStorage.setItem(Emailtitle, newobj); // Use unique key for each expense

    axios
      .post("https://crudcrud.com/api/fbbda6f0d4ea46779c01e4a8075ad481/passdata",obj)
      .then((response) => displayUserOnScreen(response.data))
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    EmailInput.value = "";
    passwordInput.value = "";

  });
  
  window.addEventListener("DOMContentLoaded", () => {
    axios
      .get("https://crudcrud.com/api/fbbda6f0d4ea46779c01e4a8075ad481/passdata")
      .then((res) => {
        console.log(res);
        for (var i = 0; i < res.data.length; i++) {
          displayUserOnScreen(res.data[i]);
        }
      })
      .catch((error) => console.log(error));
  });
  
  
  function displayUserOnScreen(obj) {
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(
        `${obj.Emailtitle} - ${obj.password}`
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.style.backgroundColor = "red";
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
     editBtn.style.backgroundColor="yellow";
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);
  
    const userList = document.querySelector("ul");
    userList.appendChild(userItem);
  
    deleteBtn.addEventListener("click", function (event) {
      userList.removeChild(userItem);
      updatePasswordCount();
      axios
        .delete(`https://crudcrud.com/api/fbbda6f0d4ea46779c01e4a8075ad481/passdata/${obj._id}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  
    editBtn.addEventListener("click", function (event) {
        userList.removeChild(userItem);
       // localStorage.removeItem(userDetails.email);
       axios
        .delete(`https://crudcrud.com/api/fbbda6f0d4ea46779c01e4a8075ad481/passdata/${obj._id}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
        document.getElementById("text").value = obj.Emailtitle;
        document.getElementById("passwords").value = obj.password;
        
      });

      updatePasswordCount();
  // Update the password count after adding
};

 // Update the password count initially
