import type { TaskStateModel } from "../../models/TaskStateModel";
import { TaskActionTypes, type TaskActionModel } from "./TaskAction";

export function taskReducer(state: TaskStateModel, action: TaskActionModel): TaskStateModel {
    switch (action.type) {
        case TaskActionTypes.START_ACTION:
            return state;
        case TaskActionTypes.INTERRUPT_TASK:
            return state
        case TaskActionTypes.RESET_STATE:
            return state
    }

    return state
}