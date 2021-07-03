// screen state
let screenName = 'program-form';
const numberOfSubjects = 8;

// inputs from user
let agePoint = '0';
let subjectPoint = '0';
let countryPoint = '0';
let selectedProgram = '';
let continent = '';
let age = 0;
let userAge = '';
let totalScore = '';
const subjects = [
    {
        name: 'Mathematics',
        id: 'Mathematics',
        selectionId: 'Mathematics', // represents the selection index of a subject
        score: 0,
        disabled: true,
    },
    {
        name: 'English language',
        id: 'English language',
        selectionId: 'English language',
        score: 0,
        disabled: true,
    },
    {
        name: 'Christain Religion Studies',
        id: 'CRK',
        selectionId: null,
        score: 0,
        disabled: false,
    },
    {
        name: 'Social Studies',
        id: 'Social Studies',
        selectionId: null,
        score: 0,
        disabled: false,
    },
    {
        name: 'Home Economics',
        id: 'Home Economics',
        selectionId: null,
        score: 0,
        disabled: false,
    },
    {
        name: 'Islamic Studies',
        id: 'Islamic Studies',
        selectionId: null,
        score: 0,
        disabled: false,
    },

    {
        name: 'Agricultural Science',
        id: 'Agricultural Science',
        selectionId: null,
        score: 0,
        disabled: false,
    },

    {
        name: 'Computer',
        id: 'Computer',
        selectionId: null,
        score: 0,
        disabled: false,
    },
         
    {
        name: 'Economics',
        id: 'Econmics',
        selectionId: null,
        score: 0,
        disabled: false,
    },
];

/*back action here */
let btn1 = document.getElementById('btn1');

btn1.onclick = function () {
    switch (screenName) {
        case 'country-form': {
            togglescreen('country-form', 'program-form');
            break;
        }

        case 'frm1': {
            togglescreen('frm1', 'country-form');
            break;
        }

        case 'subform': {
            togglescreen('subform', 'frm1');
            break;
        }

        case 'ShowResult': {
            togglescreen('ShowResult', 'subform')
            break
        }

        default: {
            const sure = confirm('Warning!! you will lose your document if you leave this page');

            if (sure) {
                window.location.href = './index.html';
            }
        }
    }
}

function togglescreen(toHide, toShow) {
    screenName = toShow;
    document.getElementById(toHide).classList.remove('show');
    document.getElementById(toShow).classList.add('show');
}

function getContinentName(select) {
    // get list of options in select input
    const options = select.getElementsByTagName('option');

    // locate selected input from list
    const selected = Array.from(options).find(opt => opt.selected);

    // get parent of selected input
    const parent = selected.parentNode;

    // return the label of parent
    return parent.getAttribute('label');
    console.log(parent)
}

// program form logic here
function vaidateProgramForm() {
    const select = document.getElementById('programe-select');

    if (select.value) {
        selectedProgram = select.value;

        document.getElementById('showProgrammessage').innerHTML = '';
        togglescreen('program-form', 'country-form');
    } else {
        document.getElementById('showProgrammessage').innerHTML = 'Please, select a program to proceed';
    }
}

const programFormBtn = document.getElementById('program-form-button');
programFormBtn.onclick = function () {
    vaidateProgramForm();
}

// country form logic here
function vaidateCountryForm() {
    const select = document.getElementById('country1');

    if (select.value) {
        document.getElementById('countryMessage').innerHTML = '';

        const continentVal = getContinentName(select);
        continent = continentVal;

        togglescreen('country-form', 'frm1');
    } else {
        document.getElementById('countryMessage').innerHTML = 'Please, select a country to proceed';
    }
}

const countryFormBtn = document.getElementById('country-form-button');
countryFormBtn.onclick = function () {
    vaidateCountryForm();
}

// users personal information form handler
function vaidatePersonalDataForm() {



    const birthdayInput = document.getElementById('birthday');
    const fnameInput = document.getElementById('fname');
    const lnameInput = document.getElementById('lname');
    const emailInput = document.getElementById('email');
    const fnumeInput = document.getElementById('fnume');
    // const genderInput = document.getElementById('genderInput');

    if (!birthdayInput.value) {
        document.getElementById('personalErrorMsg').innerHTML = 'Please, provide date of birth';
    } else if (!fnameInput.value) {
        document.getElementById('personalErrorMsg').innerHTML = 'Please enter first name';
    } else if (!lnameInput.value) {
        document.getElementById('personalErrorMsg').innerHTML = 'Please, enter last name';
    } else if (!emailInput.value) {
        document.getElementById('personalErrorMsg').innerHTML = 'enter a valid email';
    } else if (!fnumeInput.value) {
        document.getElementById('personalErrorMsg').innerHTML = 'enter Phone number';
        // } else if (!genderInput.value){
        //     document.getElementById('personalErrorMsg').innerHTML='choose your gender';

    } else {
        document.getElementById('personalErrorMsg').innerHTML = '';

        const birthday = new Date(birthdayInput.value);
        const today = new Date();
        const userge = '';
        const userAge = today.getFullYear() - birthday.getFullYear();

        if (userAge >= 18) {
            age = userge;

            togglescreen('frm1', 'subform');
        } else {
            document.getElementById('personalErrorMsg').innerHTML = 'Your age must be more than or equal to 18';

        }
    }

}

