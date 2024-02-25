import { Box } from "@mui/material";
import BasicTable from "@common/table/basic-table";
import Title from "./title";
import {
  commercialTermsColumns,
  estateOptionsColumns,
  estateTypeColumns,
  locationColumns
} from "@columns/object-page.columns";
import { contactsColumns } from "@columns/contacts.columns";
import RowTitle from "@components/common/titles/row-title";
import { useSelector } from "react-redux";
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";
import { getContactsList } from "@store/contact/contact.store";
import { getLastContactsLoadingStatus } from "@store/last-contact/last-contact.store";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
import { useState } from "react";
import { companiesColumns } from "@columns/companies.columns";
import { getCompaniesList } from "@store/company/company.store";
import PageDialogs from "@components/common/dialog/page-dialogs";

const ObjectsParams = ({ object, isLoading }) => {
  const [state, setState] = useState({
    contactPage: false,
    createContactPage: false,
    openContactPage: false,
    contactId: null,
    companyId: null,
    createCompanyPage: false,
    updateCompanyPage: false
  });

  const description = object?.description?.fullDescription;

  const currentUserId = useSelector(getCurrentUserId());

  const objectContacts = object?.contacts.map((cont) => cont.contact);
  const contactsList = useSelector(getContactsList());

  const userContacts = contactsList.filter((cont) =>
    objectContacts.includes(cont._id)
  );

  const companiesList = useSelector(getCompaniesList());
  const objectCompanies = object?.companies.map((comp) => comp.company);
  const userCompanies = companiesList?.filter(
    (comp, index) => comp._id === objectCompanies[index]
  );

  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const { handleOpenContactPage, handleOpenUpdateCompanyPage } =
    useDialogHandlers(setState);
  return (
    <>
      <RowTitle
        title="Локация"
        background="DarkGoldenRod"
        margin="6px 0px -16px 0"
      />
      <BasicTable
        items={[object]}
        itemsColumns={locationColumns}
        isLoading={isLoading}
        isPaginate={false}
        isDialogMode={true}
      />

      <RowTitle
        title="Объект"
        background="ForestGreen"
        margin="6px 0px -16px 0"
      />
      <BasicTable
        items={[object]}
        itemsColumns={estateTypeColumns}
        isLoading={isLoading}
        isPaginate={false}
        isDialogMode={true}
      />

      <RowTitle
        title="Параметры"
        background="OrangeRed"
        margin="6px 0px -16px 0"
      />
      <BasicTable
        items={[object]}
        itemsColumns={estateOptionsColumns}
        isLoading={isLoading}
        isPaginate={false}
        isDialogMode={true}
      />

      <RowTitle
        title="Условия"
        background="MediumVioletRed"
        margin="6px 0px -16px 0"
      />
      <BasicTable
        items={[object]}
        itemsColumns={commercialTermsColumns}
        isLoading={isLoading}
        isPaginate={false}
        isDialogMode={true}
      />

      <RowTitle
        title="Связанные контакты"
        background="Navy"
        margin="6px 0px -16px 0"
      />
      <BasicTable
        items={userContacts}
        itemsColumns={contactsColumns(handleOpenContactPage, isCurator)}
        isLoading={isLoading}
        isDialogMode={true}
      />
      <RowTitle
        title="Связанные компании"
        background="Maroon"
        margin="6px 0px -16px 0"
      />
      <BasicTable
        items={userCompanies}
        itemsColumns={companiesColumns(handleOpenUpdateCompanyPage, isCurator)}
        isLoading={isLoading}
        isDialogMode={true}
      />
      <Title title="Описание" />
      <Box sx={{ marginBottom: "20px", whiteSpace: "pre-line" }}>
        {description ? description : "Нет описания"}
      </Box>
      <PageDialogs state={state} setState={setState} />
    </>
  );
};

export default ObjectsParams;
