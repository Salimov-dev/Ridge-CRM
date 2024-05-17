import styled from "@emotion/styled";
import { Box } from "@mui/material";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
import ClearFilterButton from "@components/common/buttons/clear-filter.button";
// icons
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
// initial-states
import { companiesLayoutInitialState } from "@initial-states/layouts/companies-layout.initial-state";
// hooks
import companiesDialogsState from "@dialogs/dialog-handlers/companies.dialog-handlers";
import videoTrainingDialogsState from "@dialogs/dialog-handlers/video-training.dialog-handlers";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const ButtonsCompaniesLayout = ({ data, reset, setState }) => {
  const isInputEmpty =
    JSON.stringify(companiesLayoutInitialState) !== JSON.stringify(data);

  const { handleOpenCreateCompanyPage } = companiesDialogsState({ setState });
  const { handleOpenVideoPlayerPage } = videoTrainingDialogsState({ setState });

  return (
    <Component>
      <ButtonStyled
        title="Создать компанию"
        style="COMPANY"
        variant="contained"
        onClick={handleOpenCreateCompanyPage}
      />
      <ButtonStyled
        title="Видео-инструкция"
        style="VIDEO_INSTR"
        variant="contained"
        icon={<SmartDisplayOutlinedIcon />}
        onClick={handleOpenVideoPlayerPage}
      />
      {isInputEmpty && (
        <ClearFilterButton
          reset={reset}
          initialState={companiesLayoutInitialState}
        />
      )}
    </Component>
  );
};

export default ButtonsCompaniesLayout;
