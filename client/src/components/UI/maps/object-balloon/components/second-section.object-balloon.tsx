import { FC } from "react";
import { useSelector } from "react-redux";
// components
import RowItemMap from "@components/common/map/balloon/row-item.map";
// interfaces
import { IObject } from "@interfaces/object/object.interface";
// utils
import { makeDigitSeparator } from "@utils/data/make-digit-separator";
// store
import {
  getIsCurrentUserRoleCurator,
  getUserNameById
} from "@store/user/users.store";

interface SecondSectionObjectBalloonProps {
  object: IObject;
}

const SecondSectionObjectBalloon: FC<SecondSectionObjectBalloonProps> = ({
  object
}): JSX.Element => {
  const createObjectUser = useSelector(getUserNameById(object?.userId));

  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  const rentSquare = object?.rentSquare;
  const rentPrice = object?.rentPrice;

  return (
    <>
      <RowItemMap
        title="Площадь АП:"
        subTitle={rentSquare ? `${makeDigitSeparator(rentSquare)}м²` : "-"}
      />
      <RowItemMap
        title="Стоимость АП:"
        subTitle={rentPrice ? `${makeDigitSeparator(rentPrice)}₽` : "-"}
      />

      {isCurrentUserRoleCurator && (
        <RowItemMap title="Менеджер:" subTitle={createObjectUser} />
      )}
    </>
  );
};

export default SecondSectionObjectBalloon;
