import { Box } from "@mui/material";
import {
  commercialTermsColumns,
  contactsColumns,
  estateOptionsColumns,
  estateTypeColumns,
  locationColumns,
} from "../../../../../columns/object-page-columns";
import BasicTable from "../../../../common/table/basic-table";
import Title from "./title";

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
      />

      <Title title="Объект" />
      <BasicTable
        items={[object]}
        itemsColumns={estateTypeColumns}
        isLoading={isLoading}
        isPaginate={false}
      />

      <Title title="Параметры" />
      <BasicTable
        items={[object]}
        itemsColumns={estateOptionsColumns}
        isLoading={isLoading}
        isPaginate={false}
      />

      <Title title="Условия" />
      <BasicTable
        items={[object]}
        itemsColumns={commercialTermsColumns}
        isLoading={isLoading}
        isPaginate={false}
      />

      <Title title="Контакты" />
      <BasicTable
        items={[object]}
        itemsColumns={contactsColumns}
        isLoading={isLoading}
        isPaginate={false}
      />

      <Title title="Описание" />
      <Box sx={{ marginBottom: "20px" }}>
        {description ? description : "Нет описания"}
      </Box>
    </>
  );
};

export default ObjectsParams;
