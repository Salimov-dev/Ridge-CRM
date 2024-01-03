import { Box } from "@mui/material";
import BasicTable from "@common/table/basic-table";
import Title from "./title";
import {
  commercialTermsColumns,
  contactsColumns,
  estateOptionsColumns,
  estateTypeColumns,
  locationColumns,
} from "@columns/object-page.columns";

const ObjectsParams = ({ object, isLoading }) => {
  const description = object?.description?.fullDescription;
  return (
    <>
      <Title title="Локация" />
      <BasicTable
        items={[object]}
        itemsColumns={locationColumns}
        isLoading={isLoading}
        isPaginate={false}
        isDialogMode={true}
      />

      <Title title="Объект" />
      <BasicTable
        items={[object]}
        itemsColumns={estateTypeColumns}
        isLoading={isLoading}
        isPaginate={false}
        isDialogMode={true}
      />

      <Title title="Параметры" />
      <BasicTable
        items={[object]}
        itemsColumns={estateOptionsColumns}
        isLoading={isLoading}
        isPaginate={false}
        isDialogMode={true}
      />

      <Title title="Условия" />
      <BasicTable
        items={[object]}
        itemsColumns={commercialTermsColumns}
        isLoading={isLoading}
        isPaginate={false}
        isDialogMode={true}
      />

      <Title title="Контакты" />
      <BasicTable
        items={[object]}
        itemsColumns={contactsColumns}
        isLoading={isLoading}
        isPaginate={false}
        isDialogMode={true}
      />

      <Title title="Описание" />
      <Box sx={{ marginBottom: "20px", whiteSpace: "pre-line" }}>
        {description ? description : "Нет описания"}
      </Box>
    </>
  );
};

export default ObjectsParams;
