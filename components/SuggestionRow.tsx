import { useSelector } from "react-redux";
import { ILetter, LetterStatus } from "../data/appSlice";
import { RootState } from "../data/store";
import LetterCell from "./LetterCell";

export default function SuggestionRow() {
  const words = useSelector((state: RootState) => state.app.words);
  const letterKeys = Array.from(Array(5).keys());
  const presentLetters = words.flatMap((word) =>
    word.letters.filter((l) => l.status === LetterStatus.Present)
  );

  return (
    <div style={{ display: "flex", columnGap: "5px", height: "62px", marginTop: "15px" }}>
      {letterKeys.map((index) => {
        const letters = words.map(
          (word) => word.letters[index] || { value: "", status: LetterStatus.Absent }
        );
        const correctLetter = letters.find((l) => l.status === LetterStatus.Correct);
        if (correctLetter) return <LetterCell key={index} letter={correctLetter} />;

        const cannotBe = presentLetters.filter((l) => l.index === index).map((l) => l.value);

        // suggestions = present letters that are not in this index
        const suggestions = Array.from(
          new Set(
            presentLetters
              .filter((l) => cannotBe.findIndex((x) => x === l.value) === -1)
              .map((l) => l.value)
          )
        );

        return <LetterCell key={index} letter={{} as ILetter} suggestions={suggestions} />;
      })}
    </div>
  );
}
