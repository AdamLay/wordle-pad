import { IWord } from "../data/appSlice";
import LetterCell from "./LetterCell";
import styles from "../styles/WordRow.module.css";

interface WordRowProps {
  word: IWord;
}

export default function WordRow({ word }: WordRowProps) {
  const letterKeys = Array.from(Array(5).keys());

  return (
    <div className={styles.wordRow}>
      {letterKeys.map((index) => (
        <LetterCell
          key={index}
          letter={word.letters[index] || {}}
        />
      ))}
    </div>
  );
}
