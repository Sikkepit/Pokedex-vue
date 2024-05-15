export const useCapitalize = (name) => {
    const firstLetter = name.charAt(0);
    const remainingLetters = name.slice(1);
    return firstLetter.toUpperCase() + remainingLetters;
  }