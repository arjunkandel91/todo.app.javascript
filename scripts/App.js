import Config from './Config.js';
import Element from './Element.js';
import Todo from './Todo.js';
import Storage from './Storage.js';

// task loading state
Element.Loader.style.display = 'flex';

// data request time
setTimeout(() => {
    Config.TaskList = Storage.GetTasks();
    Todo.RenderTasks(Config.TaskList);

    Element.Loader.style.display = 'none';
}, 500);

// Offline and Online status for internet connection check
window.addEventListener('offline', (e) => {
    Element.NetworkStatus.style.display = 'flex';
});

window.addEventListener('online', (e) => {
    Element.NetworkStatus.style.display = 'none';
});

// write mode to add new tsk
Element.addTaskBlock.onclick = function () {
    Element.Header.classList.add('write');

    Element.Title.focus();
};

// Cancel write mode i.e. remove add task block 
Element.Cancel.onclick = function () {
    Element.Header.classList.remove('write');
};

// Add task to the todo-list
Element.AddTask.onclick = function () {
    Todo.AddNewTask ();

    // save updated tasks to storage
    Storage.SetTasks(Config.TaskList);

    // notification
    Todo.ShowNotification ('Task Created');
};

/**
 * Search functionality search box show/hide
 * search tasks as written on the input box
*/

SearchBtn.onclick = function () {
    this.style.display = 'none';
    SearchBox.style.display = 'flex';
};

CloseSearch.onclick = function () {
    SearchBtn.style.display = 'block';
    SearchBox.style.display = 'none';
};

// search functionality
SearchTxt.onkeyup = function () {
    let query = this.value.toUpperCase();
    let list = TodoList.getElementsByTagName('li');
    console.log (list);
    
    for (let i = 0; i < list.length; i++) {
          var title = list[i].getElementsByTagName('h3')[0];
          var desc = list[i].getElementsByTagName('p')[0];
          title = title.innerText.toUpperCase();
          desc = desc.innerText.toUpperCase();

          if (title.includes(query) || desc.includes(query)) {
                list[i].style.display = 'flex';
          }else {
                list[i].style.display = 'none';
          }
    }
};

// remove shown add task box, delete modal, search input
// edit mode 
// once escape key is pressed
document.addEventListener('keyup', function (e) {
    if (e.code == 'Escape') {
        // close search box
        SearchBtn.style.display = 'block';
        SearchBox.style.display = 'none';

        // close edit mode
        Header.classList.remove('write');

        // delete modal
        Element.DeleteBox.style.display = 'none';
        Element.Overlay.style.display = 'none';

        // edit mode hide
        Todo.CloseEditMode ();
    }
});

// clear all the tasks in the storage
ClearStorage.onclick = function () {
    Storage.ClearTasks();
};


// after dialog modal to delete
Element.DeleteBox.addEventListener('click', function (e) {
    let target = e.target;
    let button = target.getAttribute('data-button');

    // delete close button
    if (button == 'delClose') {
        Element.DeleteBox.style.display = 'none';
        Element.Overlay.style.display = 'none';
    }

    // delete okay button
    if (button == 'delOkay') {
        let TaskId = Element.DeleteBox.getAttribute('data-task-id');
        Todo.DeleteTask(TaskId);

        // save updated tasks to storage
        Storage.SetTasks(Config.TaskList);

        Element.DeleteBox.style.display = 'none';
        Element.Overlay.style.display = 'none';

        // notification
        Todo.ShowNotification ('Task Deleted');
    }
});


// edit, delete tasks
TodoList.addEventListener('click', function (e) {
    let target = e.target;
    let button = target.getAttribute('data-button');

    // delete task
    if (button == 'delete') {
        let li = target.parentElement.parentElement;
        let TaskId = li.getAttribute('data-task-id');

        Element.DeleteBox.style.display = 'flex';
        Element.Overlay.style.display = 'block';

        Element.DeleteBox.setAttribute('data-task-id', TaskId);

        let DelText = Element.DeleteBox.getElementsByTagName('h4')[0];
        DelText.innerText = `Do you want to delete current task?`;
    }

    // complete task
    if (button == 'complete') {
        let li = target.parentElement;
        let TaskId = li.getAttribute('data-task-id');

        Todo.CompleteTask (TaskId);

        // save updated tasks to storage
        Storage.SetTasks(Config.TaskList);

        // notification
        Todo.ShowNotification ('Task Updated');
    }

    // edit task
    if (button == 'edit') {
        let li = target.parentElement.parentElement;
        let TaskId = li.getAttribute('data-task-id');

        Todo.InitEditMode (TaskId);
    }

    // close edit mode
    if (button == 'editClose') {
        Todo.CloseEditMode ();
    }

    // update task
    if (button == 'editSave') {
        let li = target.parentElement.parentElement;
        let TaskId = li.getAttribute('data-task-id');

        let title, desc;
        title = li.getElementsByTagName('h3')[0].innerText;
        desc = li.getElementsByTagName('p')[0].innerText;

        Todo.EditAndSaveTask (TaskId, title, desc);

        // save updated tasks to storage
        Storage.SetTasks(Config.TaskList);

        // notification
        Todo.ShowNotification ('Task Updated');
    }
});