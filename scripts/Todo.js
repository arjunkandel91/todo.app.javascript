import Config from "./Config.js";
import Element from "./Element.js";

const AddNewTask = () => {
    let title, desc, id;
    title = Element.Title.value;
    desc = Element.Desc.value;

    if (title.length <= 3 || desc.length <=3 ) {
        alert('title and description are empty!')
        return;
    }

    // new id
    id = Config.TaskList.length + 1;

    // push element
    Config.TaskList.push({
        id: id,
        title: title,
        description: desc
    });

    // render all tasks
    RenderTasks(Config.TaskList);
    
    // empty input elements
    
    Element.Desc.value = '';
    Element.Title.value = '';
    Element.Header.classList.toggle('write');

};

const DeleteTask = (id) => {
    let taskIndex = Config.TaskList.findIndex(task => {
        if (task.id == id) return task;
    });

    // remove the selected task
    Config.TaskList.splice(taskIndex, 1);

    // render all tasks
    RenderTasks(Config.TaskList);
};

// complete tasks
const CompleteTask = (id) => {
    Config.TaskList.forEach(task => {
        if(task.id == id) task.completed = !task.completed;
    });

    // move completed task to the end of list
    Config.TaskList.sort((a, b) => {
        if (b.completed) return -1;
    });

    // render all tasks
    RenderTasks(Config.TaskList); 
};

// init edit task
const InitEditMode = (id) => {
    Config.TaskList.forEach(task => {
        if(task.id == id) task.editMode = true;
        else task.editMode = false;
    });

    // render all tasks
    RenderTasks(Config.TaskList); 

};

// close edit mode
const CloseEditMode = () => {
    Config.TaskList.forEach(task => {
        task.editMode = false;
    });

    // render all tasks
    RenderTasks(Config.TaskList); 
}

// edit and save task
const EditAndSaveTask = (id, title, desc) => {
    Config.TaskList.forEach(task => {
        if (task.id == id) {
            task.title = title;
            task.description = desc;
            task.editMode = false;
        }
    });

    // render all tasks
    RenderTasks(Config.TaskList); 
}


const RenderTasks = (tasks) => {

    Element.TodoList.innerHTML = '';

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

        Element.TodoList.insertAdjacentHTML('beforeend', li);

    });

    // empty content
    if (Config.TaskList.length <= 0) {
        Element.EmptyTask.style.display = 'flex';
    }else {
        Element.EmptyTask.style.display = 'none';
    }


    
}

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