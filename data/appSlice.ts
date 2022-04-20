import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  words: IWord[];
}

const initialState: AppState = {
  words: [
    {
      index: 0,
      letters: []
    }
  ]
};

export interface IWord {
  index: number;
  letters: ILetter[];
}

export interface ILetter {
  index: number;
  wordIndex: number;
  value: string;
  status?: LetterStatus;
}

export enum LetterStatus {
  Absent,
  Present,
  Correct,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addLetter(state, action: PayloadAction<string>) {
      const lastWord = state.words.at(-1) as IWord;

      if (lastWord.letters.length >= 5) {
        const letter: ILetter = {
          wordIndex: state.words.length,
          index: 0,
          value: action.payload
        };
        state.words.push({
          index: state.words.length,
          letters: [
            letter
          ]
        });
      } else {
        const letter: ILetter = {
          wordIndex: lastWord.index,
          index: lastWord.letters.length,
          value: action.payload
        };
        lastWord.letters.push(letter);

        if (lastWord.letters.length === 5) {
          lastWord.letters = lastWord.letters.map(l => ({ ...l, status: LetterStatus.Absent }))
        }
      }
    },
    toggleLetterStatus(state, action: PayloadAction<{ wordIndex: number, letterIndex: number }>) {
      const { wordIndex, letterIndex } = action.payload;
      const word = state.words.at(wordIndex) as IWord;
      const letter = word.letters.at(letterIndex) as ILetter;

      switch (letter.status) {
        case LetterStatus.Absent:
          letter.status = LetterStatus.Present;
          break;
        case LetterStatus.Present:
          letter.status = LetterStatus.Correct;
          break;
        case LetterStatus.Correct:
          letter.status = LetterStatus.Absent;
          break;
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addLetter, toggleLetterStatus } = appSlice.actions

export default appSlice.reducer