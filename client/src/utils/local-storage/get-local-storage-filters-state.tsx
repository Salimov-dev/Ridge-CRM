import dayjs from "dayjs";

interface IGetLocalStorageStateProps {
  title: string;
}

const getLocalStorageFiltersState = ({ title }: IGetLocalStorageStateProps) => {
  const localStorageData = localStorage.getItem(title);

  if (localStorageData) {
    const parsedLocalStorageData = JSON.parse(localStorageData);
    const formatedState = {
      ...parsedLocalStorageData,
      startDate: parsedLocalStorageData?.startDate
        ? dayjs(parsedLocalStorageData?.startDate)
        : null,
      endDate: parsedLocalStorageData?.endDate
        ? dayjs(parsedLocalStorageData?.endDate)
        : null
    };

    return { localStorageData, formatedState };
  }

  return {};
};

export default getLocalStorageFiltersState;
