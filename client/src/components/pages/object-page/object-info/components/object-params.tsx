import { Box } from "@mui/material";
import { useState } from "react";
import BasicTable from "@common/table/basic-table";
import { useSelector } from "react-redux";
import Title from "./title";
import {
  commercialTermsColumns,
  estateOptionsColumns,
  estateTypeColumns,
  locationColumns
} from "@columns/object-page.columns";
// components
import RowTitle from "@components/common/titles/row-title";
import { companiesColumns } from "@columns/companies.columns";
import PageDialogs from "@components/common/dialog/page-dialogs";
// columns
import { contactsColumns } from "@columns/contacts.columns";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";
import { getCompaniesList } from "@store/company/company.store";
import { getContactsList } from "@store/contact/contact.store";

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
  const userCompanies = companiesList.filter((cont) =>
    objectCompanies.includes(cont._id)
  );

  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const { handleOpenContactPage, handleOpenUpdateCompanyPage } =
    useDialogHandlers(setState);

  return (
    <>
      <RowTitle
        title="Локация"
        background="linear-gradient(to right, DarkGoldenRod, OrangeRed)"
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
        background="linear-gradient(to right, ForestGreen, DarkGreen)"
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
        background="linear-gradient(to right, OrangeRed , FireBrick)"
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
        background="linear-gradient(to right, MediumVioletRed , DarkMagenta)"
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
        background="linear-gradient(to right, SteelBlue , DarkSlateBlue)"
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
        background="linear-gradient(to right, Crimson , DarkRed)"
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
