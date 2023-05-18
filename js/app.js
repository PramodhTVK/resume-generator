const strRegex =  /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

const mainForm = document.getElementById('cv-form');

let firstNameElem = mainForm.firstname;
let middleNameElem = mainForm.middlename;
let lastNameElem = mainForm.lastname;
let imageElem = mainForm.image;
let domainElem = mainForm.domain;
let addressElem = mainForm.address;
let emailElem = mainForm.email;
let phoneElem = mainForm.phoneno;
let summaryElem = mainForm.summary;

const getUserInputs = () =>{

    let achievementTitleElem = document.querySelectorAll('.title');
    let achievementDescElem = document.querySelectorAll('.desc');
    

    return {
        firstname: firstNameElem.value,
        middlename: middleNameElem.value,
        lastname: lastNameElem.value,
        image: imageElem.value,
        domain: domainElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phoneElem.value,
        summary: summaryElem.value,
    }
}

const generateCV = () => {
    let userData = getUserInputs();
    
}