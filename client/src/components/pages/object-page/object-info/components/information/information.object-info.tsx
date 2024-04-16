import { Box } from "@mui/material";
// components
import BasicTable from "@components/common/table/basic-table";
import RowTitle from "@components/common/titles/row-title";
// columns
import {
  commercialTermsColumns,
  estateOptionsColumns,
  estateTypeColumns,
  locationColumns
} from "@columns/object-page.columns";
import { getObjectsLoadingStatus } from "@store/object/objects.store";
import { useSelector } from "react-redux";

const InformationObjectInfo = ({ object }) => {
  const description = object?.fullDescription;
  const isLoading = useSelector(getObjectsLoadingStatus());

  return (
    <>
      <RowTitle
        title="Локация"
        background="linear-gradient(to right, DarkGoldenRod, OrangeRed)"
        margin="0 0px -4px 0"
      />
      <BasicTable
        items={[object]}
        itemsColumns={locationColumns}
        isLoading={isLoading}
        isPaginate={false}
        isDialogMode={true}
      />
      <RowTitle
        title="Объект"
        background="linear-gradient(to right, ForestGreen, DarkGreen)"
        margin="16px 0px -4px 0"
      />
      <BasicTable
        items={[object]}
        itemsColumns={estateTypeColumns}
        isLoading={isLoading}
        isPaginate={false}
        isDialogMode={true}
      />

      <RowTitle
        title="Параметры"
        background="linear-gradient(to right, OrangeRed , FireBrick)"
        margin="16px 0px -4px 0"
      />
      <BasicTable
        items={[object]}
        itemsColumns={estateOptionsColumns}
        isLoading={isLoading}
        isPaginate={false}
        isDialogMode={true}
      />

      <RowTitle
        title="Условия"
        background="linear-gradient(to right, MediumVioletRed , DarkMagenta)"
        margin="16px 0px -4px 0"
      />
      <BasicTable
        items={[object]}
        itemsColumns={commercialTermsColumns}
        isLoading={isLoading}
        isPaginate={false}
        isDialogMode={true}
      />
      <RowTitle
        title="Описание"
        background="linear-gradient(to right, SlateGray , DarkSlateGray)"
        margin="16px 0px -4px 0"
      />
      <Box sx={{ marginBottom: "20px", whiteSpace: "pre-line" }}>
        {description ? description : "Нет описания"}
      </Box>
    </>
  );
};

export default InformationObjectInfo;
