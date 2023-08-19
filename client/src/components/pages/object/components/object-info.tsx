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
import { commercialTermsColumns, contactsColumns, estateOptionsColumns, estateTypeColumns, locationColumns } from "../table/columns";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between; /* Center items and create space between them */
  margin-bottom: 20px;
`;

const InfoBlock = styled(Box)`
  display: flex;
  flex-direction: column;
  justift-content: center;
  white-space: nowrap;
  padding: 0 20px;
`;

const ObjectInfo = ({ object, isLoading }) => {

  console.log("object", object);

  return (
    <>
     <BasicTable
      items={[object]}
      itemsColumns={locationColumns}
      isLoading={isLoading}
      sortingColumn="date"
    />
    <BasicTable
      items={[object]}
      itemsColumns={estateTypeColumns}
      isLoading={isLoading}
      sortingColumn="date"
    />
    <BasicTable
      items={[object]}
      itemsColumns={commercialTermsColumns}
      isLoading={isLoading}
      sortingColumn="date"
    />
    <BasicTable
      items={[object]}
      itemsColumns={estateOptionsColumns}
      isLoading={isLoading}
      sortingColumn="date"
    />
    <BasicTable
      items={[object]}
      itemsColumns={contactsColumns}
      isLoading={isLoading}
      sortingColumn="date"
    />
    </>
   
  );
};

export default ObjectInfo;
