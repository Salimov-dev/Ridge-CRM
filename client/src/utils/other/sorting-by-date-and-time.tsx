const sortingByDateAndTime = ( items ) => {
  const sortedArray = items?.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    // Сначала сравниваем даты
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;

    // Если даты равны, сравниваем времена
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();

    return timeA > timeB ? -1 : timeA < timeB ? 1 : 0;
  });

  return sortedArray;
};

export default sortingByDateAndTime;
