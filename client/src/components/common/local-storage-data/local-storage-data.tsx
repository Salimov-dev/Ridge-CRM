import { useEffect } from "react";

const useLocalStorageData = (name, data, initialState) => {
  const localStorageState = JSON.parse(localStorage.getItem(name));

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem(name);

    if (hasLocalStorageData?.length) {
      localStorage.setItem(name, JSON.stringify(initialState));
    }
  }, []);

  return localStorageState;
};

export default useLocalStorageData;
