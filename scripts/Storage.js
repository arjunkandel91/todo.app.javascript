const TaskStorage = window.localStorage;

const GetTasks = () => {
    try {  

        let tasks = TaskStorage.getItem('task-list');
        if (tasks == null) return [];
        else return JSON.parse(tasks);

    } catch (error) {
        
        
        return [];

    }
};

const SetTasks = (tasks) => {
    TaskStorage.setItem('task-list', JSON.stringify(tasks));
};


export default {
    GetTasks,
    SetTasks,
}