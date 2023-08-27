import { Box, Typography, styled } from "@mui/material";
import BasicTable from "../../../common/table/basic-table";
import {
  commercialTermsColumns,
  contactsColumns,
  estateOptionsColumns,
  estateTypeColumns,
  locationColumns,
} from "../table/columns";
import PageBackButton from "../../../common/buttons/page-back-button";
import EditButton from "../../../common/buttons/edit-button";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const ObjectInfo = ({ object, isLoading }) => {
  const description = object?.description?.fullDescription;

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
      <Box>
        {description ? object.description.fullDescription : "Нет описания"}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", gap: "4px" }}>
        <PageBackButton path="/objects" text="Объекты" />
        <PageBackButton />
        <EditButton path={`/objects/${object._id}/edit`} />
      </Box>
    </Component>
  );
};

export default ObjectInfo;
