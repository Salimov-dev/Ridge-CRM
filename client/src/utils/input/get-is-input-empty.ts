type IData = Record<string, string | string[] | null>;
type IInitialState = Record<string, string | string[] | null>;

interface GetIsInputEmptyProps {
  data: IData;
  initialState: IInitialState;
}

export const getIsInputEmpty = ({
  data,
  initialState
}: GetIsInputEmptyProps): boolean => {
  if (typeof data === "object" && typeof initialState === "object") {
    return JSON.stringify(initialState) !== JSON.stringify(data);
  } else {
    console.log("ОШИБКА: data и initialState должны быть объектами");
    return true;
  }
};
