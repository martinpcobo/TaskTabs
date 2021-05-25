// ! Aside Events

// - Create project DOM
let projectBtns = document.getElementsByClassName("prjs__prjs-ctr__prj");
for (const ProjectBtn of projectBtns) {
    ProjectBtn.addEventListener("click", (event) => {
        // * Project info DOM
        userProjects.forEach(projectProperties => {
            if (projectProperties.id == event.target.parentNode.id) {
                let prjInfoCtrDom = document.createElement("p");
                prjInfoCtrDom.innerText = `${projectProperties.name}`;
                const prjInfoCtr = document.getElementById("topBarPrjInfoCtr");
                prjInfoCtr.innerHTML = `
                    <i class="bi bi-star"></i>
                `;
                prjInfoCtr.appendChild(prjInfoCtrDom);
            }
        });
        // * Project Tabs
        userProjects.forEach(projectProperties => {
            if (projectProperties.id == event.target.parentNode.id) {
                // Create tabs
                const prjTabsCtr = document.getElementById("topBarPrjTabsCtr");
                prjTabsCtr.innerHTML = "";
                projectProperties.tabs.forEach(projectTab => {
                    let newTab = document.createElement("div");
                    newTab.className = "prj-info__tabs-ctr__tab tab-link";
                    newTab.id = `${projectTab.id}`;
                    newTab.innerHTML = `
                        <p>${projectTab.name}</p>
                    `;
                    prjTabsCtr.appendChild(newTab);
                });
                // Create event listeners for each tab
                const TabLinks = document.getElementsByClassName("prj-info__tabs-ctr__tab");
                for (const TabLink of TabLinks) {
                    TabLink.addEventListener("click", (event) => {
                        userProjects.forEach(projectProperties => {
                            projectProperties.tabs.forEach(tabProperties => {
                                if (tabProperties.id == event.target.parentNode.id) {
                                    if (tabProperties.overview === false) {
                                        createTabDom(tabProperties); // TODO ACA ME QUEDE
                                    }
                                    else if (tabProperties.overview === true) {
                                        createOverviewDOM(projectProperties);
                                    }
                                }
                            });
                        });
                    });
                }
            }
        });
        // Project overview
        userProjects.forEach(projectProperties => {
            if (projectProperties.id == event.target.parentNode.id) {
                createOverviewDOM(projectProperties);
            }
        });
    });

}

// ! PROJECT EVENTS

// - Create a Project
document.getElementById("prjsBtnCreate").addEventListener("click", () => {
    // * Create alert dom
    let alertDom = document.createElement("div");
    alertDom.className = "alert";
    alertDom.innerHTML = `
        <div class="alert__ctr">
            <div class="alert__info">
                <p>Create Project</p>
                <i id="alertBtnClose" class="bi bi-x-lg"></i>
            </div>
            <form id="alertForm" class="alert__form" action="">
                <div class="alert__form__input">
                    <label for="name">Name</label>
                    <input id="alertProjectName" class="input" type="text" name="name">
                </div>
                <div class="alert__form__input">
                    <label for="color">Color</label>
                    <select name="color" id="alertProjectColor">
                        <option value="orange">Orange</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="purple">Purple</option>
                        <option value="red">Red</option>
                    </select>
                </div>
                <div class="alert__form__buttons">
                    <input class="btn" type="submit">
                </div>
            </form>
        </div>
    `;
    const mainCtr = document.getElementById("mainCtr");
    mainCtr.innerHTML = "";
    mainCtr.appendChild(alertDom);
    document.getElementById("topBarCtr").style.display = "none"; // hide top bar
    // * Close alert
    document.getElementById("alertBtnClose").addEventListener("click", () => {
        location.reload();
    });
    // * Capture data
    document.getElementById("alertForm").addEventListener("submit", (event) => {
        event.preventDefault();
        // storing user given values in them
        let projectName = String(document.getElementById("alertProjectName").value);
        let projectColor = String(document.getElementById("alertProjectColor").value);
        // object creation
        let newProject = { "name": projectName, "color": projectColor };
        newProject = new project(newProject);
        userProjects.push(newProject);
        saveStorage();
    });
});

