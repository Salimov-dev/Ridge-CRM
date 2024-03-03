import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import OpenPageElementIconButton from "../buttons/icons buttons/open-page-element.button-icon";
import { AlignCenter } from "../columns/styled";
import { getCompaniesList } from "@store/company/company.store";

const CompanyTableEntity = ({ companies, onOpenCompanyPage }) => {
  const companiesList = useSelector(getCompaniesList());

  return (
    <AlignCenter sx={{ display: "flex", flexDirection: "column" }}>
      {companies.map((company, index) => {
        const companyId = company.company;

        const getCompanyName = (companyId) => {
          const findedCompany = companiesList?.find(
            (item) => item._id === companyId
          );
          return findedCompany?.name;
        };

        return (
          <Box
            key={companyId}
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {getCompanyName(companyId)}
            <OpenPageElementIconButton
              title="Открыть контакт"
              containerWidth="10px"
              height="20px"
              heightButton="20px"
              width="16px"
              onClick={() => onOpenCompanyPage(companyId)}
            />
          </Box>
        );
      })}
    </AlignCenter>
  );
};

export default CompanyTableEntity;
