import { useSelector } from "react-redux";
import { RootState } from "../data/store";
import WordRow from "./WordRow";
import styles from "../styles/WordGrid.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addLetter } from "../data/appSlice";
import SuggestionRow from "./SuggestionRow";

export default function WordGrid({}) {
  const words = useSelector((state: RootState) => state.app.words);
  const dispatch = useDispatch();

  const onKeyPress = (evt: KeyboardEvent) => {
    const key = evt.key;
    dispatch(addLetter(key));
  };

  useEffect(() => {
    window.addEventListener("keypress", onKeyPress);
  }, []);

  return (
    <div className={styles.wordGrid}>
      {words.map((word, i) => (
        <WordRow key={i} word={word} />
      ))}
      <SuggestionRow />
    </div>
  );
}
