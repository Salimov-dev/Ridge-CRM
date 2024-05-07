import dayjs from "dayjs";

interface GetLocalStorageStateProps {
  title: string;
}

interface GetLocalStorageStateReturnValue {
  localStorageData: string | null;
  formatedState: Record<string, string | string[] | null>;
}

const getLocalStorageFiltersState = ({
  title
}: GetLocalStorageStateProps): GetLocalStorageStateReturnValue => {
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

  return { localStorageData: null, formatedState: {} };
};

export default getLocalStorageFiltersState;
