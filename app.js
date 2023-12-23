let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");


// Button click submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("button clicked");
    formValidation();
  });

// Form validation 
// two state 
// 1. success state
// 2. failure state
let formValidation = () => {
    if (textInput.value === "") { // failure state
        console.log("Failure");
        msg.innerHTML = "Task cannot be blank";
    } else { // success state
        console.log("OK");
        msg.innerHTML = ""
        acceptData();

        // every time we have a success state we have to close the form after clicking on the add button
        add.setAttribute("data-bs-dismiss", "modal")
        add.click(); // to get rid of the submit button again and again clicking consecutive for two time it automatically close the form in the single click

        // IIFE
        // we write the function like this () and invoke the function like this ()  i.e,
        // ()()
        (() => {
            add.setAttribute("data-bs-dismiss", "")
        })();

    }
}

// 1. success state
// step 1:accept and store data 
let data = [{}];

// this function will fetch all the data from this input and then store inside the data object
let acceptData = () => {
    // pushing some data inside the object
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value
    })

    // whenever refreshing the page all the tasks are gone 
    // in order to prevent it form doing so we store them in the local storage
    // i.e, to store all the tasks in our browser
    // store data inside the local storage in the form of key value pairs
    localStorage.setItem("data", JSON.stringify(data));
    // retrieve the data from the local storage
    // localStorage.getItem

    console.log(data);
    createTasks() //
}

// Upload the save data on the screen 
// creating the recent task
let createTasks = () => {
    tasks.innerHTML = ""; // every time this function runs it will clear out all the tasks then it gonna load up this one
    // x and y where x: individually targets all the objects one by one , y: counts the index number of each task i.e, y is used as each individual id for every card we generate
    data.map((x, y) => {
        return (
            tasks.innerHTML += // data is our object and text is the key 
            `<div id=${y}>
                <span class="fw-bold">${x.text}</span>
                <span class="samll text-secondary">${x.date}</span>
                <p>${x.description}</p>

                <span class="options">
                    <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                    <i onclick="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
                </span>
            </div>`);
    })

    resetForm();
};

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1); // delete the task from the array after getting it from the local storage
    localStorage.setItem("data", JSON.stringify(data)); //updating the local storage
    console.log(data);
}

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement; // selected task is the parent element i.e, div
    // while clicking on the edit button we get the respected previous task again by using children method
    textInput.value = selectedTask.children[0].innerHTML;  // span one is the zeroth element
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    // to remove the previous task after editing the existing one 
    // selectedTask.remove();
    deleteTask(e); // updating the given task
}

// reset the form to original state
let resetForm = () => {
    textInput.value = ""
    dateInput.value = ""
    textarea.value = ""
}


// retrieve all the data from the local storage insdie our application
// what ever we are accepting the data from the from 
// we are pushing all the data inside the array 
// and same time whatever we are collecting data inside the array we are pushing the same data into the local storage

// Q. How to retrieve the data from the local storage back to our array whenever we refresh the page?
// what this function is doing 
// every time the page loads up for the first 
// it will get all the data from the local storage and push it inside array
(() => { // IIFE: immediately invoked functional expresion
    data = JSON.parse(localStorage.getItem("data")) || []; // retrieving data from the local storage and it's putting inside data
    createTasks(); // it puts all the data i.e, inside the array onto the page
    console.log(data); //gets all the data from the local storage
})();

// app.js:74 Uncaught TypeError: Cannot read properties of null (reading 'map')
// solve this error
// by setting  the data property in IIFE to || [] to an empty array



// let form = document.getElementById("form");
// let textInput = document.getElementById("textInput");
// let dateInput = document.getElementById("dateInput");
// let textarea = document.getElementById("textarea");
// let msg = document.getElementById("msg");
// let tasks = document.getElementById("tasks");
// let add = document.getElementById("add");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   formValidation();
// });

// let formValidation = () => {
//   if (textInput.value === "") {
//     console.log("failure");
//     msg.innerHTML = "Task cannot be blank";
//   } else {
//     console.log("success");
//     msg.innerHTML = "";
//     acceptData();
//     add.setAttribute("data-bs-dismiss", "modal");
//     add.click();

//     (() => {
//       add.setAttribute("data-bs-dismiss", "");
//     })();
//   }
// };

// let data = [{}];

// let acceptData = () => {
//   data.push({
//     text: textInput.value,
//     date: dateInput.value,
//     description: textarea.value,
//   });

//   localStorage.setItem("data", JSON.stringify(data));

//   console.log(data);
//   createTasks();
// };

// let createTasks = () => {
//   tasks.innerHTML = "";
//   data.map((x, y) => {
//     return (tasks.innerHTML += `
//     <div id=${y}>
//           <span class="fw-bold">${x.text}</span>
//           <span class="small text-secondary">${x.date}</span>
//           <p>${x.description}</p>
  
//           <span class="options">
//             <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
//             <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
//           </span>
//         </div>
//     `);
//   });

//   resetForm();
// };

// let deleteTask = (e) => {
//   e.parentElement.parentElement.remove();
//   data.splice(e.parentElement.parentElement.id, 1);
//   localStorage.setItem("data", JSON.stringify(data));
//   console.log(data);
  
// };

// let editTask = (e) => {
//   let selectedTask = e.parentElement.parentElement;

//   textInput.value = selectedTask.children[0].innerHTML;
//   dateInput.value = selectedTask.children[1].innerHTML;
//   textarea.value = selectedTask.children[2].innerHTML;

//   deleteTask(e);
// };

// let resetForm = () => {
//   textInput.value = "";
//   dateInput.value = "";
//   textarea.value = "";
// };

// (() => {
//   data = JSON.parse(localStorage.getItem("data")) || []
//   console.log(data);
//   createTasks();
// })();
