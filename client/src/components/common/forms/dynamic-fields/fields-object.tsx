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
import OpenPageObjectIconButton from "@components/common/buttons/icons buttons/open-page-object.button-icon";
import PageDialogs from "@components/common/dialog/page-dialogs";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getObjectsList } from "@store/object/objects.store";
import { getCurrentUserId } from "@store/user/users.store";

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

  const currentUserId = useSelector(getCurrentUserId());
  const objectsList = useSelector(getObjectsList());
  const currentUserObjects = objectsList?.filter(
    (obj) => obj.userId === currentUserId
  );
  const watchObjectId = watch("objectId");

  const { handleOpenCreateObjectPage } = useDialogHandlers(setState);
  const { handleOpenObjectPage } = useDialogHandlers(setOpenObject);

  const {
    fields: fieldObjects,
    append: appenObject,
    remove: removeObject
  } = useFieldArray({
    name: "objects",
    control
  });

  const lastObjectIndex = fieldObjects.length - 1;

  const handleRemoveObject = (index) => {
    removeObject(index);
  };
  return (
    <>
      <RowTitle
        title="Связь с объектами"
        background="SteelBlue"
        margin="14px 0 -6px 0"
      />
      {fieldObjects?.map((field, index) => {
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
                label="Объект"
                register={register}
                name={`objects.${index}.object`}
                options={currentUserObjects}
                value={data.objects?.[index].object}
                errors={errors?.objects?.[index]?.object}
                setValue={setValue}
                watchItemId={watchObjectId}
                optionLabel={(option) => `${option?.city}, ${option?.address}`}
              />
              <OpenPageObjectIconButton
                containerWidth="70px"
                title={null}
                disabled={!data.objects?.[index].object}
                onClick={() =>
                  handleOpenObjectPage(data.objects?.[index].object)
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
          icon={<DoNotDisturbOnOutlinedIcon />}
          onClick={() => handleRemoveObject(lastObjectIndex)} // передаем функцию removePhone с аргументом
        />
      </Box>
      <PageDialogs state={openObject} setState={setOpenObject} />
    </>
  );
};

export default FieldsObject;
