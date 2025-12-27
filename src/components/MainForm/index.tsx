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
import { Tips } from "../Tips";
import { showMessage } from "../../adapters/messageAdapter";

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const cycleType = nextCycleType(nextCycle);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || "";

  function handelCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput === null) return;

    const taskName = taskNameInput.current?.value.trim();

    if (!taskName) {
      showMessage.info("Digite o nome da tarefa");
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
    showMessage.dismiss();
    showMessage.error("Tarefa interrompida!");
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
          defaultValue={lastTaskName}
        />
      </div>

      <div className={styles.formRow}>
        <Tips nextCycle={cycleType} />
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
