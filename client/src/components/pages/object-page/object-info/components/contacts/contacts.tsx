import { useSelector } from "react-redux";
// components
import BasicTable from "@components/common/table/basic-table";
import RowTitle from "@components/common/titles/row-title";
// columns
import { companiesColumns } from "@columns/companies.columns";
import { contactsColumns } from "@columns/contacts.columns";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getCompaniesList } from "@store/company/company.store";
import { getContactsList } from "@store/contact/contact.store";
import { getObjectsLoadingStatus } from "@store/object/objects.store";
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";

const Contacts = ({ object, setState }) => {
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
  const isLoading = useSelector(getObjectsLoadingStatus());
  const isHideCheckbox = true;

  const {
    handleOpenContactPage,
    handleOpenUpdateCompanyPage,
    handleOpenObjectPage
  } = useDialogHandlers(setState);

  return (
    <>
      <RowTitle
        title="Связанные контакты"
        background="linear-gradient(to right, SteelBlue , DarkSlateBlue)"
        margin="16px 0px -4px 0"
      />
      <BasicTable
        items={userContacts}
        itemsColumns={contactsColumns(
          handleOpenContactPage,
          isCurator,
          isHideCheckbox,
          handleOpenUpdateCompanyPage,
          object,
          handleOpenObjectPage
        )}
        isLoading={isLoading}
        isDialogMode={true}
      />
      <RowTitle
        title="Связанные компании"
        background="linear-gradient(to right, Crimson , DarkRed)"
        margin="16px 0px -4px 0"
      />
      <BasicTable
        items={userCompanies}
        itemsColumns={companiesColumns(
          handleOpenUpdateCompanyPage,
          isCurator,
          isHideCheckbox,
          handleOpenObjectPage,
          object,
          handleOpenContactPage
        )}
        isLoading={isLoading}
        isDialogMode={true}
      />
    </>
  );
};

export default Contacts;
