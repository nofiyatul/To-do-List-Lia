const taskList = document.getElementById('taskList');
        const taskInput = document.getElementById('taskInput');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const saveTasksBtn = document.getElementById('saveTasksBtn');

        // Load tasks from local storage
        function loadTasks() {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.forEach(task => {
                addTaskToList(task.text, task.completed);
            });
        }

        // Add task to the list
        function addTaskToList(taskText, completed = false) {
            const li = document.createElement('li');
            li.textContent = taskText;
            if (completed) li.classList.add('completed');

            const detailInput = document.createElement('textarea');
            detailInput.placeholder = 'Isi detail tugas...';
            detailInput.classList.add('details');

            const detailButton = document.createElement('button');
            detailButton.textContent = 'Tampilkan Detail';

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Hapus';
            removeButton.classList.add('remove-btn');

            li.appendChild(detailInput);
            li.appendChild(detailButton);
            li.appendChild(removeButton);
            taskList.appendChild(li);

            // Event listener for marking the task as completed
            li.addEventListener('click', function() {
                li.classList.toggle('completed');
            });

            // Show/hide task details
            detailButton.addEventListener('click', function() {
                detailInput.style.display = detailInput.style.display === 'none' || detailInput.style.display === '' ? 'block' : 'none';
            });

            // Remove task
            removeButton.addEventListener('click', function(event) {
                event.stopPropagation();
                li.remove();
                saveTasks(); // Save changes after removal
            });
        }

        // Save tasks to local storage
        function saveTasks() {
            const tasks = [];
            taskList.querySelectorAll('li').forEach(li => {
                tasks.push({
                    text: li.firstChild.textContent,
                    completed: li.classList.contains('completed')
                });
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Event listeners
        addTaskBtn.addEventListener('click', function() {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTaskToList(taskText);
                taskInput.value = '';
                saveTasks(); // Save new task
            }
        });

        saveTasksBtn.addEventListener('click', saveTasks);

        // Load tasks when the page loads
        loadTasks();