const TaskStorage = window.localStorage;
const key = "todo-list";

/**
 * This function retrieve todo list with the key 'todo-list'
 * @returns {Array} return empty array if data not found in local storage otherwise task list will be returned
*/
const GetTasks = () => {
    try {  
        let tasks = TaskStorage.getItem(key);
        if (tasks == null) return [];
        else return JSON.parse(tasks);

    }catch (error) {        
        return [];
    }
};

/**
 * This function store data in string to local storage
 * @param {Array} tasks contains the array of all todo list
 * @returns {Boolean} true if no error while storing data 
 */
const SetTasks = (tasks) => {
    try {
        TaskStorage.setItem(key, JSON.stringify(tasks));
        return true;
    }catch (e) {
        return false;
    }
};

// clears the local storage
const ClearTasks = () => {
    TaskStorage.setItem(key, JSON.stringify([]));
}

export default {
    GetTasks,
    SetTasks,
    ClearTasks,
}