import styles from "./styles.module.css";
import { PlayCircleIcon } from "lucide-react";
import { Button } from "../Button";
import { Cycles } from "../Cycles";
import { Input } from "../Input";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/UseTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { nextCycleType } from "../../utils/getNextCycleType";

export function MainForm() {
  const { state, setState } = useTaskContext();
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

    const secondsRemaing = newTask.duration * 60;

    setState((prevState) => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaing,
        formattedSecondsRemaing: "00:00",
        tasks: [...prevState.tasks, newTask],
      };
    });
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
        />
      </div>

      <div className={styles.formRow}>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <div className={styles.formRow}>
        <Cycles />
      </div>

      <div className={styles.formRow}>
        <Button icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}
