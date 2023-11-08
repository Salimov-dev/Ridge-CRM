// libraries
import { Box, styled } from "@mui/material";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// components
import Titles from "./components/titles";
import SelectedError from "./components/selected-error";
import FooterButtons from "./components/footer-buttons";
import IsLoadingDialog from "../../common/dialog/is-loading-dialog";
import TitleWithCloseButton from "../../common/page-titles/title-with-close-button";
import ConfirmTransferObjectDialog from "../../common/dialog/confirm-transfer-object-dialog";
import TransferObjectToAnotherManagerForm from "../../common/forms/transfer-object-to-another-manager-form/transfer-object-to-another-manager-form";
// store
import { updateMultipleObjects } from "../../../store/object/objects.store";
import { getUsersList } from "../../../store/user/users.store";
// utils
import transformUsersForSelect from "../../../utils/objects/transform-users-for-select";

const Component = styled(Box)`
  width: 500px;
`;

const TitlesContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const initialState = {
  managerId: "",
};

const TransferObjectToAnotherManager = 
  ({
    objectsToTransfer = [],
    title = "",
    onClose = () => {},
    setRowSelection = () => {},
  }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const { register, watch } = useForm({
      defaultValues: initialState,
      mode: "onBlur",
    });
    const watchManagerId = watch("managerId", "");
    const isValid = !watchManagerId;

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

    return isLoading ? (
      <IsLoadingDialog
        text="Немного подождите, передаём объекты другому Менеджеру"
        isLoading={isLoading}
      />
    ) : (
      <Component>
        <TitleWithCloseButton
          title={title}
          background="MediumBlue"
          color="white"
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
              watch={watch}
            />
          )}
        </TitlesContainer>

        <FooterButtons
          onClose={onClose}
          onOpen={() => handleClickOpen()}
          isValid={isValid}
        />

        <ConfirmTransferObjectDialog
          open={open}
          onClose={handleClose}
          onTransfer={() => onSubmit()}
        />
      </Component>
    );
  }
;

export default TransferObjectToAnotherManager;
