import React from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
// components
import { FormatPhone } from "@common/table/helpers/helpers";
import DividerStyled from "@common/divider/divider-styled";
import Attribute from "@common/map/baloon/attribute";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import Loader from "@components/common/loader/loader";
import OpenPageElementIconButton from "@components/common/buttons/icons buttons/open-page-element.button-icon";
// utils
import { makeDigitSeparator } from "@utils/data/make-digit-separator";
// store
import { getDistrictName } from "@store/object-params/districts.store";
import { getRentTypeNameById } from "@store/object-params/rent-types.store";
import { getEstateTypeNameById } from "@store/object-params/estate-types.store";
import { getObjectTypeNameById } from "@store/object-params/object-types.store";
import { getCurrentRenterNameById } from "@store/object-params/current-renter.store";
import {
  getCurrentUserId,
  getIsUserCurator,
  getUserNameById
} from "@store/user/users.store";

const BaloonContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
  padding: 20px 0;
`;

const AddressContainer = styled(Box)`
  width: 92%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ObjectBaloon = React.memo(({ object, onOpenObjectPage, isLoading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const objectId = object?._id;
  const manager = useSelector(getUserNameById(object?.userId));
  const city = object?.city;

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const district = useSelector(getDistrictName(object?.district));
  const address = object?.address;
  const name = object?.name;
  const phone = object?.phone;
  const email = object?.email;
  const rentSquare = object?.rentSquare;
  const rentPrice = object?.rentPrice;
  const rentTypes = object?.rentTypes;

  const objectType = useSelector(getObjectTypeNameById(object?.objectTypes));
  const estateType = useSelector(getEstateTypeNameById(object?.estateTypes));
  const renter = useSelector(getCurrentRenterNameById(object?.currentRenters));

  return !isLoading ? (
    <BaloonContainer>
      <AddressContainer>
        <Attribute title="Город:" subTitle={city} />
        <OpenPageElementIconButton
          title="Открыть объект"
          height="20px"
          heightButton="20px"
          width="20px"
          color="black"
          colorHover="blue"
          onClick={() => onOpenObjectPage(objectId)}
        />
      </AddressContainer>
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

      <ButtonStyled
        title="Открыть страницу объекта"
        style="OBJECT"
        width="100%"
        size="small"
        onClick={() => onOpenObjectPage(objectId)}
      />
    </BaloonContainer>
  ) : (
    <Loader color={colors.grey[600]} height="85px" />
  );
});

export default ObjectBaloon;
