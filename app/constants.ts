// remove
type TaskStatus = "in_progress" | "finished";

export const STATUS_LABELS: Record<TaskStatus, string> = {
  in_progress: "In Progress",
  finished: "Finished",
};
