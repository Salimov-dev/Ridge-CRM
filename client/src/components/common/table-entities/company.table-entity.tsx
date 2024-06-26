import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import OpenPageElementIconButton from "../button-icons/open-page-element.button-icon";
import { AlignCenter } from "../../../styled/styled-columns";
import { getCompaniesList } from "@store/company/company.store";
import EmptyTd from "../columns/empty-td";
import companiesDialogsState from "@dialogs/dialog-handlers/companies.dialog-handlers";

const Component = styled(Box)`
  display: flex;
  alignitems: center;
  justify-content: center;
`;

const CompanyTableEntity = ({ companies, setState }) => {
  const companiesList = useSelector(getCompaniesList());

  const { handleOpenUpdateCompanyPage } = companiesDialogsState({ setState });

  return (
    <AlignCenter sx={{ display: "flex", flexDirection: "column" }}>
      {companies?.length ? (
        companies.map((company, index) => {
          const companyId = company.company;

          const getCompanyName = (companyId) => {
            const findedCompany = companiesList?.find(
              (item) => item._id === companyId
            );
            return findedCompany?.name;
          };

          return (
            <Component key={companyId}>
              {getCompanyName(companyId)}
              <OpenPageElementIconButton
                title="Открыть компанию"
                height="16px"
                heightButton="12px"
                width="16px"
                onClick={() => handleOpenUpdateCompanyPage(companyId)}
              />
            </Component>
          );
        })
      ) : (
        <EmptyTd />
      )}
    </AlignCenter>
  );
};

export default CompanyTableEntity;