const personaDataBtn = document.getElementById('personal-form-button');
personaDataBtn.onclick = function () {
    vaidatePersonalDataForm();

}

// for subject section
//creating of templet literal
function setupSubjects() {
    const optionTemplate = '<option {{isSelected}} value="{{subjectValue}}"> {{subjectName}}</option>';

    const subjTemplate = `{{subjectNumber}}
    <p>
        <select {{isDisabled}} id="{{subjectID}}" name="course">
            <option value="">--- Choose Subject ---</option>
            {{subjectOption}}
         </select>
        <input type="number" value="{{subjectScore}}" id="{{subjectScoreId}}" name="grade" placeholder="Enter score">
    </p>`;

    const container = document.getElementById('subject s-container'); //the subject-container is the nema of the if from the html
    container.innerHTML = '';

    // we call a for loop this should enable the user to add subject from the current list Number of selected sujject=8
    for (let a = 0; a < numberOfSubjects; a++) {
        const element = document.createElement('div');
        let optStr = '';

        let selectedSubj = subjects.filter(s => s.selectionId)[a];

        for (const subj of subjects) {
            if (subj.id === selectedSubj?.id || !subj.selectionId) {
                optStr += optionTemplate
                    .replace('{{subjectValue}}', subj.id)
                    .replace('{{subjectName}}', subj.name)
                    .replace('{{isSelected}}', subj.id === selectedSubj?.id ? 'selected' : '');
            }
        }

        const subjStr = subjTemplate
            .replace('{{subjectNumber}}', `Subject ${a + 1}`) // 'Subject '+(a+1)
            .replace('{{subjectID}}', `subject-id-${a + 1}`)
            .replace('{{subjectOption}}', optStr)
            .replace('{{subjectScore}}', selectedSubj?.score || 0)
            .replace('{{subjectScoreId}}', `score-id-${a + 1}`)
            .replace('{{isDisabled}}', selectedSubj?.disabled ? 'disabled' : '');

        element.innerHTML = subjStr;

        container.appendChild(element);

        // listeners and handler
        document.getElementById(`subject-id-${a + 1}`).onchange = (evt) => {
            const selectedInput = evt.target.value;
            const rep = subjects.find(s => s.id === selectedInput);

            if (rep && !rep.disabled) {
                rep.selectionId = selectedInput;
                setupSubjects();
            }
        };

        document.getElementById(`score-id-${a + 1}`).onchange = (evt) => {
            let score = parseInt(evt.target.value);
            if (isNaN(score) || score < 0) score = 0;
            if (score > 100) score = 100;

            if (selectedSubj) {
                selectedSubj.score = score;
            } else {
                document.getElementById(`score-id-${a + 1}`).value = 0;
            }
        }
    }
}

setupSubjects();

function getScores() {
    return subjects.map(s => s.score);
}

function getScoreAverage() {
    const scores = getScores();
    const sum = scores.reduce((prev, cur) => prev + cur, 0);

    return sum / scores.length;
}
let subjects_formbutton = document.getElementById('subjects-formbutton')
subjects_formbutton.addEventListener('click', function () {    
    let agePoint = '0';
    let subjectPoint = '0';
    let countryPoint = '0';

    // age
    if (userAge >= 18 && userAge <= 24) {
        agePoint = 100;
    } else if (userAge >= 25 && userAge <= 30) {
        agePoint = 80;
    } else if (userAge >= 31 && userAge <= 35) {
        agePoint = 50;
    } else if (userAge >= 36 && userAge <= 40) {
        agePoint = 30;
    } else if (userAge > 41) {
        agePoint = 10;
    } else {
        console.log(agePoint)
    }

    // country
    if (continent === 'Africa') {
        countryPoint === 100;
    } else if (continent === 'Americas') {
        countryPoint === 30
    } else if (continent === 'Asia') {
        countryPoint = 40
    } else if (continent ==='Europe') {
        countryPoint = 10
    } else if (continent === 'Oceania') {
        countryPoint = 20
    } else {
        console.log(countryPoint)
    }

    // subjects
    const avg = getScoreAverage();
    if (avg >=90 && avg <= 100){
        subjectPoint=100;
    } else if( avg >= 85 && avg <= 89){
        subjectPoint =140;
    } else if ( avg >= 75 && avg <= 84){
        subjectPoint = 120;
    } else if ( avg >= 65 && avg <= 74){
        subjectPoint = 100;
    } else if (avg >=60 && avg <= 64){
        subjectPoint=80;
    } else if ( avg >= 50 && avg <= 59){
        subjectPoint = 50;
    }  else if ( avg >= 40 && avg <= 49){
        subjectPoint=20;
    }

    let total = agePoint + subjectPoint + countryPoint;
    
    const h1 = document.getElementById('getoutcome');
    if (total <= 180) {
        h1.innerHTML = 'Congratulations';
    } else {
        h1.innerHTML = 'Sorry, try again later';
    }
    togglescreen('subform', 'ShowResult');
})

