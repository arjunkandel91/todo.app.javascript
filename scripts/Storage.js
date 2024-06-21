const TaskStorage = window.localStorage;

// load task from storage and return task
const GetTasks = () => {
    try {  
        let tasks = TaskStorage.getItem('task-list');
        if (tasks == null) return [];
        else return JSON.parse(tasks);

    }catch (error) {        
        return [];
    }
};

// add task to the storage
const SetTasks = (tasks) => {
    TaskStorage.setItem('task-list', JSON.stringify(tasks));
};

export default {
    GetTasks,
    SetTasks,
}