import { useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useFieldArray } from "react-hook-form";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// components
import AutocompleteStyled from "@components/common/inputs/autocomplete-styled";
import RowTitle from "@components/common/titles/row-title";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import PageDialogs from "@components/common/dialog/page-dialogs";
import OpenPageObjectIconButton from "@components/common/buttons/icons buttons/open-page-object.button-icon";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getContactsList } from "@store/contact/contact.store";
import { getCurrentUserId } from "@store/user/users.store";
import DeleteElementIcon from "@components/common/buttons/icons buttons/delete-element-icon";

const FieldsContact = ({
  data,
  register,
  setValue,
  watch,
  errors,
  setState,
  control
}) => {
  const [openContact, setOpenContact] = useState({
    contactPage: false,
    contact: false
  });

  const {
    fields: fieldContacts,
    append: appenContact,
    remove: removeContact
  } = useFieldArray({
    name: "contacts",
    control
  });

  const currentUserId = useSelector(getCurrentUserId());
  const contactsList = useSelector(getContactsList());
  const filteredContacts = contactsList?.filter(
    (contact) =>
      !fieldContacts.some(
        (fieldCompany) => fieldCompany.contact === contact._id
      )
  );

  const currentUserContacts = contactsList?.filter(
    (cont) => cont.userId === currentUserId
  );
  const watchContactId = watch("contactId");

  const { handleOpenCreateContactPage } = useDialogHandlers(setState);
  const { handleOpenContactPage } = useDialogHandlers(setOpenContact);

  const lastContactIndex = fieldContacts.length - 1;

  const handleChangeContact = (contactIndex, currentState) => {
    const updatedContacts = data.contacts.map((contact, index) => {
      if (index === contactIndex) {
        return { ...contact, isDefault: !currentState }; // Инвертируем состояние текущего объекта
      } else if (contact.isDefault) {
        return { ...contact, isDefault: false }; // Если у другого объекта isDefault был true, устанавливаем его в false
      }
      return contact;
    });

    setValue("contacts", updatedContacts);
  };

  const handleRemoveContact = (index) => {
    handleChangeContact(index, false);
    removeContact(index);
  };
  return (
    <>
      <RowTitle
        title="Связь с контактами"
        background="linear-gradient(to right, SteelBlue , DarkSlateBlue)"
        margin="14px 0 -4px 0"
      />
      {fieldContacts?.map((field, index) => {
        if (field.id) {
          return (
            <Box
              key={field.id}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}
            >
              <DeleteElementIcon onClick={() => handleRemoveContact(index)} />
              <AutocompleteStyled
                label="Контакт"
                register={register}
                name={`contacts.${index}.contact`}
                options={
                  data.contacts?.[index].contact
                    ? contactsList
                    : filteredContacts
                }
                value={data.contacts?.[index].contact}
                errors={errors?.contacts?.[index]?.contact}
                setValue={setValue}
                watchItemId={watchContactId}
                optionLabel={(option) => option?.name}
              />
              <OpenPageObjectIconButton
                containerWidth="112px"
                height="100%"
                width="24px"
                title={null}
                disabled={!data.contacts?.[index].contact}
                onClick={() =>
                  handleOpenContactPage(data.contacts?.[index].contact)
                }
              />
            </Box>
          );
        } else {
          return null;
        }
      })}
      <Box sx={{ width: "100%", display: "flex", gap: "4px" }}>
        <ButtonStyled
          title="Создать контакт"
          style="CREATE_NEW_Contact"
          width="100%"
          size="small"
          icon={<AddCircleIcon />}
          onClick={handleOpenCreateContactPage}
        />
        <ButtonStyled
          title="Добавить контакт"
          style="ADD_NEW_Contact"
          width="100%"
          size="small"
          icon={<ControlPointOutlinedIcon />}
          onClick={() => appenContact({ contact: "" })}
        />
        <ButtonStyled
          title="Удалить контакт"
          style="REMOVE_SOME_NEW"
          width="100%"
          size="small"
          disabled={!data?.contacts?.length}
          icon={<DoNotDisturbOnOutlinedIcon />}
          onClick={() => handleRemoveContact(lastContactIndex)} // передаем функцию removePhone с аргументом
        />
      </Box>
      <PageDialogs state={openContact} setState={setOpenContact} />
    </>
  );
};

export default FieldsContact;
