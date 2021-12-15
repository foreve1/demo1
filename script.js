let todoItems = []; // 未完成任务

let finishedItems = []; // 完成的任务

// 初始化函数
function renderTodoItemList(todoItems, finishedItems) {
    // 获取list-pane的dom元素
    let paneEl = document.querySelector("#todolist > .list-pane");
    // 并把list-pane的html清空
    paneEl.innerHTML = "";
    // 循环未完成的任务
    for (let i = 0; i < todoItems.length; i++) {
        let item = todoItems[i]; // 把每一个未完成的任务赋值给item

        // 创建新的div，并起名class为todo-item
        let itemDiv = document.createElement("div");
        itemDiv.className = "todo-item";

        // 创建新的input框，并设置类型为checkbox
        let inputEl = document.createElement("input");
        inputEl.type = "checkbox";
        // 监听checkbox是否被选中
        inputEl.addEventListener("change", (e) => {
            // 被选中的checkbox任务加入到finishedItems数组中
            finishedItems.push(item);
            setTimeout(() => {
                //   在todoItems中删除被选中的任务
                todoItems.splice(i, 1);
                // 重新初始化任务框
                renderTodoItemList(todoItems, finishedItems);
            }, 500);
            console.log("finshed:", i, todoItems, finishedItems);
        });
        // 创建新的div，并起名class为title
        let titleEl = document.createElement("div");
        titleEl.className = "title";
        // 创建新的div，并起名class为important-flag，并添加text的！
        let importanceEl = document.createElement("div");
        importanceEl.className = "important-flag";
        importanceEl.innerText = "!";
        // 判断此任务是不是重点任务
        if (item.isImportance) {
            // 是重点任务就给div添加class名为open
            importanceEl.classList.add("open");
        }
        // 点击！按钮触发函数
        importanceEl.addEventListener("click", (e) => {
            console.log("click: ", item);
            //   判断点击的任务是不是重点任务  重点任务为true，不是重点任务为false
            if (item.isImportance) {
                item.isImportance = false;
            } else {
                item.isImportance = true;
            }
            // 重新初始化任务框
            renderTodoItemList(todoItems, finishedItems);
        });
        // 创建button按钮，值为X
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        // 点击删除X按钮触发函数
        deleteBtn.addEventListener("click", (e) => {
            setTimeout(() => {
                // 找到下标，并在未完成任务中删除
                todoItems.splice(i, 1);
                // 重新初始化任务框
                renderTodoItemList(todoItems, finishedItems);
            }, 500);
        });
        // 给class名为title的div添加值，为任务的值
        titleEl.innerText = item.title;
        // 把新创建的全部元素添加到itemDiv中
        itemDiv.append(inputEl);
        itemDiv.append(titleEl);
        itemDiv.append(importanceEl);
        itemDiv.append(deleteBtn);
        // 在把div添加到paneEI中
        paneEl.append(itemDiv);
    }
}
// 加载已完成的任务
function renderFinishedItemList(todoItems, finishedItems) {
    // 获取list-pane的dom元素 并清空里面的html
    let paneEl = document.querySelector("#todolist > .list-pane");
    paneEl.innerHTML = "";
    // 把已完成的任务循环
    for (let i = 0; i < finishedItems.length; i++) {
        //   剩下的步骤和初始化函数中的创建div，添加元素是一样的
        let item = finishedItems[i];
        let itemDiv = document.createElement("div");
        itemDiv.className = "todo-item";

        let titleEl = document.createElement("div");
        titleEl.className = "title";

        let importanceEl = document.createElement("div");
        importanceEl.className = "important-flag";
        importanceEl.innerText = "!";
        if (item.isImportance) {
            importanceEl.classList.add("open");
        }

        titleEl.innerText = item.title;

        itemDiv.append(titleEl);
        itemDiv.append(importanceEl);

        paneEl.append(itemDiv);
    }
}

function renderInputPane(todoItems) {
    let inputPaneEl = document.querySelector("#todolist > .input-pane");
    // 获取add-btn的dom元素
    let addBtnEl = inputPaneEl.querySelector("#add-btn");
    // 获取his-btn的dom元素
    let hisBtnEl = inputPaneEl.querySelector("#his-btn");
    // 点击add-btn元素 执行的函数
    addBtnEl.addEventListener("click", (e) => {
        //   获取input框的值
        let inputEl = inputPaneEl.querySelector("input");
        // 把input框的值添加到todoItems数组中
        todoItems.push({
            title: inputEl.value, // 值
            isFinished: false, // 是否完成
            isImportance: false, // 是不是重点任务
        });
        // 控制台输出添加的是任务是什么
        console.log("add a item: ", inputEl.value);
        // 重新初始化任务框
        renderTodoItemList(todoItems, finishedItems);
    });
    // 点击his-btn元素 执行的函数
    hisBtnEl.addEventListener("click", (e) => {
        //   判断his-btn按钮的class列表是不是有一个open的值
        if (hisBtnEl.classList.contains("open")) {
            // 删除his-btn按钮class为open的
            hisBtnEl.classList.remove("open");
            // 重新初始化任务框
            renderTodoItemList(todoItems, finishedItems);
        } else {
            // 添加class值为open的
            hisBtnEl.classList.add("open");
            // 加载已完成的任务
            renderFinishedItemList(todoItems, finishedItems);
        }
    });

    // let btnEl = document.querySelector("#todolist #add-btn");
}

// 执行函数
renderInputPane(todoItems, finishedItems);
renderTodoItemList(todoItems, finishedItems);
