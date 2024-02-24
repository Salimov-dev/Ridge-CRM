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

  const currentUserId = useSelector(getCurrentUserId());
  const contactsList = useSelector(getContactsList());

  const currentUserContacts = contactsList?.filter(
    (cont) => cont.userId === currentUserId
  );
  const watchContactId = watch("contactId");

  const { handleOpenCreateContactPage } = useDialogHandlers(setState);
  const { handleOpenContactPage } = useDialogHandlers(setOpenContact);

  const {
    fields: fieldContacts,
    append: appenContact,
    remove: removeContact
  } = useFieldArray({
    name: "contacts",
    control
  });

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
        background="Indigo"
        margin="14px 0 -6px 0"
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
              <AutocompleteStyled
                label="Контакт"
                register={register}
                name={`contacts.${index}.contact`}
                options={currentUserContacts}
                value={data.contacts?.[index].contact}
                errors={errors?.contacts?.[index]?.contact}
                setValue={setValue}
                watchItemId={watchContactId}
                optionLabel={(option) => option?.name}
              />
              <OpenPageObjectIconButton
                containerWidth="70px"
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
          icon={<DoNotDisturbOnOutlinedIcon />}
          onClick={() => handleRemoveContact(lastContactIndex)} // передаем функцию removePhone с аргументом
        />
      </Box>
      <PageDialogs state={openContact} setState={setOpenContact} />
    </>
  );
};

export default FieldsContact;
