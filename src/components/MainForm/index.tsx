import styles from "./styles.module.css";
import { PlayCircleIcon } from "lucide-react";
import { Button } from "../Button";
import { Cycles } from "../Cycles";
import { Input } from "../Input";

export function MainForm() {
  return (
    <form className={styles.form} action="">
      <div className={styles.formRow}>
        <Input id="formId" labelText="task" type="text" />
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
