import type { TaskModel } from "../../models/TaskModel";

export const TaskActionTypes = {
  START_ACTION: "START_ACTION",
  INTERRUPT_TASK: "INTERRUPT_TASK",
  RESET_STATE: "RESET_STATE",
} as const;

export type TaskActionTypes =
  (typeof TaskActionTypes)[keyof typeof TaskActionTypes];

export type TaskActionWithPayload = {
  type: typeof TaskActionTypes.START_ACTION;
  payload: TaskModel;
};

export type TaskActionWithoutPayload =
  | {
      type: typeof TaskActionTypes.RESET_STATE;
    }
  | {
      type: typeof TaskActionTypes.INTERRUPT_TASK;
    };

export type TaskActionModel = | TaskActionWithPayload | TaskActionWithoutPayload;
