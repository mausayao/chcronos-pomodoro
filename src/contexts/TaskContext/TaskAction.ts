import type { TaskModel } from "../../models/TaskModel";

export const TaskActionTypes = {
  START_ACTION: "START_ACTION",
  INTERRUPT_TASK: "INTERRUPT_TASK",
  RESET_STATE: "RESET_STATE",
  COUNT_DOWN: "COUNT_DOWN",
  COMPLETED_TASK: "COMPLETED_TASK"
} as const;

export type TaskActionTypes =
  (typeof TaskActionTypes)[keyof typeof TaskActionTypes];

export type TaskActionWithPayload = 
| {
  type: typeof TaskActionTypes.START_ACTION;
  payload: TaskModel;
} 
| {
  type: typeof TaskActionTypes.COUNT_DOWN;
  payload: {secondsRemaining: number};
};

export type TaskActionWithoutPayload =
  | {
      type: typeof TaskActionTypes.RESET_STATE;
    }
  | {
      type: typeof TaskActionTypes.INTERRUPT_TASK;
    }
  | {
      type: typeof TaskActionTypes.COMPLETED_TASK;
    };

export type TaskActionModel = | TaskActionWithPayload | TaskActionWithoutPayload;
