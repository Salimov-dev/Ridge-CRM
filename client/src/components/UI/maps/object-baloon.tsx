import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// components
import { FormatPhone } from "../../common/table/helpers/helpers";
import DividerStyled from "../../common/divider/divider-styled";
import MultiColorOutlinedButton from "../../common/buttons/multi-color-outlined-button";
import Attribute from "../../common/map/baloon/attribute";
// utils
import { makeDigitSeparator } from "../../../utils/data/make-digit-separator";
// store
import { getCurrentUserId, getIsUserCurator, getUserNameById } from "../../../store/user/users.store";
import { getDistrictName } from "../../../store/object-params/districts.store";
import { getRentTypeNameById } from "../../../store/object-params/rent-types.store";
import { getEstateTypeNameById } from "../../../store/object-params/estate-types.store";
import { getObjectTypeNameById } from "../../../store/object-params/object-types.store";
import { getCurrentRenterNameById } from "../../../store/object-params/current-renter.store";
import {
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../../store/object/open-object-page.store";
import React from "react";

const BaloonContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
  padding: 20px 0;
`;

const ObjectBaloon = React.memo(({ object }) => {
  const dispatch = useDispatch();

  const objectId = object?._id;
  const manager = useSelector(getUserNameById(object?.userId));
  const city = object?.location?.city;

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const district = useSelector(getDistrictName(object?.location?.district));
  const address = object?.location?.address;
  const name = object?.contact?.name;
  const phone = object?.contact?.phone;
  const email = object?.contact?.email;
  const rentSquare = object?.commercialTerms?.rentSquare;
  const rentPrice = object?.commercialTerms?.rentPrice;
  const rentTypes = object?.commercialTerms?.rentTypes;


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
    dispatch<any>(setOpenObjectPageId(objectId));
    dispatch<any>(setOpenObjectPageOpenState(true));
  };
  return (
    <BaloonContainer>
      <Attribute title="Город:" subTitle={city} />
      <Attribute title="Район:" subTitle={district} />
      <Attribute title="Адрес:" subTitle={address} />
      {isCurator && <Attribute title="Менеджер:" subTitle={manager} />}

      <DividerStyled />
      <Attribute title="Тип объекта:" subTitle={objectType} />
      <Attribute title="Тип недвиж:" subTitle={estateType} />
      <Attribute title="Арендатор:" subTitle={renter} />

      <DividerStyled />
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
      <Attribute title="Телефон:" subTitle={phone ? FormatPhone(phone) : "-"} />
      <Attribute title="Email:" subTitle={email ? email : "-"} />

      <MultiColorOutlinedButton
        text="Открыть страницу объекта"
        fontColor="black"
        borderColor="SlateGrey"
        backgroundHover="ForestGreen"
        onClick={handleOpenObjectPage}
      />
    </BaloonContainer>
  );
});

export default ObjectBaloon;
