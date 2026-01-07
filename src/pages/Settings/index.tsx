import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { Input } from "../../components/Input";
import { MainTemplate } from "../../templates/MainTemplate";

import style from "../../components/MainForm/styles.module.css";
import { Button } from "../../components/Button";
import { SaveIcon } from "lucide-react";
import { useRef } from "react";
import { showMessage } from "../../adapters/messageAdapter";
import { useTaskContext } from "../../contexts/TaskContext/UseTaskContext";

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTime = useRef<HTMLInputElement>(null);
  const shotBreakTime = useRef<HTMLInputElement>(null);
  const longBreakTime = useRef<HTMLInputElement>(null);

  function handleConfiguration(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors = [];

    const workTimeValue = Number(workTime.current?.value);
    const shotBreakTimeValue = Number(shotBreakTime.current?.value);
    const longBreakTimeValue = Number(longBreakTime.current?.value);

    if (
      isNaN(workTimeValue) ||
      isNaN(shotBreakTimeValue) ||
      isNaN(longBreakTimeValue)
    ) {
      errors.push("Somente números");
    }

    if (workTimeValue < 1 || workTimeValue > 99) {
      errors.push("Digite valores entre 1 e 99 para foco");
    }

    if (shotBreakTimeValue < 1 || shotBreakTimeValue > 30) {
      errors.push("Digite valores entre 1 e 30 para descanso curto");
    }

    if (longBreakTimeValue < 1 || longBreakTimeValue > 60) {
      errors.push("Digite valores entre 1 e 60 para descanso longo");
    }

    if (errors.length > 0) {
      errors.forEach((error) => {
        showMessage.error(error);
      });
      return;
    }

    dispatch({
      type: "CHANGE_SETTINGS",
      payload: {
        workTime: workTimeValue,
        shortBreakTime: shotBreakTimeValue,
        longBreakTime: longBreakTimeValue,
      },
    });

    showMessage.success("Configurações salva com sucesso!");
  }
  return (
    <>
      <MainTemplate>
        <Container>
          <Heading>Configurações</Heading>
        </Container>
        <Container>
          <p style={{ textAlign: "center" }}>
            Modifique as configurações para tempo de foco, descanso curso e
            descanso longo.
          </p>
        </Container>
        <Container>
          <form action="" onSubmit={handleConfiguration} className={style.form}>
            <div className={style.formRow}>
              <Input
                id="workTime"
                labelText="foco"
                ref={workTime}
                type="number"
                defaultValue={state.config.workTime}
              />
            </div>
            <div className={style.formRow}>
              <Input
                id="shortBreakTime"
                labelText="Descanso curto"
                ref={shotBreakTime}
                type="number"
                defaultValue={state.config.shortBreakTime}
              />
            </div>
            <div className={style.formRow}>
              <Input
                id="longBreakTime"
                labelText="Descanso longo"
                ref={longBreakTime}
                type="number"
                defaultValue={state.config.longBreakTime}
              />
            </div>
            <Button
              icon={<SaveIcon />}
              aria-label="Salvar configurações"
              title="Salvar configurações"
            />
          </form>
        </Container>
      </MainTemplate>
    </>
  );
}
