// libraries
import dayjs from "dayjs";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import MyTaskForm from "../../common/forms/my-task-form/my-task-form";
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import FooterButtons from "../../common/forms/footer-buttons/footer-buttons";
import IsLoadingDialog from "../../common/dialog/is-loading-dialog";
// store
import { createTask } from "../../../store/task/tasks.store";
// schema
import { taskSchema } from "../../../schemas/task-shema";
// utils
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";
import { Box, Typography } from "@mui/material";
import { getUsersList } from "../../../store/user/users.store";
import transformUsersForSelect from "../../../utils/objects/transform-users-for-select";
import TransferObjectToAnotherManagerForm from "../../common/forms/transfer-object-to-another-manager-form/transfer-object-to-another-manager-form";
import NegativeOutlinedButton from "../../common/buttons/negative-outlined-button";
import PositiveOutlinedButton from "../../common/buttons/positive-outlined-button";
import {
  getObjectsList,
  updateMultipleObjects,
} from "../../../store/object/objects.store";
import ConfirmRemoveDialog from "../../common/dialog/confirm-remove-dialog";
import ConfirmTransferObjectDialog from "../../common/dialog/confirm-transfer-object-dialog";

const initialState = {
  managerId: "",
};

const TransferObjectToAnotherManager = React.memo(
  ({ objectsToTransfer = [], title = "", onClose = () => {}, setRowSelection }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const {
      register,
      watch,
      setValue,
      formState: { errors },
    } = useForm({
      defaultValues: initialState,
      mode: "onBlur",
    });
    const data = watch();
    const watchManagerId = watch("managerId", "");
    const isValid = !watchManagerId;

    const users = useSelector(getUsersList());
    const transformUsers = transformUsersForSelect(users);

    const onSubmit = () => {
      setIsLoading(true);

      const userId = watchManagerId;
      onClose();
      setRowSelection([])
      dispatch<any>(updateMultipleObjects(objectsToTransfer, userId))
        .then(() => {
          setOpen(false);
          setIsLoading(false);
          toast.success("Объекты успешно переданы!");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error);
        });
    };

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return isLoading ? (
      <IsLoadingDialog
        text="Немного подождите, передаём объекты"
        isLoading={isLoading}
      />
    ) : (
      <Box sx={{ width: "500px" }}>
        <TitleWithCloseButton
          title={title}
          background="MediumBlue"
          color="white"
          onClose={onClose}
        />

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography>
            Количество объектов к передаче: {objectsToTransfer?.length}шт
          </Typography>
          <Typography>
            Выберите Менеджера, которому будут переданы объекты:
          </Typography>
          {!objectsToTransfer?.length ? <Typography variant="h4" sx={{background: 'red', color: 'white', marginBottom: '20px'}}>
            Вы не выбрали ни одного объекта для передачи
          </Typography> : <TransferObjectToAnotherManagerForm
            data={data}
            objects={objectsToTransfer}
            users={transformUsers}
            register={register}
            watch={watch}
            errors={errors}
            setValue={setValue}
            />}
          
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <PositiveOutlinedButton
            title="Передать"
            isValid={isValid}
            type="text"
            onClick={() => handleClickOpen()}
          />
          <NegativeOutlinedButton title="Отмена" onClick={onClose} />
        </Box>

        <ConfirmTransferObjectDialog
          // removeId={lastContactId}
          open={open}
          onClose={handleClose}
          onTransfer={() => onSubmit()}
        />
      </Box>
    );
  }
);

export default TransferObjectToAnotherManager;
