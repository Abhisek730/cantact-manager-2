const btn = document.getElementById("btn");
const name = document.getElementById("name")
const email = document.getElementById("email");
const contactList = document.getElementById("contact-list");
var array = [];

btn.addEventListener("click", function (e) {
    e.preventDefault()
    isValid = form.checkValidity()
    if (isValid) {

        var data = localStorage.getItem("contact")
        var result = JSON.parse(data)
        var details = {
            name: name.value,
            email: email.value
        }

        // To save data in local storage

        if (result == null) {
            array.push(details);
            localStorage.setItem("contact", JSON.stringify(array))
        } else {
            result.push(details)
            localStorage.setItem("contact", JSON.stringify(result))
        }

        // To remvoe old contacts
        contactList.innerHTML = null

        createContact()
        name.value = "";
        email.value = ""
    } else {
        console.log("write properly")
    }



})



function remove(contact, detail) {
    var confirm = window.confirm("Do you want to delete this contact")

    if (confirm) {

        var data = localStorage.getItem("contact");
        var result = JSON.parse(data);
        result.splice(detail, 1)
        localStorage.setItem("contact", JSON.stringify(result));
        var element = contact;
        element.parentElement.remove()
    }
    else {
        console.log("not delted")
    }

}


function createContact() {
    var data = localStorage.getItem("contact")

    var result = JSON.parse(data)

    result.forEach((detail) => {

        const plate = document.createElement("div");
        plate.classList.add("contact")
        plate.innerHTML = ` <p id="nameDisplay">${detail.name}</p>
    <p id="emaildisplay">${detail.email}</p>
    <button id="delete" onclick="remove(this,${result.indexOf(detail)})">Delete</button>`
        contactList.appendChild(plate)
    });
}
createContact()