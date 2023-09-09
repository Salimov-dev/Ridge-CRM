import { useDispatch, useSelector } from "react-redux";
import { setCreateLastContactOpenState } from "../../../../store/last-contact/create-last-contact.store";
import { getLastContactsLoadingStatus } from "../../../../store/last-contact/last-contact.store";
import MultiColorContainedButton from "../../../common/buttons/multi-color-contained-button";

const CreateLastContactButton = ({ title }) => {
  const isLoading = useSelector(getLastContactsLoadingStatus());
  const dispatch = useDispatch();

  const handleOpenCreateLastContact = () => {
    dispatch(setCreateLastContactOpenState(true));
  };

  return (
    <MultiColorContainedButton
      text="Добавить последний контакт"
      fontColor="white"
      background="SaddleBrown"
      backgroudHover="Sienna"
      onClick={handleOpenCreateLastContact}
      width={null}
      disabled={isLoading}
    >
      {title}
    </MultiColorContainedButton>
  );
};

export default CreateLastContactButton;
