import { useDispatch, useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
// components
import { FormatPhone } from "../../common/table/helpers/helpers";
import DividerStyled from "../../common/divider/divider-styled";
import OpenObjectButton from "../../common/map/baloon/open-object-button";
import Attribute from "../../common/map/baloon/attribute";
// utils
import { FormatDate } from "../../../utils/date/format-date";
import { makeDigitSeparator } from "../../../utils/data/make-digit-separator";
// store
import { getUserNameById } from "../../../store/user/users.store";
import { getDistrictById } from "../../../store/object/districts.store";
import { getRentTypeNameById } from "../../../store/object/rent-types.store";
import { getEstateTypeNameById } from "../../../store/object/estate-types.store";
import { getObjectTypeNameById } from "../../../store/object/object-types.store";
import { getCurrentRenterNameById } from "../../../store/object/current-renter.store";
import {
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../../store/object/open-object-page.store";

const BaloonContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
  padding: 10px 0;
`;

const ObjectBaloon = ({ object }) => {
  const objectId = object?._id;
  const createdAt = FormatDate(object.created_at);
  const manager = useSelector(getUserNameById(object?.userId));
  const city = object?.location?.city;
  const district = useSelector(getDistrictById(object?.location?.district));
  const address = object?.location?.address;
  const name = object?.contact?.name;
  const phone = object?.contact?.phone;
  const email = object?.contact?.email;
  const totalSquare = object?.commercialTerms?.totalSquare;
  const rentSquare = object?.commercialTerms?.rentSquare;
  const rentPrice = object?.commercialTerms?.rentPrice;
  const rentTypes = object?.commercialTerms?.rentTypes;

  const dispatch = useDispatch();

  const objectType = useSelector(
    getObjectTypeNameById(object?.estateOptions?.objectTypes)
  );
  const estateType = useSelector(
    getEstateTypeNameById(object?.estateOptions?.estateTypes)
  );
  const renter = useSelector(
    getCurrentRenterNameById(object?.estateOptions?.currentRenters)
  );

  const handleOpenObjectPage = () => {
    dispatch(setOpenObjectPageId(objectId));
    dispatch(setOpenObjectPageOpenState(true));
  };

  return (
    <BaloonContainer>
      <OpenObjectButton onClick={handleOpenObjectPage} />
      <DividerStyled />
      <Attribute
        title="Дата создания:"
        subTitle={createdAt}
        withoutTypography={true}
      />
      <Attribute title="Менеджер:" subTitle={manager} />
      <Attribute title="Город:" subTitle={city} />
      <Attribute title="Район:" subTitle={district} />
      <Attribute title="Адрес:" subTitle={address} />

      <DividerStyled />
      <Attribute title="Тип объекта:" subTitle={objectType} />
      <Attribute title="Тип недвиж:" subTitle={estateType} />
      <Attribute title="Арендатор:" subTitle={renter} />

      <DividerStyled />
      <Attribute
        title="Площадь общая:"
        subTitle={totalSquare ? `${makeDigitSeparator(totalSquare)}м²` : "-"}
      />
      <Attribute
        title="Площадь АП:"
        subTitle={rentSquare ? `${makeDigitSeparator(rentSquare)}м²` : "-"}
      />
      <Attribute
        title="Стоимость АП:"
        subTitle={rentPrice ? `${makeDigitSeparator(rentPrice)}₽` : "-"}
      />
      <Attribute
        title="Тип договора:"
        subTitle={
          rentTypes ? `${useSelector(getRentTypeNameById(rentTypes))}` : "-"
        }
      />

      <DividerStyled />
      <Attribute title="Контакт:" subTitle={name ? `${name}` : "-"} />
      <Attribute
        title="Телефон:"
        subTitle={phone ? FormatPhone(phone) : "-"}
        withoutTypography={true}
      />
      <Attribute title="Email:" subTitle={email ? email : "-"} />

      <DividerStyled />
      <OpenObjectButton onClick={handleOpenObjectPage} />
    </BaloonContainer>
  );
};

export default ObjectBaloon;
