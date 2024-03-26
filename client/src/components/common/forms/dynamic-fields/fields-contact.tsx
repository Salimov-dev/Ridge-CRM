import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
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
import OpenPageElementIconButton from "@components/common/buttons/icons buttons/open-page-element.button-icon";
import DeleteElementIcon from "@components/common/buttons/icons buttons/delete-element-icon";
import UserNameWithAvatar from "@components/common/user/user-name-with-avatar";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
// store
import { getContactsList } from "@store/contact/contact.store";
import { getUsersList } from "@store/user/users.store";

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
  const watchContactId = watch("contactId");
  const lastContactIndex = fieldContacts?.length - 1;

  const contactsList = useSelector(getContactsList());
  const filteredContacts = contactsList?.filter(
    (contact) =>
      !fieldContacts.some(
        (fieldCompany) => fieldCompany.contact === contact._id
      )
  );

  const userAvatars = {};
  const users = useSelector(getUsersList());
  users.forEach((user) => {
    const { getAvatarSrc, isLoading } = useGetUserAvatar(user._id);
    userAvatars[user._id] = { getAvatarSrc, isLoading };
  });

  const { handleOpenCreateContactPage } = useDialogHandlers(setState);
  const { handleOpenContactPage } = useDialogHandlers(setOpenContact);

  const handleChangeContact = (contactIndex, currentState) => {
    const updatedContacts = data.contacts.map((contact, index) => {
      if (index === contactIndex) {
        return { ...contact, isDefault: !currentState };
      } else if (contact.isDefault) {
        return { ...contact, isDefault: false };
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
      {fieldContacts.map((field, index) => {
        const createdContact = data.contacts[index].contact;
        const contact = contactsList?.find(
          (elem) => elem._id === createdContact
        );
        const contactUserId = contact?.userId;
        const user = users?.find((user) => user?._id === contactUserId);
        const avatarData = userAvatars[contactUserId];

        if (field.id) {
          return (
            <Box
              key={field.id}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center"
              }}
            >
              <DeleteElementIcon
                onClick={() => handleRemoveContact(index)}
                error={errors?.contacts}
              />
              <AutocompleteStyled
                label="Контакт"
                register={register}
                name={`contacts.${index}.contact`}
                options={
                  data.contacts?.[index].contact
                    ? contactsList
                    : filteredContacts
                }
                value={data.contacts[index].contact}
                errors={errors?.contacts?.[index]?.contact}
                setValue={setValue}
                watchItemId={watchContactId}
                optionLabel={(option) => option?.name}
              />

              {createdContact ? (
                <UserNameWithAvatar
                  userId={user?._id}
                  avatarSrc={avatarData?.getAvatarSrc()}
                  fontStyle="italic"
                  isLoading={avatarData?.isLoading}
                  margin="0 0 0 14px"
                  color="white"
                  maxWidth="450px"
                />
              ) : (
                <Typography sx={{ margin: "0 0 0 45px" }}>
                  Выберите контакт
                </Typography>
              )}
              <OpenPageElementIconButton
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
          onClick={() => handleRemoveContact(lastContactIndex)}
        />
      </Box>
      <PageDialogs state={openContact} setState={setOpenContact} />
    </>
  );
};

export default FieldsContact;
