import ConsoleHelper from "./ConsoleHelper";
import FileHelper from "./FileHelper";
import TaskTracker from "./TaskTracker";

const FILE_NAME = "tasks.json";
const fileHelper = new FileHelper(FILE_NAME)

const { command, otherArgs } = ConsoleHelper.parseCmdLine();

const taskTracker = new TaskTracker(fileHelper.get());
const consoleHelper = new ConsoleHelper(taskTracker, command, otherArgs)

switch (command) {
  case "add":
    consoleHelper.addCommand();
    break;
  case "delete":
    consoleHelper.deleteCommand();
    break;
  case "update":
    consoleHelper.updateCommand();
    break;
  case "list":
    consoleHelper.listCommand();
    break;
  case "mark-in-progress":
  case "mark-done":
    consoleHelper.updateStatusCommand();
    break;
  default:
    console.error("ERROR: Arguments cannot be processed");
    break;
}
fileHelper.write(taskTracker.read());
