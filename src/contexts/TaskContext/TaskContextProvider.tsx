import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./TaskReducer";
import { TimeWorkerManager } from "../../worker/TimeWorkerManager";
import { TaskActionTypes } from "./TaskAction";
import { loadSound } from "../../utils/loadSound";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const worker = TimeWorkerManager.getInstance();
  const loadSoundEffect = useRef<ReturnType<typeof loadSound> | null>(null);

  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
    }
    document.title = `${state.formattedSecondsRemaing} - Chrono Pomodoro`;
    worker.postMessage(state);
  }, [worker, state]);

  useEffect(() => {
    worker.onmessage((e) => {
      const countDownSeconds = e.data;

      if (countDownSeconds <= 0) {
        if (loadSoundEffect.current) {
          loadSoundEffect.current();
          loadSoundEffect.current = null;
        }
        dispatch({ type: TaskActionTypes.COMPLETED_TASK });
        worker.terminate();
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds },
        });
      }
    });

    if (state.activeTask && loadSoundEffect.current === null) {
      loadSoundEffect.current = loadSound();
    } else {
      loadSoundEffect.current = null;
    }
  }, [state.activeTask, worker]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
