import { Box, Typography, styled } from "@mui/material";
import ChangePeriodButtonObjectsDatabase from "./change-period-button.objects-database-layout";

const ChangePeriodsContainer = styled(Box)`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  gap: 6px;
  align-items: top;
  justify-content: space-between;
`;

const NoCallsControlPanelObjectsDatabase = ({ period, setPeriod }) => {
  const handleChangePeriod = (selectedPeriod) => {
    setPeriod(selectedPeriod);
  };

  return (
    <ChangePeriodsContainer>
      <Box sx={{ display: "flex", alignItems: "center", minWidth: "200px" }}>
        <Typography>Не было звонков (месяцев):</Typography>
      </Box>
      <ChangePeriodButtonObjectsDatabase
        text="от 1 до 2"
        period={period}
        selectedPeriod="fromOneMonthToTwo"
        onClick={() => handleChangePeriod("fromOneMonthToTwo")}
      />
      <ChangePeriodButtonObjectsDatabase
        text="от 2 до 3"
        period={period}
        selectedPeriod="fromTwoMonthToThree"
        onClick={() => handleChangePeriod("fromTwoMonthToThree")}
      />
      <ChangePeriodButtonObjectsDatabase
        text="более 3"
        period={period}
        selectedPeriod="fromThreeMonthAndMore"
        onClick={() => handleChangePeriod("fromThreeMonthAndMore")}
      />
    </ChangePeriodsContainer>
  );
};

export default NoCallsControlPanelObjectsDatabase;
