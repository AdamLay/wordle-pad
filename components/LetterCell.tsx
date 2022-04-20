import { useDispatch } from "react-redux";
import { ILetter, LetterStatus, toggleLetterStatus } from "../data/appSlice";
import styles from "../styles/Letter.module.css";

interface LetterCellProps {
  letter?: ILetter;
  suggestions?: ILetter[];
}

export default function LetterCell({ letter, suggestions }: LetterCellProps) {
  const dispatch = useDispatch();
  const toggleStatus = () => {
    if (letter?.value) {
      dispatch(toggleLetterStatus({ wordIndex: letter.wordIndex, letterIndex: letter.index }));
    }
  };

  const getCssClass = () => {
    switch (letter?.status) {
      case LetterStatus.Absent:
        return styles.absent;
      case LetterStatus.Present:
        return styles.present;
      case LetterStatus.Correct:
        return styles.correct;
    }
    return styles.pending;
  };

  return (
    <div
      className={`${styles.letter} ${getCssClass()}`}
      onClick={() => toggleStatus()}
    >
      {letter?.value}
      {suggestions?.map((l) => (
        <span className={styles.suggestion}>{l.value}</span>
      ))}
    </div>
  );
}
