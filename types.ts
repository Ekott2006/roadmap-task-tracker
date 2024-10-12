export type Task = {
  id: number;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
};
export enum Status {
  DONE = "done",
  TODO = "todo",
  IN_PROGRESS = "in-progress",
}
