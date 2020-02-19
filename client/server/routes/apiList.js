const TaskApi = require("../models/taskApi");

class TaskList {
  /**
   * Handles the various APIs for displaying and managing tasks
   * @param {taskApi} taskApi
   */
  constructor(taskApi) {
    this.taskApi = taskApi;
  }
  async showTasks(req, res) {
    const querySpec = {
      query: "SELECT * FROM root r WHERE r.completed=@completed",
      parameters: [
        {
          name: "@completed",
          value: false
        }
      ]
    };

    const items = await this.taskApi.find(querySpec);
    res.render("index", {
      title: "My ToDo List ",
      tasks: items
    });
  }

  async addTask(req, res) {
    const item = req.body;

    await this.taskApi.addItem(item);
    res.redirect("/");
  }

  async completeTask(req, res) {
    const completedTasks = Object.keys(req.body);
    const tasks = [];

    completedTasks.forEach(task => {
      tasks.push(this.taskApi.updateItem(task));
    });

    await Promise.all(tasks);

    res.redirect("/");
  }
}

module.exports = TaskList;
