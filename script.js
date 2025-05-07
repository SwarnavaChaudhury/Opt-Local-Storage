let formEle = document.querySelector("form");
let tbody = document.querySelector("table tbody");
let resetBtn = document.querySelector("#resetBtn");
let editIndex = null;

formEle.addEventListener("submit", (event) => {
    event.preventDefault();
    let userOldData = JSON.parse(localStorage.getItem("userData")) ?? [];

    let userObject = {
        name: event.target.userName.value,
        email: event.target.userEmail.value,
        phone: event.target.userPhone.value,
    };

    if (editIndex !== null) {
        userOldData[editIndex] = userObject;
        editIndex = null;
    } else {
        userOldData.push(userObject);
    }

    localStorage.setItem("userData", JSON.stringify(userOldData));
    userList();
    event.target.reset();

});

let userList = () => {
    tbody.innerHTML = '';
    let userOldData = JSON.parse(localStorage.getItem("userData")) ?? [];
    let rows = '';

    userOldData.forEach((element, index) => {
        rows += `
            <tr>
                <td> ${index + 1} </td>
                <td> ${element.name} </td>
                <td> ${element.email} </td>
                <td> ${element.phone} </td>
                <td> <button onclick="editRow(${index})"> Edit </button> </td>
                <td> <button onclick="removeRow(${index})"> Delete </button> </td>
            </tr>
        `;
    });
    tbody.innerHTML = rows;
};

userList();

let clearAllBtn = document.querySelector("#clearAllBtn");
clearAllBtn.addEventListener("click", () => {
    localStorage.removeItem("userData");
    userList();
});

function removeRow(index) {
    let userOldData = JSON.parse(localStorage.getItem("userData")) ?? [];
    userOldData.splice(index, 1);
    localStorage.setItem("userData", JSON.stringify(userOldData));
    userList();
}

function editRow(index) {
    let userOldData = JSON.parse(localStorage.getItem("userData")) ?? [];
    let user = userOldData[index];

    document.querySelector("#userName").value = user.name;
    document.querySelector("#userEmail").value = user.email;
    document.querySelector("#userPhone").value = user.phone;

    editIndex = index;

    // console.log("editIndex: ", editIndex);
}


resetBtn.addEventListener("click", () => {
    editIndex = null;
});