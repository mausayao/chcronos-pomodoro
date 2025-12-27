import type { TaskStateModel } from "../../models/TaskStateModel";
import { formatCountDown } from "../../utils/formatCountDown";
import { getNextCycle } from "../../utils/getNextCycle";
import { TaskActionTypes, type TaskActionModel } from "./TaskAction";

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_ACTION: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaing = newTask.duration * 60;

      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaing,
        formattedSecondsRemaing: formatCountDown(secondsRemaing),
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaing: 0,
        formattedSecondsRemaing: "00:00",
        tasks: state.tasks.map((task) => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.COMPLETED_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaing: 0,
        formattedSecondsRemaing: "00:00",
        tasks: state.tasks.map((task) => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, completeDate: Date.now() };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.RESET_STATE: {
      return state;
    }
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaing: action.payload.secondsRemaining,
        formattedSecondsRemaing: formatCountDown(
          action.payload.secondsRemaining
        ),
      };
    }
  }
}
