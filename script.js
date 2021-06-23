

function getContacts() {
    fetch('https://newaccount1624352758614.freshdesk.com/api/v2/contacts', {
        method: "GET",
        headers: {
            "Authorization": "ZDhUbVFLZ094a3dpMVFrdGFmUzpY",
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data);
            for (var i in data) {
                let row = document.createElement('tr');
                row.innerHTML = `
        <td>${data[i].name}</td>
        <td>${data[i].email}</td>
        <td>${data[i].phone}</td>
        <td><button class="${data[i].id}" value="${data[i].id}" onclick="editContact(${data[i].id})">Edit</button>  
        <button class="${data[i].id}" value="${data[i].id}" onclick="deleteContact(${data[i].id})">Delete</button></td>`;
                document.querySelector('.tbody').append(row);
            }
        });
}
getContacts();

function deleteContact(id) {
    fetch(`https://newaccount1624352758614.freshdesk.com/api/v2/contacts/${id}/hard_delete?force=true`, {
        method: "DELETE",
        headers: {
            "Authorization": "ZDhUbVFLZ094a3dpMVFrdGFmUzpY",
            "Content-Type": "application/json"
        }
    })
        .then(data => {
            // console.log(data);
            location.reload();
        })
}

//Edit contacts

function editContact(id) {
    addContactDisp();
    document.querySelector('.addContactButton').innerHTML = "Edit User";
    document.querySelector('.addContact').setAttribute("onsubmit", `editedContact(${id});return false`)
    fetch(`https://newaccount1624352758614.freshdesk.com/api/v2/contacts/${id}`, {
        method: "GET",
        headers: {
            "Authorization": "ZDhUbVFLZ094a3dpMVFrdGFmUzpY",
            "Content-Type": "application/json"
        }
    })
        .then(data => data.json())
        .then(data => {
            document.querySelector('#name').value = data.name;
            document.querySelector('#email').value = data.email;
            document.querySelector('#number').value = data.phone;
        })
}
function editedContact(id) {
    let contact = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let number = document.querySelector("#number").value;
    fetch(`https://newaccount1624352758614.freshdesk.com/api/v2/contacts/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": "ZDhUbVFLZ094a3dpMVFrdGFmUzpY",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: contact,
            email: email,
            phone: number
        })
    }).then(resp => resp.json())
        .then(data => {
            // console.log(data);
            location.reload();
        })
}

//hide and display contact form
function addContactDisp() {
    document.querySelector('.addContactButton').innerHTML = "Add User";
    document.querySelector('.addContact').setAttribute("onsubmit", "addContact();return false")
    if (document.querySelector('.addContact').style.display == "flex") {
        document.querySelector('.addContact').style.display = "none";
    } else {
        document.querySelector('.addContact').style.display = "flex";
    }
}

//Create contacts
function addContact() {
    let contact = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let number = document.querySelector("#number").value;
    fetch('https://newaccount1624352758614.freshdesk.com/api/v2/contacts', {
        method: "POST",
        headers: {
            "Authorization": "ZDhUbVFLZ094a3dpMVFrdGFmUzpY",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: contact,
            email: email,
            phone: number
        })
    }).then(resp => resp.json())
        .then(data => {
            // console.log(data);
            location.reload();
        })
    document.querySelector('.tbody').innerHTML = '';
    getContacts();
}

//List all Tickets
var openCount=0;
var pending=0;
var resolved=0;
var unresoved;
var overdue;
var duetoday;

function getTickets() {
    fetch('https://newaccount1624352758614.freshdesk.com/api/v2/tickets?include=description', {
        method: "GET",
        headers: {
            "Authorization": "ZDhUbVFLZ094a3dpMVFrdGFmUzpY",
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            for (var i in data) {
                let soloTicket = document.createElement('div');
                soloTicket.setAttribute ("class","ticket");
                let priorityno = data[i].priority;
                if(priorityno == 1){
                   var option = `<option value="1" selected>Low</option>
                    <option value="2">Medium</option>
                    <option value="3">High</option>
                    <option value="4">Urgent</option>`
                }else if(priorityno == 2){
                    var option = `<option value="1" >Low</option>
                    <option value="2" selected>Medium</option>
                    <option value="3">High</option>
                    <option value="4">Urgent</option>`
                }else if(priorityno == 3){
                    var option = `<option value="1" >Low</option>
                    <option value="2">Medium</option>
                    <option value="3" selected>High</option>
                    <option value="4">Urgent</option>`
                }else if(priorityno == 4){
                    var option = `<option value="1" >Low</option>
                    <option value="2">Medium</option>
                    <option value="3">High</option>
                    <option value="4" selected>Urgent</option>`
                }

                let statusno = data[i].status;
                if(statusno == 2){
                
                   var statusoption = `<option value="2" selected>Open</option>
                   <option value="3">Pending</option>
                   <option value="4">Resolved</option>
                   <option value="5">Closed</option>`
                }else if(statusno == 3){
                    
                    var statusoption = `<option value="2">Open</option>
                    <option value="3" selected>Pending</option>
                    <option value="4">Resolved</option>
                    <option value="5">Closed</option>`
                }else if(statusno == 4){
                    
                    var statusoption = `<option value="2">Open</option>
                    <option value="3">Pending</option>
                    <option value="4" selected>Resolved</option>
                    <option value="5">Closed</option>`
                }else if(statusno == 5){
                    var statusoption = `<option value="2">Open</option>
                    <option value="3">Pending</option>
                    <option value="4">Resolved</option>
                    <option value="5" selected>Closed</option>`
                }
                
                soloTicket.innerHTML = `
                <div class="ticketContent">
                    <h3>${data[i].subject}</h3>
                    <p>${data[i].description_text}</p>
                </div>
                <div class="priorityStatus">
                    <label for="priority">Priority: </label>
                    <select name="priority" id="priority">
                        ${option}
                      </select><br><br>
                      <label for="status">Status : </label>
                    <select name="status" id="status">
                        ${statusoption}
                      </select>
                </div>`
                
                document.querySelector('.ticketBlock').append(soloTicket);
            }
      
        });
}
getTickets();

