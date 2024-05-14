import { FC } from "react";
import { useSelector } from "react-redux";
// components
import DividerStyled from "@components/common/divider/divider-styled";
import RowItemMap from "@components/common/map/balloon/row-item.map";
// interfaces
import { IObject } from "@interfaces/object/object.interface";
// store
import { getDistrictName } from "@store/object-params/object-districts.store";
import { getEstateTypeNameById } from "@store/object-params/object-estate-types.store";
import { getObjectTypeNameById } from "@store/object-params/object-types.store";

interface FirstSectionObjectBalloonProps {
  object: IObject;
}

const FirstSectionObjectBalloon: FC<FirstSectionObjectBalloonProps> = ({
  object
}): JSX.Element => {
  const city = object?.city;
  const address = object?.address;

  const district = useSelector(getDistrictName(object?.district));
  const objectType = useSelector(getObjectTypeNameById(object?.objectTypes));
  const estateType = useSelector(getEstateTypeNameById(object?.estateTypes));
  return (
    <>
      <RowItemMap title="Город:" subTitle={city} />
      <RowItemMap title="Район:" subTitle={district} />
      <RowItemMap title="Адрес:" subTitle={address} />
      <RowItemMap title="Тип объекта:" subTitle={objectType} />
      <RowItemMap title="Тип недвиж:" subTitle={estateType} />
      <DividerStyled />
    </>
  );
};

export default FirstSectionObjectBalloon;
