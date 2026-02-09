import Config from "./Config.js";
import Element from "./Element.js";

/**
 * This method create new task and push to Todo list
 * @returns {Boolean} returns true after adding task to the list and UI
*/

const AddNewTask = () => {
    let title, desc, id;
    title = Element.Title.value;
    desc = Element.Desc.value;

    // simple validation
    if (title.length <= 5 ) {
        alert('Your task title is empty!')
        return false;
    }

    // new unique id -- simpler version
    let Seconds = new Date().getMilliseconds();
    id = Seconds + Config.TaskList.length + 1;

    // push newly created task to todo array
    Config.TaskList.push({
        id: id,
        title: title,
        description: desc
    });

    // render to the UI
    RenderTasks(Config.TaskList);
    
    // empty input elements    
    Element.Desc.value = '';
    Element.Title.value = '';
    Element.Header.classList.toggle('write');

    return true;
};

/**
 * This method delete task from the array and render to the stage
 * @param {Number} id unique id of selected task to delete
 * @returns {null}
*/

const DeleteTask = (id) => {
    // find the index of task on the array of todo list
    let taskIndex = Config.TaskList.findIndex(task => {
        if (task.id == id) return task;
    });

    // remove the selected task
    Config.TaskList.splice(taskIndex, 1);

    // render all tasks to the UI
    RenderTasks(Config.TaskList);
};

/**
 * This method complete the selected task
 * @param {Number} id unique id of selected task to complete
 * @returns {null}
*/

const CompleteTask = (id) => {
    // loop to update the status 
    Config.TaskList.forEach(task => {
        if(task.id == id) task.completed = !task.completed;
    });

    // render all tasks
    RenderTasks(Config.TaskList); 
};

/**
 * this function will initiate the selected task to edit on UI
 * @param {Number} id selected task to edit
 * it will change the property of selected task [task.editMode = true], doing this and re-rendering to UI, ..
 * will change the selected task, where user can edit the title and description
 */
const InitEditMode = (id) => {
    Config.TaskList.forEach(task => {
        if(task.id == id) task.editMode = true;
        else task.editMode = false;
    });

    // render all tasks
    RenderTasks(Config.TaskList); 
};

// This function will update the editMode property to false
const CloseEditMode = () => {
    Config.TaskList.forEach(task => {
        task.editMode = false;
    });

    // render all tasks
    RenderTasks(Config.TaskList); 
}

/**
 * This method update the edited task and render to the stage
 * @param {Number} id unique id of selected task to edit
 * @param {String} title updated title of the task
 * @param {String} desc updated description of the task
 * @returns {Boolean} return true after updating the task
*/
const EditAndSaveTask = (id, title, desc) => {
    // simple validation
    if (title.length <= 3 ) {
        alert('Your task title is empty!')
        return false;
    }

    // find the selected task and update
    Config.TaskList.forEach(task => {
        if (task.id == id) {
            task.title = title;
            task.description = desc;
            task.editMode = false;
        }
    });

    // render all tasks
    RenderTasks(Config.TaskList); 

    return true;
}

// This function update the task list
// It is called when task is deleted, updated, completed etc
const RenderTasks = (tasks) => {

    // empty the UI first
    Element.TodoList.innerHTML = '';

    // iterate and update accordingly using template literals
    tasks.forEach(task => {        
        let li = `<li data-task-id="${task.id}" 
                class="${ task.completed ? 'complete' : ''} ${ task.editMode ? 'edit' : ''}">
                    <div class="radio" data-button="complete"></div>
                    <div class="content">
                        <h3 contenteditable="${task.editMode ? true : false}">${task.title}</h3>
                        <p contenteditable="${task.editMode ? true : false}">${task.description}</p>
                    </div>
                    <div class="action">
                        ${ task.completed ? `` : `<img src="./images/edit.svg" data-button="edit" />` } 
                        <img src="./images/delete.svg" data-button="delete" />
                    </div>
                    <div class="editaction">
                        <button data-button="editClose">Cancel</button>
                        <button class="addbtn" data-button="editSave">Save</button>
                    </div>
                </li>`;
        // push to the node
        Element.TodoList.insertAdjacentHTML('beforeend', li);
    });

    // empty content to show or not to show
    if (Config.TaskList.length <= 0) {
        Element.EmptyTask.style.display = 'flex';
    }else {
        Element.EmptyTask.style.display = 'none';
    }    
}

// Notification to show or hide 
const ShowNotification = (text) => {
    Element.Notification.style.display = 'flex';
    Element.Notification.getElementsByTagName('p')[0].innerHTML = text;

    setTimeout(() => {
        Element.Notification.style.display = 'none';
    }, 3000);
};


export default {
    AddNewTask,
    DeleteTask,
    CompleteTask,
    InitEditMode,
    CloseEditMode,
    EditAndSaveTask,
    ShowNotification,

    RenderTasks,
}