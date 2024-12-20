document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('addBtn');
    const inputBox = document.getElementById('inputbox');
    const taskList = document.getElementById('taskList');

    addBtn.addEventListener('click', () => {
        const taskText = inputBox.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            inputBox.value = "";
        }
    });

    inputBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const taskText = inputBox.value.trim();
            if (taskText !== "") {
                addTask(taskText);
                inputBox.value = "";
            }
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = taskText;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveData();
        });

        span.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveData();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        saveData();
    }

    function saveData() {
        localStorage.setItem("data", taskList.innerHTML);
    }

    function loadData() {
        const data = localStorage.getItem("data");
        if (data) {
            taskList.innerHTML = data;
            Array.from(taskList.getElementsByTagName('li')).forEach(li => {
                const deleteBtn = li.getElementsByTagName('button')[0];
                const span = li.getElementsByTagName('span')[0];

                deleteBtn.addEventListener('click', () => {
                    taskList.removeChild(li);
                    saveData();
                });

                span.addEventListener('click', () => {
                    li.classList.toggle('completed');
                    saveData();
                });
            });
        }
    }

    loadData();
});
