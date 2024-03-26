import { useState } from "react";
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
import OpenPageElementIconButton from "@components/common/buttons/icons buttons/open-page-element.button-icon";
import PageDialogs from "@components/common/dialog/page-dialogs";
import DeleteElementIcon from "@components/common/buttons/icons buttons/delete-element-icon";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
// store
import { getObjectsList } from "@store/object/objects.store";
import { getUsersList } from "@store/user/users.store";
import UserNameWithAvatar from "@components/common/user/user-name-with-avatar";

const FieldsObject = ({
  data,
  register,
  setValue,
  watch,
  errors,
  setState,
  control
}) => {
  const [openObject, setOpenObject] = useState({
    objectPage: false,
    object: false
  });

  const {
    fields: fieldObjects,
    append: appenObject,
    remove: removeObject
  } = useFieldArray({
    name: "objects",
    control
  });

  const watchObjectId = watch("objectId");
  const lastObjectIndex = fieldObjects.length - 1;
  const objectsList = useSelector(getObjectsList());

  const filteredObjects = objectsList?.filter(
    (object) =>
      !fieldObjects.some((fieldCompany) => fieldCompany.object === object._id)
  );

  const userAvatars = {};
  const users = useSelector(getUsersList());
  users.forEach((user) => {
    const { getAvatarSrc, isLoading } = useGetUserAvatar(user._id);
    userAvatars[user._id] = { getAvatarSrc, isLoading };
  });

  const { handleOpenCreateObjectPage } = useDialogHandlers(setState);
  const { handleOpenObjectPage } = useDialogHandlers(setOpenObject);

  const handleChangeObject = (objectIndex, currentState) => {
    const updatedObjects = data.objects.map((object, index) => {
      if (index === objectIndex) {
        return { ...object, isDefault: !currentState };
      } else if (object.isDefault) {
        return { ...object, isDefault: false };
      }
      return object;
    });

    setValue("objects", updatedObjects);
  };

  const handleRemoveObject = (index) => {
    handleChangeObject(index, false);
    removeObject(index);
  };

  return (
    <>
      <RowTitle
        title="Связь с объектами"
        background="linear-gradient(to right, Magenta , Indigo)"
        margin="14px 0 -4px 0"
      />
      {fieldObjects?.map((field, index) => {
        const createdObject = data.objects[index].object;
        const object = objectsList?.find((elem) => elem._id === createdObject);
        const objectUserId = object?.userId;
        const user = users?.find((user) => user?._id === objectUserId);
        const avatarData = userAvatars[objectUserId];

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
                onClick={() => handleRemoveObject(index)}
                error={errors?.objects}
              />
              <AutocompleteStyled
                label="Объект"
                register={register}
                name={`objects.${index}.object`}
                options={
                  data.objects?.[index].object ? objectsList : filteredObjects
                }
                value={data.objects?.[index].object}
                errors={errors?.objects?.[index]?.object}
                setValue={setValue}
                watchItemId={watchObjectId}
                optionLabel={(option) => `${option?.city}, ${option?.address}`}
              />
              {createdObject ? (
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
                  Выберите объект
                </Typography>
              )}
              <OpenPageElementIconButton
                height="100%"
                width="24px"
                title={null}
                disabled={!data?.objects?.[index]?.object}
                onClick={() =>
                  handleOpenObjectPage(data?.objects?.[index]?.object)
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
          title="Создать объект"
          style="CREATE_NEW_OBJECT"
          width="100%"
          size="small"
          icon={<AddCircleIcon />}
          onClick={handleOpenCreateObjectPage}
        />

        <ButtonStyled
          title="Добавить объект"
          style="ADD_NEW_OBJECT"
          width="100%"
          size="small"
          icon={<ControlPointOutlinedIcon />}
          onClick={() => appenObject({ object: "" })}
        />
        <ButtonStyled
          title="Удалить объект"
          style="REMOVE_SOME_NEW"
          width="100%"
          size="small"
          disabled={!data?.objects?.length}
          icon={<DoNotDisturbOnOutlinedIcon />}
          onClick={() => handleRemoveObject(lastObjectIndex)} // передаем функцию removePhone с аргументом
        />
      </Box>
      <PageDialogs state={openObject} setState={setOpenObject} />
    </>
  );
};

export default FieldsObject;
