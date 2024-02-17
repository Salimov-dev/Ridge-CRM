export function pluralizeDays(number) {
  const cases = [2, 0, 1, 1, 1, 2];
  return ["день", "дня", "дней"][
    number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]
  ];
}
