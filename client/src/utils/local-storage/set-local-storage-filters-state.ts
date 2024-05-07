import { useEffect } from "react";

interface SetLocalStorageStateProps {
  title: string;
  data: Record<string, string | string[] | null>;
}

const setLocalStorageFiltersState = ({
  title,
  data
}: SetLocalStorageStateProps): void => {
  useEffect(() => {
    localStorage.setItem(title, JSON.stringify(data));
  }, [data]);
};

export default setLocalStorageFiltersState;
