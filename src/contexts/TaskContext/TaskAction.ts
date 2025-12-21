import type { TaskModel } from "../../models/TaskModel";

export declare enum TaskActionTypes {
    START_ACTION = "START_ACTION",
    INTERRUPT_TASK = "INTERRUPT_TASK",
    RESET_STATE = "RESET_STATE"
}

export type TaskActionWithPayload = | {
    type: TaskActionTypes.START_ACTION;
    payload: TaskModel
} | {
    type: TaskActionTypes.INTERRUPT_TASK;
    payload: TaskModel
}

export type TaskActionWithoutPayload = {
    type: TaskActionTypes.RESET_STATE
}

export type TaskActionModel = | TaskActionWithPayload | TaskActionWithoutPayload