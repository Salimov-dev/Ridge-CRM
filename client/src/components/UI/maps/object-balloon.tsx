import React from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
// components
import DividerStyled from "@common/divider/divider-styled";
import Attribute from "@components/common/map/balloon/row-item.map";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import Loader from "@components/common/loader/loader";
import OpenPageElementIconButton from "@components/common/button-icons/open-page-element.button-icon";
// utils
import { makeDigitSeparator } from "@utils/data/make-digit-separator";
// hooks
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getDistrictName } from "@store/object-params/object-districts.store";
import { getRentTypeNameById } from "@store/object-params/object-rent-types.store";
import { getEstateTypeNameById } from "@store/object-params/object-estate-types.store";
import { getObjectTypeNameById } from "@store/object-params/object-types.store";
import { getCurrentRenterNameById } from "@store/object-params/object-current-renter.store";
import { getObjectsLoadingStatus } from "@store/object/objects.store";
import {
  getIsCurrentUserRoleCurator,
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ObjectBalloon = React.memo(({ object, setState }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const createObjectUser = useSelector(getUserNameById(object?.userId));
  const isLoading = useSelector(getObjectsLoadingStatus());
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());
  const { handleOpenObjectPage } = useDialogHandlers(setState);

  const objectId = object?._id;
  const city = object?.city;
  const address = object?.address;
  const rentSquare = object?.rentSquare;
  const rentPrice = object?.rentPrice;
  const rentTypes = object?.rentTypes;

  const district = useSelector(getDistrictName(object?.district));
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
          onClick={() => handleOpenObjectPage(objectId)}
        />
      </AddressContainer>
      <Attribute title="Район:" subTitle={district} />
      <Attribute title="Адрес:" subTitle={address} />
      {isCurrentUserRoleCurator && (
        <Attribute title="Менеджер:" subTitle={createObjectUser} />
      )}

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
      <ButtonStyled
        title="Открыть страницу объекта"
        style="OBJECT"
        width="100%"
        size="small"
        onClick={() => handleOpenObjectPage(objectId)}
      />
    </BaloonContainer>
  ) : (
    <Loader color={colors.grey[600]} height="85px" />
  );
});

export default ObjectBalloon;
