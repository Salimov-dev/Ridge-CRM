import { useSelector } from "react-redux";
// components
import BasicTable from "@components/common/table/basic-table";
import RowTitle from "@components/common/titles/row-title";
// columns
import { companiesColumns } from "@columns/companies.columns";
import { contactsColumns } from "@columns/contacts.columns";
// store
import { getCompaniesList } from "@store/company/company.store";
import { getContactsList } from "@store/contact/contact.store";
import { getObjectsLoadingStatus } from "@store/object/objects.store";
import {
  getIsCurrentUserRoleCurator,
  getIsCurrentUserRoleManager
} from "@store/user/users.store";

const ContactsObjectInfo = ({ object, setState }) => {
  const contactsList = useSelector(getContactsList());
  const objectContacts = object?.contacts.map((cont) => cont.contact);
  const userContacts = contactsList.filter((cont) =>
    objectContacts.includes(cont._id)
  );

  const companiesList = useSelector(getCompaniesList());
  const objectCompanies = object?.companies.map((comp) => comp.company);

  const userCompanies = companiesList.filter((cont) =>
    objectCompanies.includes(cont._id)
  );

  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());
  const isLoading = useSelector(getObjectsLoadingStatus());

  return (
    <>
      <RowTitle
        title="Связанные контакты"
        background="linear-gradient(to right, SteelBlue , DarkSlateBlue)"
        margin="16px 0px -4px 0"
      />
      <BasicTable
        items={userContacts}
        itemsColumns={contactsColumns(setState, isCurrentUserRoleManager)}
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
        itemsColumns={companiesColumns(setState, isCurrentUserRoleCurator)}
        isLoading={isLoading}
        isDialogMode={true}
      />
    </>
  );
};

export default ContactsObjectInfo;
