import { FC } from "react";
import { useSelector } from "react-redux";
// forms
import CuratorPresentationForm from "@forms/presentation/presentation-curator.form";
import PresentationForm from "@forms/presentation/presentation.form";
// utils
import transformObjectsForSelect from "@utils/objects/transform-objects-for-select";
// interface
import { IObject } from "@interfaces/object/object.interface";
import { IPresentation } from "@interfaces/presentation/presentation.interfaces";
// store
import { getObjectsList } from "@store/object/objects.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity
} from "@store/user/users.store";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";

interface UpdatePresentationPageFormsProps {
  data: IPresentation;
  register: UseFormRegister<IPresentation>;
  errors: FieldErrors<IPresentation>;
  watch: UseFormWatch<IPresentation>;
  setValue: UseFormSetValue<IPresentation>;
}

const UpdatePresentationPageForms: FC<UpdatePresentationPageFormsProps> = ({
  data,
  register,
  errors,
  watch,
  setValue
}) => {
  const currentUserId: string = useSelector(getCurrentUserId());
  const isAuthorEntity: boolean = useSelector(
    getIsUserAuthorThisEntity(currentUserId, data)
  );

  const objects: IObject[] = useSelector(getObjectsList());
  const currentUserObjects: IObject[] = objects?.filter(
    (obj: IObject) => obj?.userId === currentUserId
  );
  const transformObjects: IObject[] =
    transformObjectsForSelect(currentUserObjects);

  return isAuthorEntity ? (
    <PresentationForm
      data={data}
      objects={transformObjects}
      register={register}
      errors={errors}
      watch={watch}
      setValue={setValue}
      isAuthorEntity={isAuthorEntity}
    />
  ) : (
    <CuratorPresentationForm
      data={data}
      register={register}
      errors={errors}
      watch={watch}
      setValue={setValue}
    />
  );
};

export default UpdatePresentationPageForms;
