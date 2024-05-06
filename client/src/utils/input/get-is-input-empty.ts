interface GetIsInputEmptyProps {
  data: unknown;
  initialState: unknown;
}

export const getIsInputEmpty = ({
  data,
  initialState
}: GetIsInputEmptyProps): boolean => {
  if (typeof data === "object" && typeof initialState === "object") {
    return JSON.stringify(initialState) !== JSON.stringify(data);
  } else {
    console.log("ERROR: data and initialState must be objects");
    return true;
  }
};
