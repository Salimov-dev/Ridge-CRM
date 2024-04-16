import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import HeaderTransferObjectToAnotherManager from "./components/header.transfer-object-to-another-manager";
import ErrorSelectedTransferObjectToAnotherManager from "./components/error-selected.transfer-object-to-another-manager";
// initial-states
import { transferObjectInitialState } from "@initial-states/transfer-object/transfer-object.initial-state";
// forms
import TransferObjectToAnotherManagerForm from "@forms/transfer-object-to-another-manager/transfer-object-to-another-manager.form";
// schemas
import { transferObjectToAnotherManagerSchema } from "@schemas/object/transfer-object-to-aother-manager.schema";
// utils
import transformUsersForSelect from "@utils/user/transform-users-for-select";
// store
import { updateMultipleObjects } from "@store/object/objects.store";
import { getUsersList } from "@store/user/users.store";

const TitlesContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TransferObjectToAnotherManager = React.memo(
  ({
    objectsToTransfer = [],
    onClose = () => {},
    setRowSelection = () => {}
  }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isLoading, setIsLoading] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    const {
      register,
      watch,
      handleSubmit,
      formState: { errors },
      trigger
    } = useForm({
      defaultValues: transferObjectInitialState,
      mode: "onChange",
      resolver: yupResolver(transferObjectToAnotherManagerSchema)
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
          setOpenConfirm(false);
          setIsLoading(false);
          toast.success("Объекты успешно переданы другому Менеджеру!");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error);
        });
    };

    const handleClickOpenConfirm = () => {
      trigger();
      if (watchManagerId && !Object.keys(errors).length) {
        setOpenConfirm(true);
      }
    };

    const handleCloseConfirm = () => {
      setOpenConfirm(false);
    };

    return (
      <>
        <HeaderWithCloseButtonForPage
          title="Передать объекты"
          color="white"
          margin="0 0 20px 0"
          background="linear-gradient(to right, MediumBlue , Navy)"
          onClose={onClose}
        />
        <TitlesContainer>
          <HeaderTransferObjectToAnotherManager objects={objectsToTransfer} />
          {!objectsToTransfer?.length ? (
            <ErrorSelectedTransferObjectToAnotherManager />
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
          onSuccess={handleClickOpenConfirm}
          onCancel={onClose}
          disabledRemoveButton={true}
        />
        <LoaderFullWindow
          color={colors.grey[600]}
          size={75}
          isLoading={isLoading}
        />
        <DialogConfirm
          question="Вы уверены, что хотите передать объекты другому Менеджеру?"
          open={openConfirm}
          onSuccessClick={handleSubmit(onSubmit)}
          onClose={handleCloseConfirm}
        />
      </>
    );
  }
);

export default TransferObjectToAnotherManager;
