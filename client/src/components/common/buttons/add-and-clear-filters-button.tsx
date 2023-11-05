import { Box, styled, Button, Typography } from "@mui/material";
import ClearFilterButton from "./clear-filter-button";

const AddAndClearFiltersButton = ({
  initialState,
  isInputEmpty,
  reset,
  reverse = false,
  button,
}) => {
  const Component = styled(Box)`
    display: flex;
    flex-direction: ${reverse ? "row-reverse" : "row"};
    margin-bottom: 10px;
    gap: 4px;
  `;

  return (
    <Component>
      {button}
      {isInputEmpty && (
        <ClearFilterButton reset={reset} initialState={initialState} />
      )}
    </Component>
  );
};

export default AddAndClearFiltersButton;
