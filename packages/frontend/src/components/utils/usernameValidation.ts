import improperWords from '../../data/improperWords.json';

export function containsImproperWord(input: string) {
  return improperWords.some(word =>
    input.toLowerCase().includes(word.toLowerCase())
  );
}
