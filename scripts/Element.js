// section selector
var Header = document.getElementById('Header');
var addTaskBlock = document.getElementById('addTaskBlock');
var TodoList = document.getElementById('TodoList');
var EmptyTask = document.getElementById('EmptyTask');
var SearchBtn = document.getElementById('SearchBtn');
var SearchBox = document.getElementById('SearchBox');
var CloseSearch = document.getElementById('CloseSearch');
var SearchTxt = document.getElementById('SearchTxt');
var DeleteBox = document.getElementById('deletebox');
var Overlay = document.getElementById('overlay');
var ClearStorage = document.getElementById('ClearStorage');

var Notification = document.querySelector('.notification');
var NetworkStatus = document.querySelector('.networksts');
var Loader = document.querySelector('.task-loader');

// button selector
var Cancel = document.getElementById('Cancel');
var AddTask = document.getElementById('AddTask');

// input selector
var Title = document.getElementById('Title');
var Desc = document.getElementById('Desc');

export default {
    Header,
    addTaskBlock,
    TodoList,
    EmptyTask,
    SearchBtn,
    SearchBox,
    CloseSearch,
    SearchTxt,
    DeleteBox,
    Overlay,
    ClearStorage,

    Notification,
    NetworkStatus,
    Loader,

    Cancel,
    AddTask,

    Title,
    Desc,
}