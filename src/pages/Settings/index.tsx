import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { Input } from "../../components/Input";
import { MainTemplate } from "../../templates/MainTemplate";

import style from "../../components/MainForm/styles.module.css";
import { Button } from "../../components/Button";
import { SaveIcon } from "lucide-react";

export function Settings() {
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
          <form action="" className={style.form}>
            <div className={style.formRow}>
              <Input id="workTime" labelText="foco" />
            </div>
            <div className={style.formRow}>
              <Input id="shortBreakTime" labelText="Descanso curto" />
            </div>
            <div className={style.formRow}>
              <Input id="longBreakTime" labelText="Descanso longo" />
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
