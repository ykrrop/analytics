import React from "react";
import { useGeneratorStore } from "../../store/generatorStore";
import { Spinner } from "../../components/Spinner/Spinner";
import { DoneButton } from "../../components/DoneButton/DoneButton";
import { CloseButton } from "../../components/CloseButton/CloseButton";
import styles from "./GeneratorPage.module.css";

export const GeneratorPage: React.FC = () => {
  const { isLoading, isDone, error, handleGenerate, reset } =
    useGeneratorStore();

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Сгенерируйте готовый csv-файл нажатием одной кнопки
      </p>

      {!isDone ? (
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className={isLoading ? styles.generateBtnLoading : styles.generateBtn}
        >
          {isLoading ? <Spinner /> : "Начать генерацию"}
        </button>
      ) : (
        <div className={styles.doneSection}>
          <DoneButton />
          <div style={{ width: "10px" }} />
          <CloseButton onClick={reset} />
        </div>
      )}

      {isLoading && (
        <p className={styles.loadingText}>идет процесс генерации</p>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
