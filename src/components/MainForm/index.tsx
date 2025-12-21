import styles from "./styles.module.css";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Button } from "../Button";
import { Cycles } from "../Cycles";
import { Input } from "../Input";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/UseTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { nextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/TaskAction";

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const cycleType = nextCycleType(nextCycle);

  function handelCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput === null) return;

    const taskName = taskNameInput.current?.value.trim();

    if (!taskName) {
      alert("Digite um nome para a tarefa");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[cycleType],
      type: cycleType,
    };

    dispatch({ type: TaskActionTypes.START_ACTION, payload: newTask });
  }

  function handleInterruptTask() {
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <form className={styles.form} action="" onSubmit={handelCreateNewTask}>
      <div className={styles.formRow}>
        <Input
          id="formId"
          labelText="task"
          type="text"
          placeholder="Digite algo"
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className={styles.formRow}>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      {state.currentCycle > 0 && (
        <div className={styles.formRow}>
          <Cycles />
        </div>
      )}

      <div className={styles.formRow}>
        {!state.activeTask ? (
          <Button
            type="submit"
            icon={<PlayCircleIcon />}
            aria-label="Iniciar nova tarefa"
            title="Iniciar nova tarefa"
            key={"button_submit"}
          />
        ) : (
          <Button
            type="button"
            icon={<StopCircleIcon />}
            aria-label="Interromper tarefa atual"
            title="Interromper tarefa atual"
            color="red"
            onClick={handleInterruptTask}
            key={"button_interrupt"}
          />
        )}
      </div>
    </form>
  );
}
