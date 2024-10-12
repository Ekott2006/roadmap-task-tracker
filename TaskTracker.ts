import { Task, Status } from "./types";

export default class TaskTracker {
  tasks: Task[]
  id: number
  constructor(tasks: Task[] = []) {
    this.tasks = tasks;
    this.id = this.tasks.length == 0 ? 0 : this.tasks.at(-1)!.id;
  }
  read(status?: Status) {
    if (!status) return this.tasks;
    return this.tasks.filter((x) => x.status === status);
  }
  create(description: string) {
    this.id += 1;
    this.tasks.push({
      id: this.id,
      description,
      status: Status.TODO,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
    return this.id;
  }
  update(id: number, description?: string, status?: Status) {
    const index = this.tasks.findIndex((x) => x.id === id);
    if (index === -1) return false;

    this.tasks[index].updatedAt = new Date(Date.now());
    if (description) this.tasks[index].description = description;
    if (status) this.tasks[index].status = status;

    return true;
  }
  remove(id: number) {
    const index = this.tasks.findIndex((x) => x.id === id);
    if (index === -1) return false;

    this.tasks = this.tasks.filter((x) => x.id !== id);
    
    return true;
  }
}

