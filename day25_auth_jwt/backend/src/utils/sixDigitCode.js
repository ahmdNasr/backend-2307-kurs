export function generateRandomSixDigitCode() {
  return Math.random().toString().slice(2, 8);
}
