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

      {!isDone && !error ? (
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className={isLoading ? styles.generateBtnLoading : styles.generateBtn}
        >
          {isLoading ? <Spinner /> : "Начать генерацию"}
        </button>
      ) : null}

      {isDone && !error && (
        <div className={styles.doneContainer}>
          <div className={styles.buttonsRow}>
            <DoneButton />
            <div className={styles.buttonGap} />
            <CloseButton onClick={reset} />
          </div>
          <p className={styles.doneText}>файл сгенерирован!</p>
        </div>
      )}

      {error && (
        <div className={styles.errorContainer}>
          <div className={styles.buttonsRow}>
            <button onClick={handleGenerate} className={styles.retryButton}>
              Ошибка
            </button>
            <div className={styles.buttonGap} />
            <CloseButton onClick={reset} />
          </div>
          <p className={styles.errorText}>упс, не то...</p>
        </div>
      )}

      {isLoading && (
        <p className={styles.loadingText}>идет процесс генерации</p>
      )}
    </div>
  );
};
