
const filterForm = document.getElementById("filter-form");
const quizForm = document.getElementById('quiz-form');
const question_el = document.querySelector('.question');
const answerOptions = quizForm.querySelectorAll('.answer-option');


const choice_a = document.getElementById("choice-A")
const choice_b = document.getElementById("choice-B")
const choice_c = document.getElementById("choice-C")
const choice_d = document.getElementById("choice-D")

const answer_a = document.getElementById("answer-A")
const answer_b = document.getElementById("answer-B")
const answer_c = document.getElementById("answer-C")
const answer_d = document.getElementById("answer-D")

const popupBox = document.getElementById("popup-box");
const closeButton = document.getElementById("box-close-button");
const boxTitle = document.getElementById("box-title");
const boxMsg = document.getElementById("box-message");


const containerCard = document.querySelector(".container-card");
const welcomingBox = document.querySelector(".welcoming-box");
const loader = document.querySelector(".loader-section");


async function getTrivia_Data(category, difficulty) {
    // const apiUrl = `https://opentdb.com/api.php?amount=1&category=20&type=multiple`;
    const apiUrl = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`

    try {
        const response = await fetch(apiUrl);

        // console.log(response);
        return await response.json();
    }

    catch (error) {
        console.error("Error fetching data:", error);
    }
        
      
    // console.log(response.json());
}


// Get Filter data

let selectedCategory;
let selectedDifficulty;

async function store_filterData_and_start_quiz() {
    
    filterForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        loader.style.display = "flex";
        
        welcomingBox.style.display = "none";

        selectedCategory = document.querySelector('input[name="category-filter"]:checked').value;
        selectedDifficulty = document.querySelector('input[name="difficulty-filter"]:checked').value;
        setTimeout(async () => {
            // Data retrieved, hide the loading animation
            loader.style.display = "none";
            
            // Process the fetched data here
            get_data_and_fill(await getTrivia_Data(getCategoryEquivalent(selectedCategory), selectedDifficulty)); // this function processes and displays data
            containerCard.style.display = "flex";
        }, 2000);
        

    });

}

async function retrieveAPI_data_again() {
    get_data_and_fill(await getTrivia_Data(getCategoryEquivalent(selectedCategory), selectedDifficulty));
}

function getCategoryEquivalent(category) {

    if (category === "GK") {
        return 9;
    }
    else if (category === "ScienceComputer") {
        return 18;
    }
    else if (category === "Mythology") {
        return 20;
    }
    else if (category === "History") {
        return 23;
    }
    else if (category ==="Art") {
        return 25;
    }
}

function get_data_and_fill(data) {

    try {
        const {results: [{correct_answer, incorrect_answers, question}]
        } = data;

        fill_letters_and_questions(correct_answer, incorrect_answers, question);

        // Check if the answer is correct when the form is submitted
        quizForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const selectedAnswer = document.querySelector('input[name="answer"]:checked').value;
            const correctAnswer = correct_answer; // Replace with the actual correct answer
            popupBox.style.display = "flex";
            if (selectedAnswer === correctAnswer) {   
                boxTitle.textContent = "CORRECT!"
                boxMsg.textContent = `The correct answer was ${correctAnswer}`
            } else {
                boxTitle.textContent = "INCORRECT!"
                boxMsg.textContent = `The correct answer is ${correctAnswer}`
            }
        });

    } catch (error) {
        console.error("Error processing API data:", error);
    }

    
}

function decodeHtmlEntities(str) {
    // Create a DOM element to parse the string safely
    const tempEl = document.createElement('div');
    tempEl.innerHTML = str;
  
    // Return the decoded text content
    return tempEl.textContent;
  }

function fill_letters_and_questions(correct_answer, incorrect_answers, question) {

    question_el.textContent = decodeHtmlEntities(question);

    choices_list = [choice_a, choice_b, choice_c, choice_d];
    answers_list = [correct_answer, incorrect_answers[0], incorrect_answers[1], incorrect_answers[2]];
    input_list = [answer_a, answer_b, answer_c, answer_d]

    const numbers = new Set();

    let i = 0;
    while (numbers.size < 4) {
        const randomNumber = Math.floor(Math.random() * 4);
        if (!numbers.has(randomNumber)) {
            numbers.add(randomNumber);
            choices_list[i].textContent = choices_list[i].textContent + answers_list[randomNumber];
            input_list[i].value = answers_list[randomNumber]
            i++;
        }
        
    }

}

function reset() {
    choices_list.forEach(element => {
        element.textContent = "";
    });
    popupBox.style.display = "none";
    boxTitle.textContent = "";
    boxMsg.textContent = "";
}

closeButton.addEventListener("click", async () => {
    
    reset();
    await retrieveAPI_data_again();
  });

// get_data_and_fill();

store_filterData_and_start_quiz();







