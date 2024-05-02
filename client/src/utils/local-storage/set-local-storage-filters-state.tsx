import { useEffect } from "react";

interface ISetLocalStorageStateProps {
  title: string;
  data: Record<string, any>;
}

const setLocalStorageFiltersState = ({
  title,
  data
}: ISetLocalStorageStateProps) => {
  useEffect(() => {
    localStorage.setItem(title, JSON.stringify(data));
  }, [data]);

  return { setLocalStorageFiltersState };
};

export default setLocalStorageFiltersState;
