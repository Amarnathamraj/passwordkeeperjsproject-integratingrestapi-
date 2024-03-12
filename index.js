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
    const searchValue = this.value.toLowerCase(); // get the value entered in the search input field
    const userItems = document.querySelectorAll('#userlist li'); // get all the password items

    for (let i = 0; i < userItems.length; i++) {
        const item = userItems[i];
        const itemText = item.textContent.toLowerCase(); // get the text content of each password item
        if (itemText.includes(searchValue)) {
            item.style.display = 'block'; // Shows the item if it is present the search value
        } else {
            item.style.display = 'none'; // Hides the item if it does not include the search value
        }
    }
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const EmailInput = document.getElementById('text');
    const passwordInput = document.getElementById('passwords');

    const Emailtitle = EmailInput.value;
    const password = passwordInput.value;
    
    const obj = {
        Emailtitle: Emailtitle,
        password: password,
    };

    const newobj = JSON.stringify(obj);
    localStorage.setItem(Emailtitle, newobj); // Use unique key for each expense

    axios
      .post("https://crudcrud.com/api/89ace053211749daa9420db73da66fd6/passdata",obj)
      .then((response) => displayUserOnScreen(response.data))
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    EmailInput.value = "";
    passwordInput.value = "";

  });
  
  window.addEventListener("DOMContentLoaded", () => {
    axios
      .get("https://crudcrud.com/api/89ace053211749daa9420db73da66fd6/passdata")
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
    userItem.style.marginBottom = "10px"; // Add margin to create space between list items
    userList.appendChild(userItem);//appending emailtitle,password,deletebutton,editbutton to userList
  
    deleteBtn.addEventListener("click", function (event) {
      userList.removeChild(userItem);//removes useritem from userlist when delete button is clicked
      updatePasswordCount();//upadte password count as we are deleting item from userlist 
      axios
        .delete(`https://crudcrud.com/api/89ace053211749daa9420db73da66fd6/passdata/${obj._id}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  
    editBtn.addEventListener("click", function (event) {
        userList.removeChild(userItem);
       axios
        .delete(`https://crudcrud.com/api/89ace053211749daa9420db73da66fd6/passdata/${obj._id}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
        document.getElementById("text").value = obj.Emailtitle;
        document.getElementById("passwords").value = obj.password;
        updatePasswordCount();//decreases password count whenn u clickon edit buuton  
        
      });
      updatePasswordCount();//update count initially when u add the items to userlist
};
