// libraries
import { Box, styled } from "@mui/material";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// components
import Titles from "./components/titles";
import SelectedError from "./components/selected-error";
import TransferObjectToAnotherManagerForm from "@components/common/forms/transfer-object-to-another-manager.form";
import SuccessCancelFormButtons from "@components/common/forms/success-cancel-form-buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
// schemas
import { transferObjectToAnotherManagerSchema } from "@schemas/transfer-object-to-aother-manager.schema";
// utils
import transformUsersForSelect from "@utils/objects/transform-users-for-select";
// store
import { updateMultipleObjects } from "@store/object/objects.store";
import { getUsersList } from "@store/user/users.store";

const TitlesContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const initialState = {
  managerId: "",
};

const TransferObjectToAnotherManager = React.memo(
  ({
    objectsToTransfer = [],
    onClose = () => {},
    setRowSelection = () => {},
  }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const {
      register,
      watch,
      formState: { errors },
    } = useForm({
      defaultValues: initialState,
      mode: "onChange",
      resolver: yupResolver(transferObjectToAnotherManagerSchema),
    });
    const watchManagerId = watch("managerId", "");

    const users = useSelector(getUsersList());
    const transformUsers = transformUsersForSelect(users);

    const onSubmit = () => {
      setIsLoading(true);

      const userId = watchManagerId;
      onClose();
      setRowSelection([]);
      dispatch<any>(updateMultipleObjects(objectsToTransfer, userId))
        .then(() => {
          setOpen(false);
          setIsLoading(false);
          toast.success("Объекты успешно переданы другому Менеджеру!");
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

    return (
      <>
        <HeaderWithCloseButton
          title="Передать объекты"
          color="black"
          margin="0 0 20px 0"
          background={colors.header["gold"]}
          onClose={onClose}
        />

        <TitlesContainer>
          <Titles objects={objectsToTransfer} />
          {!objectsToTransfer?.length ? (
            <SelectedError />
          ) : (
            <TransferObjectToAnotherManagerForm
              objects={objectsToTransfer}
              users={transformUsers}
              register={register}
              errors={errors}
              watch={watch}
            />
          )}
        </TitlesContainer>
        <SuccessCancelFormButtons
          onSuccess={handleClickOpen}
          onCancel={onClose}
        />
        <LoaderFullWindow
          color={colors.grey[600]}
          size={75}
          isLoading={isLoading}
        />
        <DialogConfirm
          question="Вы уверены, что хотите передать объекты другому Менеджеру?"
          open={open}
          onSuccessClick={() => onSubmit()}
          onClose={handleClose}
        />
      </>
    );
  }
);

export default TransferObjectToAnotherManager;
