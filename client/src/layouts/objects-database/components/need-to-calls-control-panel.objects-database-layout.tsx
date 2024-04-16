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

const NeedToCallsControlPanelObjectsDatabase = ({ period, setPeriod }) => {
  const handleChangePeriod = (selectedPeriod) => {
    setPeriod(selectedPeriod);
  };

  return (
    <ChangePeriodsContainer>
      <Box sx={{ display: "flex", alignItems: "center", minWidth: "200px" }}>
        <Typography>Надо позвонить (месяцев):</Typography>
      </Box>
      <ChangePeriodButtonObjectsDatabase
        text="До одного месяца"
        period={period}
        selectedPeriod="beforeOneMonth"
        onClick={() => handleChangePeriod("beforeOneMonth")}
      />
      <ChangePeriodButtonObjectsDatabase
        text="через 1 и до 2"
        period={period}
        selectedPeriod="afterOneMonthUpToTwo"
        onClick={() => handleChangePeriod("afterOneMonthUpToTwo")}
      />
      <ChangePeriodButtonObjectsDatabase
        text="через 2 и до 3"
        period={period}
        selectedPeriod="afterTwoMonthUpToThree"
        onClick={() => handleChangePeriod("afterTwoMonthUpToThree")}
      />
      <ChangePeriodButtonObjectsDatabase
        text="через 3 и более"
        period={period}
        selectedPeriod="afterThreeMonthAndMore"
        onClick={() => handleChangePeriod("afterThreeMonthAndMore")}
      />
      <ChangePeriodButtonObjectsDatabase
        text="без следующего звонка"
        period={period}
        selectedPeriod="withouNextCall"
        onClick={() => handleChangePeriod("withouNextCall")}
      />
    </ChangePeriodsContainer>
  );
};

export default NeedToCallsControlPanelObjectsDatabase;
