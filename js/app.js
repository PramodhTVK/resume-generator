const strRegex =  /^[a-zA-Z\s]*$/; // containing only letters either lowercase or uppercase and accepts whitespaces as well 
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

const mainForm = document.getElementById('cv-form');
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    PHONENO: 'phoneno',
    DIGIT: 'digit',
    ANY: 'any'
}


//user inputs
let firstNameElem = mainForm.firstname;
let middleNameElem = mainForm.middlename;
let lastNameElem = mainForm.lastname;
let imageElem = mainForm.image;
let domainElem = mainForm.domain;
let addressElem = mainForm.address;
let emailElem = mainForm.email;
let phoneElem = mainForm.phoneno;
let summaryElem = mainForm.summary;

//display elements
let nameDisplayElem = document.getElementById('fullname_dsp');
let imageDisplayElem = document.getElementById('image_dsp');
let domainDisplayElem = document.getElementById('domain_dsp');
let phoneNoDisplayElem = document.getElementById('phoneno_dsp');
let emailDisplayElem = document.getElementById('email_dsp');
let addressDisplayElem = document.getElementById('address_dsp');
let summaryDisplayElem = document.getElementById('summary_dsp');
let skillsDisplayElem = document.getElementById('skills_dsp');
let achievementsDisplayElem = document.getElementById('achievements_dsp');
let educationDisplayElem = document.getElementById('education_dsp');
let experienceDisplayElem = document.getElementById('experience_dsp');
let projectsDisplayElem = document.getElementById('projects_dsp');

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
            tempObj[`${attrs[j]}`] = nodeLists[j][i]?.value||"";
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

    let eduSchoolElem = document.querySelectorAll('.edu_school'),
    eduDegreeElem = document.querySelectorAll('.edu_degree'),
    eduCityElem = document.querySelectorAll('.edu_city'),
    eduStartDateElem = document.querySelectorAll('.edu_start_date'),
    eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date'),
    eduDescriptionElem = document.querySelectorAll('.edu_description');

    let projectTitleElem = document.querySelectorAll('.proj_title');
    let projectLinkElem = document.querySelectorAll('.proj-link');
    let projectDescElem = document.querySelectorAll('.proj_description');

    let skillTitleElem = document.querySelectorAll('.skill');

    //event listeners for form validation
    firstNameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'First Name'));
    middleNameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT_EMP, 'Middle Name'));
    lastNameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Last Name'));
    phoneElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Address'));
    domainElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Designation'));

    achievementTitleElem.forEach((elem) => elem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    achievementDescElem.forEach((elem) => elem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    expTitleElem.forEach((elem) => elem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    expOrganisationElem.forEach((elem) => elem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Organisation')));
    expLocationElem.forEach((elem) => elem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Location')));
    expStartDateElem.forEach((elem) => elem.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
    //blur because it makes no sense to use a keyup event for a date picker.So basically when the element loses focus or the user selects an other field this event will be fired and thus the callback function will be called
    expEndDateElem.forEach((elem) => elem.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expDescElem.forEach((elem) => elem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    eduSchoolElem.forEach((elem) => elem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'School')));
    eduDegreeElem.forEach((elem) => elem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Degree')));
    eduCityElem.forEach((elem) => elem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'City')));
    eduStartDateElem.forEach((elem) => elem.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
    eduGraduationDateElem.forEach((elem) => elem.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Graduation Date')));
    eduDescriptionElem.forEach((elem) => elem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    projectTitleElem.forEach((elem) => elem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    projectLinkElem.forEach((elem) => elem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Link')));
    projectDescElem.forEach((elem) => elem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    skillTitleElem.forEach((elem) => elem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Skill')));


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
        experience: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganisationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescElem),
        education: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj-link', 'proj_description'], projectTitleElem, projectLinkElem, projectDescElem),
        skills: fetchValues(['skill'], skillTitleElem)
    }
}

function validateFormData(elem, elemType, elemName){
    //checking for text and non empty string
    if(elemType == validType.TEXT){
        if(!strRegex.test(elem.value) || elem.value.trim().length == 0)addErrMsg(elem,elemName);
        else removeErrMsg(elem);
    }

    if(elemType == validType.TEXT_EMP){
        if(!strRegex.test(elem.value))addErrMsg(elem,elemName);
        else removeErrMsg(elem);
    }

    if(elemType == validType.EMAIL){
        if(!emailRegex.test(elem.value) || elem.value.trim().length == 0)addErrMsg(elem,elemName);
        else removeErrMsg(elem);
    }

    if(elemType == validType.PHONENO){
        if(!phoneRegex.test(elem.value) || elem.value.trim().length == 0)addErrMsg(elem,elemName);
        else removeErrMsg(elem);
    }

    if(elemType == validType.ANY){
        if(elem.value.trim().length == 0)addErrMsg(elem,elemName);
        else removeErrMsg(elem);
    }
    

}

function addErrMsg(elem, elemName){
    elem.nextElementSibling.innerHTML = `${elemName} is invalid`;
    //nextElementSibling because every label has a parent div form-elem and the label name is pretty much the classname.So immediately after the label name we gotta span that is meant to display the error msg
}

function removeErrMsg(elem){
    elem.nextElementSibling.innerHTML = '';
}

const showListData = (listData , listContainer) => {
    listContainer.innerHTML = '';
    //reset the container provides a clean state
    listData.forEach(listItem => {
        let itemElem = document.createElement('div');
        //for every list item we create a div element
        itemElem.classList.add('preview-item');
        //add the css class

        for(let key in listItem){
            //for in loop loops over every property of the object.Since we pass in the object returned by getUserInputs() function this works perfectly fine
            let subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }
        listContainer.appendChild(itemElem);
        //finally append this to the listContainer referenced by the id attribute eg project_dsp
    })
}


const displayCV = (userData) => {
    nameDisplayElem.innerHTML = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
    phoneNoDisplayElem.innerHTML = userData.phoneno;
    emailDisplayElem.innerHTML = userData.email;
    addressDisplayElem.innerHTML = userData.address;
    summaryDisplayElem.innerHTML = userData.summary;
    domainDisplayElem.innerHTML = userData.domain;
    showListData(userData.projects,projectsDisplayElem) 
    showListData(userData.achievements,achievementsDisplayElem)
    showListData(userData.experience,experienceDisplayElem)
    showListData(userData.education,educationDisplayElem)
    showListData(userData.skills,skillsDisplayElem)
}
const generateCV = () => {
    let userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
}

function previewImg(){
    let imgFile = new FileReader();
    //creates a new insteance of FileReader object
    imgFile.readAsDataURL(imageElem.files[0]);
    //starts the first item selected from the fileList once finished the result attribute containes a dataURL representing file's data
    imgFile.onload = function(e){
        //this is called when imgFile is done loading
        imageDisplayElem.src = e.target.result;
        //assign the dataURL to src of the imageElement
    }
}

function printCV(){
    window.print();
}