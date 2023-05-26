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

//first value is for the attributes and the second one passes the nodelist as the parameter
const fetchValues = (attrs, ...nodeLists)=>{
    let elemsAttrCount = nodeLists.length;//number of nodes in the current division
    let elemsDataCount = nodeLists[0].length;
    //if previous no of number of nodes is n then after the usage of repeater the number of nodes becomes 2n so 2n is nodelists length
    //since all the nodes in the nodelist are expected to be of the same length this works fine so basically this denotes the tota; number of nodes under each category this 
    let tempDataArr = [];

    //first loop deals with no of repeater values
    for(let i=0; i<elemsDataCount; i++){
        let tempObj = {};//create an empty object to fill the data
        //second loop fetches the data for each repeater value or attribute
        for(let j=0; j<elemsAttrCount; j++){
            //setting the key name as the attribute name and the value as the value of the attribute
            tempObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(tempObj);
    }
    return tempDataArr;
}

const getUserInputs = () =>{

    let achievementTitleElem = document.querySelectorAll('.title');
    let achievementDescElem = document.querySelectorAll('.description');

    let expTitleElem = document.querySelectorAll('.exp_title');
    let expOrganisationElem = document.querySelectorAll('.exp_organization');
    let expLocationElem = document.querySelectorAll('.exp_location');
    let expStartDateElem = document.querySelectorAll('.exp_start_date');
    let expEndDateElem = document.querySelectorAll('.exp_end_date');
    let expDescElem = document.querySelectorAll('.exp_description');


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
        achievements: fetchValues(['title', 'description'], achievementTitleElem, achievementDescElem),
        experience: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganisationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescElem)
    }
}

const generateCV = () => {
    let userData = getUserInputs();
    
}