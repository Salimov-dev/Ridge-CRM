import ButtonStyled from "@components/common/buttons/button-styled.button";
import ClearFilterButton from "@components/common/buttons/clear-filter.button";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const Buttons = ({
  initialState,
  reset,
  onOpenCreateCompanyPage,
  isInputEmpty
}) => {
  return (
    <Component>
      <ButtonStyled
        title="Создать компанию"
        style="COMPANY"
        variant="contained"
        onClick={onOpenCreateCompanyPage}
      />
      {isInputEmpty && (
        <ClearFilterButton reset={reset} initialState={initialState} />
      )}
    </Component>
  );
};

export default Buttons;
