import { Dispatch, FC, SetStateAction } from "react";
// components
import DialogStyled from "@components/common/dialog/dialog-styled";
import CreateCompany from "@components/pages/company/create-company.page";
import UpdateCompany from "@components/pages/company/update-company.page";
// dialogs;
import companiesDialogsState from "@dialogs/dialog-handlers/companies.dialog-handlers";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface CompaniesDialogPagesProps {
  state: IDialogPagesState;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const CompaniesDialogPages: FC<CompaniesDialogPagesProps> = ({
  state,
  setState
}) => {
  const { handleCloseCreateCompanyPage, handleCloseUpdateCompanyPage } =
    companiesDialogsState({ setState });

  return (
    <>
      <DialogStyled
        component={<CreateCompany onClose={handleCloseCreateCompanyPage} />}
        maxWidth="sm"
        onClose={handleCloseCreateCompanyPage}
        open={state.createCompanyPage}
      />
      <DialogStyled
        component={
          <UpdateCompany state={state} onClose={handleCloseUpdateCompanyPage} />
        }
        onClose={handleCloseUpdateCompanyPage}
        maxWidth="sm"
        open={state.updateCompanyPage}
      />
    </>
  );
};

export default CompaniesDialogPages;
