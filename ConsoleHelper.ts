import * as process from "process";
import TaskTracker from "./TaskTracker";
import { Status } from "./types";

const stringToStatus = {
  "in-progress": Status.IN_PROGRESS,
  done: Status.DONE,
  todo: Status.TODO,
};

export default class ConsoleHelper {
  args: string[];
  taskTracker: TaskTracker;
  command: any;

  constructor(taskTracker: TaskTracker, command: string, args: string[]) {
    this.args = args;
    this.taskTracker = taskTracker;
    this.command = command;
  }
  addCommand() {
    if (this.args.length !== 1) {
      console.error(
        "ERROR: Invalid Arguments. Either add text or put the text in apostrophe"
      );
      process.exit(1);
    }
    const id = this.taskTracker.create(this.args[0]);
    console.log(`Task added successfully (ID: ${id})`);
  }

  deleteCommand() {
    if (this.args.length !== 1 || isNaN(Number(this.args[0]))) {
      console.error(
        "ERROR: Invalid Arguments. Add only Task ID and the id must be an integer"
      );
      process.exit(1);
    }
    const isSuccess = this.taskTracker.remove(parseInt(this.args[0]));
    if (isSuccess) return;
    console.error("ERROR: ID Doesn't exist");
    process.exit(1);
  }
  updateCommand() {
    if (this.args.length !== 2 || isNaN(Number(this.args[0]))) {
      console.error(
        "ERROR: Invalid Arguments. Add only Task ID and description. ID must be an integer"
      );
      process.exit(1);
    }
    const isSuccess = this.taskTracker.update(
      parseInt(this.args[0]),
      this.args[1]
    );
    if (isSuccess) return;
    console.error("ERROR: ID Doesn't exist");
    process.exit(1);
  }

  updateStatusCommand() {
    if (this.args.length !== 1 || isNaN(Number(this.args[0]))) {
      console.error(
        "ERROR: Invalid Arguments. Add only Task ID and the id must be an integer"
      );
      process.exit(1);
    }
    const status: Status = stringToStatus[this.command.split("mark-")[1]];
    const isSuccess = this.taskTracker.update(
      parseInt(this.args[0]),
      undefined,
      status
    );
    if (isSuccess) return;
    console.error("ERROR: ID Doesn't exist");
    process.exit(1);
  }
  listCommand() {
    if (
      this.args.length > 1 ||
      (this.args.length === 1 && !stringToStatus[this.args[0]])
    ) {
      console.error(
        "ERROR: Invalid Arguments. Arguments too Long. Must be 'todo', 'done', 'in-progress' or left empty"
      );
      process.exit(1);
    }
    const tasks = this.taskTracker.read(stringToStatus[this.args[0]]);
    console.log(tasks);
  }

  static parseCmdLine() {
    const args: string[] = process.argv;
    if (args.length < 3) {
      console.error("ERROR: Insufficient Arguments");
      process.exit(1);
    }
    return { command: args[2].toLowerCase(), otherArgs: args.slice(3) };
  }
}
