import { TrashIcon } from "lucide-react";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";

import styles from "./styles.module.css";
import { useTaskContext } from "../../contexts/TaskContext/UseTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTask, type SortTaskOptions } from "../../utils/sortTask";
import { useState } from "react";

export function History() {
  const { state } = useTaskContext();

  const [sortState, setSortState] = useState<SortTaskOptions>(() => {
    return {
      tasks: sortTask({
        tasks: state.tasks,
        direction: "desc",
        field: "startDate",
      }),
      field: "startDate",
      direction: "desc",
    };
  });

  function handleSortTask({ field }: Pick<SortTaskOptions, "field">) {
    const newDirection = sortState.direction === "asc" ? "desc" : "asc";

    setSortState({
      tasks: sortTask({
        tasks: state.tasks,
        direction: newDirection,
        field: "startDate",
      }),
      field,
      direction: newDirection,
    });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          <span className={styles.buttonContainer}>
            <Button
              icon={<TrashIcon />}
              color="red"
              aria-label="Apagar histórico"
              title="Apagar histórico"
            />
          </span>
        </Heading>
      </Container>
      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th
                  onClick={() => handleSortTask({ field: "name" })}
                  className={styles.thSort}
                >
                  Tarefa
                </th>
                <th
                  onClick={() => handleSortTask({ field: "duration" })}
                  className={styles.thSort}
                >
                  Dureção
                </th>
                <th
                  onClick={() => handleSortTask({ field: "startDate" })}
                  className={styles.thSort}
                >
                  Data
                </th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {sortState.tasks.map((task) => {
                const taskTypeEnum = {
                  workTime: "Foco",
                  shortBreakTime: "Descanso curto",
                  longBreakTime: "Descanso Longo",
                };
                return (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.duration} min</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{getTaskStatus(task, state.activeTask)}</td>
                    <td>{taskTypeEnum[task.type]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}
