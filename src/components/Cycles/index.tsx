import { useTaskContext } from "../../contexts/TaskContext/UseTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { nextCycleType } from "../../utils/getNextCycleType";
import styles from "./styles.module.css";

export function Cycles() {
  const { state } = useTaskContext();

  const cycles = Array.from({ length: state.currentCycle });

  const cycleTypeStep = {
    workTime: "foco",
    shortBreakTime: "descanso curto",
    longBreakTime: "descanso longo",
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cyclesDots}>
        {cycles.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const cycleType = nextCycleType(nextCycle);

          return (
            <span
              key={nextCycle}
              className={`${styles.cycleDot} ${styles[cycleType]}`}
              aria-label={`Indicador de cilco de ${cycleTypeStep[cycleType]}`}
              title={`Indicador de cilco de ${cycleTypeStep[cycleType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
