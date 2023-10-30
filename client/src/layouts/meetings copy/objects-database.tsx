// libraries
import { Box } from "@mui/material";
import { orderBy } from "lodash";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import BasicTable from "../../components/common/table/basic-table";
import ObjectCreatePageDialog from "../../components/UI/dialogs/objects/object-create-page-dialog";
import ObjectPageDialog from "../../components/UI/dialogs/object-page-dialog/object-page-dialog";
import ObjectUpdatePageDialog from "../../components/UI/dialogs/objects/object-update-page-dialog";
import { useSelector } from "react-redux";
import { getObjectsList, getObjectsLoadingStatus } from "../../store/object/objects.store";
import { objectsColumns } from "../../columns/objects-columns/objects-columns";

const ObjectsDatabase = () => {
  const isLoading = useSelector(getObjectsLoadingStatus());
  const objects = useSelector(getObjectsList());
  const sortedObjects = orderBy(objects, ["created_at"], ["desc"]);
  const columns = objectsColumns;

  return (
    <Box>
      <LayoutTitle title="Проработка базы объектов" />
      {/* <AddAndClearFiltersButton
        reset={reset}
        isInputEmpty={isInputEmpty}
        initialState={initialState}
        button={<CreateMeetingButton />}
      /> */}
      <BasicTable
        items={sortedObjects}
        itemsColumns={columns}
        isLoading={isLoading}
      />

      <ObjectCreatePageDialog />
      <ObjectPageDialog />
      <ObjectUpdatePageDialog />
    </Box>
  );
};

export default ObjectsDatabase;
