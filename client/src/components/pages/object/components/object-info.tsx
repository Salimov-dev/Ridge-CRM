import { useSelector } from "react-redux";
import { Box, Typography, styled, Divider } from "@mui/material";
// utils
import { makeDigitSeparator } from "../../../../utils/make-digit-separator";
import { FormatDate } from "../../../../utils/format-date";
import { enterPhoneFormat } from "../../../../utils/enter-phone-format";
import { getPriceForRentMetr } from "../../../../utils/get-price-rent-for-metr";
// store
import { getMetroName } from "../../../../store/metro.store";
import { getUserNameById } from "../../../../store/users.store";
import { getObjectStatusNameById } from "../../../../store/object-status.store";
import { getWorkingPositionNameById } from "../../../../store/working-position.store";
import { getRentTypeNameById } from "../../../../store/rent-types.store";
import { getCurrentRenterNameById } from "../../../../store/current-renter.store";
import { getEstateConditionNameById } from "../../../../store/object-conditions.store";
import { getObjectTypeNameById } from "../../../../store/object-types.store";
import { getEstateTypeNameById } from "../../../../store/estate-types.store";
import BasicTable from "../../../common/table/basic-table";
import {
  commercialTermsColumns,
  contactsColumns,
  estateOptionsColumns,
  estateTypeColumns,
  locationColumns,
} from "../table/columns";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const ObjectInfo = ({ object, isLoading }) => {

  return (
    <Component>
      <Typography variant="h3">Локация</Typography>
      <BasicTable
        items={[object]}
        itemsColumns={locationColumns}
        isLoading={isLoading}
        isSorting={false}
        isPaginate={false}
      />
      <Typography variant="h3">Объект</Typography>
      <BasicTable
        items={[object]}
        itemsColumns={estateTypeColumns}
        isLoading={isLoading}
        isSorting={false}
        isPaginate={false}
      />
      <Typography variant="h3">Параметры</Typography>
      <BasicTable
        items={[object]}
        itemsColumns={estateOptionsColumns}
        isLoading={isLoading}
        isSorting={false}
        isPaginate={false}
      />
      <Typography variant="h3">Условия</Typography>
      <BasicTable
        items={[object]}
        itemsColumns={commercialTermsColumns}
        isLoading={isLoading}
        isSorting={false}
        isPaginate={false}
      />
      <Typography variant="h3">Контакты</Typography>
      <BasicTable
        items={[object]}
        itemsColumns={contactsColumns}
        isLoading={isLoading}
        isSorting={false}
        isPaginate={false}
      />
      <Typography variant="h3">Описание</Typography>
      <Box>{object.description.fullDescription}</Box>
    </Component>
  );
};

export default ObjectInfo;
