import { useDispatch, useSelector } from "react-redux";
import MultiColorContainedButton from "../../../common/buttons/multi-color-contained-button";
import { getRidgeLastContactsLoadingStatus } from "../../../../store/ridge-last-contact/last-ridge-contact.store";
import { setCreateRidgeLastContactOpenState } from "../../../../store/ridge-last-contact/create-ridge-last-contact.store";
import { setUpdateRidgeLastContactId } from "../../../../store/ridge-last-contact/update-ridge-last-contact.store";

const CreateRidgeLastContactButton = ({ title, objectId }) => {
  const isLoading = useSelector(getRidgeLastContactsLoadingStatus());
  const dispatch = useDispatch();

  const handleOpenCreateRidgeLastContact = () => {
    dispatch<any>(setCreateRidgeLastContactOpenState(true));
    dispatch<any>(setUpdateRidgeLastContactId(objectId));
  };

  return (
    <MultiColorContainedButton
      text="Добавить последний контакт"
      fontColor="white"
      background="Chocolate"
      backgroudHover="SaddleBrown"
      onClick={handleOpenCreateRidgeLastContact}
      width={null}
      disabled={isLoading}
    >
      {title}
    </MultiColorContainedButton>
  );
};

export default CreateRidgeLastContactButton;