// ! TASK EVENTS

// - Create Task
document.getElementById("taskBtnCreate").addEventListener("click", () => {
    // Create alert dom
    let alertDom = document.createElement("div");
    alertDom.className = "alert";
    alertDom.innerHTML = `
        <div class="alert__ctr">
            <div class="alert__info">
                <p>Create Task</p>
                <i id="alertBtnClose" class="bi bi-x-lg"></i>
            </div>
            <form id="alertForm" class="alert__form" action="">
                <div class="alert__form__input">
                    <label for="name">Name</label>
                    <input id="alertTaskName" class="input" type="text" name="name">
                </div>
                <div class="alert__form__input">
                    <label for="dueDate">Due date</label>
                    <input id="alertTaskDueDate" class="input" type="" name="date" placeholder="dd/mm/yyyy">
                </div>
                <div class="alert__form__input--description">
                    <label for="description">Description</label>
                    <textarea id="alertTaskDescription" class="textarea" name="description" id=""></textarea>
                </div>
                <div class="alert__form__buttons">
                    <input class="btn" type="submit">
                </div>
            </form>
        </div>
    `;
    const tabCtr = document.getElementById("tabCtr");
    tabCtr.appendChild(alertDom);

    // Close alert
    document.getElementById("alertBtnClose").addEventListener("click", () => {
        tabCtr.removeChild(alertDom);
    });

    // Capture data
    document.getElementById("alertForm").addEventListener("submit", (event) => {
        event.preventDefault();
        // storing user given values in them
        let taskName = String(document.getElementById("alertTaskName").value);
        let taskDueDate = String(document.getElementById("alertTaskDueDate").value);
        let taskDescription = String(document.getElementById("alertTaskDescription").value);
        // object creation
        let newTask = { "name": taskName, "dueDate": parseDate(taskDueDate), "description": taskDescription };
        newTask = new task(newTask);
        userTasks.push(newTask);
        saveStorage();
    });
});
// - Delete a Task
let btnsTaskDelete = document.getElementsByClassName("btnTaskDelete");
for (const task of btnsTaskDelete) {
    task.addEventListener("click", (event) => {
        const taskctr = event.target.parentNode.parentNode.parentNode;
        let i = 0;
        userTasks.forEach(task => {
            if (task.id == taskctr.id) {
                userTasks.splice(i, 1);
            }
            else {
                i++;
            }
        });
        saveStorage();
    });
}
// - Complete a Task
let btnsTaskComplete = document.getElementsByClassName("btnTaskComplete");
for (const task of btnsTaskComplete) {
    task.addEventListener("click", (event) => {
        const taskctr = event.target.parentNode.parentNode.parentNode;
        userTasks.forEach(task => {
            if (task.id == taskctr.id) {
                if (task.doneState === false) {
                    task.doneState = true;
                }
                else if (task.doneState === true) {
                    task.doneState = false;
                }
            }
        });
        saveStorage();
    });
}

