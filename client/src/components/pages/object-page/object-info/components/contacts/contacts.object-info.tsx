import { useSelector } from "react-redux";
import { Dispatch, FC, SetStateAction } from "react";
// components
import BasicTable from "@components/common/table/basic-table";
import RowTitle from "@components/common/titles/row-title";
// columns
import { companiesColumns } from "@columns/companies.columns";
import { contactsColumns } from "@columns/contacts.columns";
// interfaces
import { IObject } from "@interfaces/object/object.interface";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import { ICompany } from "@interfaces/company/company.inteface";
import { IContact } from "@interfaces/contact/contact.inteface";
// store
import { getCompaniesList } from "@store/company/company.store";
import { getContactsList } from "@store/contact/contact.store";
import { getObjectsLoadingStatus } from "@store/object/objects.store";
import {
  getIsCurrentUserRoleCurator,
  getIsCurrentUserRoleManager
} from "@store/user/users.store";

interface ContactsObjectInfoProps {
  object: IObject | null;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const ContactsObjectInfo: FC<ContactsObjectInfoProps> = ({
  object,
  setState
}): JSX.Element => {
  const contactsList = useSelector(getContactsList());
  const objectContacts = object?.contacts.map((cont) => cont.contact);
  const userContacts = contactsList.filter((cont: IContact) =>
    objectContacts?.includes(cont._id)
  );

  const companiesList = useSelector(getCompaniesList());
  const objectCompanies = object?.companies.map((comp) => comp.company);

  const userCompanies = companiesList.filter((comp: ICompany) =>
    objectCompanies?.includes(comp._id)
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
        itemsColumns={contactsColumns({
          setState: setState,
          isCurrentUserRoleManager: isCurrentUserRoleManager
        })}
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
        itemsColumns={companiesColumns({
          setState: setState,
          isCurrentUserRoleCurator: isCurrentUserRoleCurator
        })}
        isLoading={isLoading}
        isDialogMode={true}
      />
    </>
  );
};

export default ContactsObjectInfo;
