const btnAddTask = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const inputTextArea = document.querySelector('.app__form-textarea');
const taskList = document.querySelector('.app__section-task-list');
const cancelForm = document.querySelector('.app__form-footer__button--cancel');
const descriptionTaskParagraph = document.querySelector('.app__section-active-task-description');



const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let selectedTask = null;

function updateTask() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

cancelForm.addEventListener('click', () => {
    inputTextArea.value = '';
    formAddTask.classList.add('hidden');
})


function createTaskElement(task) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item'); 

    const svg = document.createElement('div'); 
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    `;

    const paragraph = document.createElement('p');
    paragraph.textContent = task.description;
    paragraph.classList.add('app__section-task-list-item-description');

    const button = document.createElement('button');
    button.classList.add('app_button-edit');

    button.onclick = () => {
        const newDescription = prompt("Qual é o novo nome da tarefa?");

        if(newDescription) {
            task.description = newDescription;
            paragraph.textContent = newDescription;
            updateTask();
        }

    }

    const buttonImg = document.createElement('img'); 
    buttonImg.setAttribute('src', '/imagens/edit.png'); 
    button.appendChild(buttonImg); 

    li.append(svg);
    li.append(paragraph);
    li.append(button);

    li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active').forEach(e => {
                e.classList.remove('app__section-task-list-item-active');
            })

        if(selectedTask == task) {
            descriptionTaskParagraph.textContent = '';
            selectedTask = null;
            return;
        }

        selectedTask = task;
        descriptionTaskParagraph.textContent = task.description;

        li.classList.add('app__section-task-list-item-active');
    };

    return li;
}

btnAddTask.addEventListener('click', () => {
    formAddTask.classList.toggle('hidden');
});

formAddTask.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = {
        description: inputTextArea.value
    };

    tasks.push(task);
    const taskElement = createTaskElement(task); 
    taskList.append(taskElement);
    updateTask();
    inputTextArea.value = '';
    formAddTask.classList.add('hidden');
});

tasks.forEach((task) => {
    const element = createTaskElement(task);
    taskList.append(element);
});