// ! GOAL EVENTS
// - Create a Goal
document.getElementById("goalBtnCreate").addEventListener("click", () => {
    // Create alert dom
    let alertDom = document.createElement("div");
    alertDom.className = "alert";
    alertDom.innerHTML = `
        <div class="alert__ctr">
            <div class="alert__info">
                <p>Create Goal</p>
                <i id="alertBtnClose" class="bi bi-x-lg"></i>
            </div>
            <form id="alertForm" class="alert__form" action="">
                <div class="alert__form__input">
                    <label for="name">Name</label>
                    <input id="alertGoalName" class="input" type="text" name="name">
                </div>
                <div class="alert__form__buttons">
                    <input class="btn" type="submit">
                </div>
            </form>
        </div>
    `;
    const tabCtr = document.getElementById("tabCtr");
    tabCtr.appendChild(alertDom);
    // Close alert
    let alertBtnClose = document.getElementById("alertBtnClose");
    alertBtnClose.addEventListener("click", () => {
        tabCtr.removeChild(alertDom);
    });
    // Capture data
    document.getElementById("alertForm").addEventListener("submit", (event) => {
        event.preventDefault();
        // storing user given values in them
        let goalName = String(document.getElementById("alertGoalName").value);
        // object creation
        goalName = { "name": goalName };
        goalName = new goal(goalName);
        userGoals.push(goalName);
        saveStorage();
    });
});
// - Delete a Goal
let btnGoalDelete = document.getElementsByClassName("btnGoalDelete");
for (const goal of btnGoalDelete) {
    goal.addEventListener("click", (event) => {
        const goalctr = event.target.parentNode;
        let i = 0;
        userGoals.forEach(goal => {
            if (goal.id == goalctr.id) {
                userGoals.splice(i, 1);
            }
            else {
                i++
            }
        });
        saveStorage();
    });
}
// - Complete goal
let btnGoalComplete = document.getElementsByClassName("btnGoalComplete");
for (const goal of btnGoalComplete) {
    goal.addEventListener("click", (event) => {
        let goalctr = event.target.parentNode;
        userGoals.forEach(goal => {
            if (goal.id == goalctr.id) {
                if (goal.doneState === false) {
                    goal.doneState = true;
                }
                else if (goal.doneState === true) {
                    goal.doneState = false;
                }
            }
        });
        saveStorage();
    });
}

// ! REMINDER EVENTS
// - Create a Reminder
document.getElementById("reminderBtnCreate").addEventListener("click", () => {
    // Create alert dom
    let alertDom = document.createElement("div");
    alertDom.className = "alert";
    alertDom.innerHTML = `
        <div class="alert__ctr">
            <div class="alert__info">
                <p>Create Reminder</p>
                <i id="alertBtnClose" class="bi bi-x-lg"></i>
            </div>
            <form id="alertForm" class="alert__form" action="">
                <div class="alert__form__input">
                    <label for="name">Name</label>
                    <input id="reminderName" class="input" type="text" name="name">
                </div>
                <div class="alert__form__input">
                    <label for="dueDate">Due date</label>
                    <input id="reminderDueDate" class="input" type="text" name="dueDate" placeholder="dd/mm/yyyy">
                </div>
                <div class="alert__form__buttons">
                    <input class="btn" type="submit">
                </div>
            </form>
        </div>
    `;
    const tabCtr = document.getElementById("tabCtr");
    tabCtr.appendChild(alertDom);

    // Close alert
    let alertBtnClose = document.getElementById("alertBtnClose");
    alertBtnClose.addEventListener("click", () => {
        tabCtr.removeChild(alertDom);
    });

    // Capture data
    document.getElementById("alertForm").addEventListener("submit", (event) => {
        event.preventDefault();
        // storing user given values in them
        let reminderName = String(document.getElementById("reminderName").value);
        let reminderDueDate = String(document.getElementById("reminderDueDate").value);
        // object creation
        let newReminder = { "name": reminderName, "dueDate": parseDate(reminderDueDate) };
        newReminder = new reminder(newReminder);
        userReminders.push(newReminder);
        saveStorage();
    });
});
// - Delete Reminder
let btnsReminderDelete = document.getElementsByClassName("btnReminderDelete");
for (const reminder of btnsReminderDelete) {
    reminder.addEventListener("click", (event) => {
        const reminderctr = event.target.parentNode.parentNode;
        let i = 0;
        userReminders.forEach(reminder => {
            if (reminder.id == reminderctr.id) {
                userReminders.splice(i, 1);
            }
            else {
                i++
            }
        });
        saveStorage();
    });
}
// - Complete Reminder
let btnsReminderComplete = document.getElementsByClassName("btnReminderComplete");
for (const reminder of btnsReminderComplete) {
    reminder.addEventListener("click", (event) => {
        let reminderctr = event.target.parentNode.parentNode;
        userReminders.forEach(reminder => {
            if (reminder.id == reminderctr.id) {
                if (reminder.doneState === true) {
                    reminder.doneState = false;
                }
                else if (reminder.doneState === false) {
                    reminder.doneState = true;
                }
            }
        });
        saveStorage();
    });
}