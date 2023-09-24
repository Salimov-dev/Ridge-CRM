import { useSelector } from "react-redux";
import { getObjectsList, getObjectsLoadingStatus } from "../../store/object/objects.store";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import BasicTable from "../../components/common/table/basic-table";
import { resultMyColumns } from "../../columns/result-my-columns/result-my-columns";

const Main = () => {
  const objects = useSelector(getObjectsList());
  const isObjectsLoading = useSelector(getObjectsLoadingStatus())
  const columns = resultMyColumns;
  return (
    <>
      <LayoutTitle title="Главная" />
      <BasicTable
        items={objects}
        itemsColumns={columns}
        isLoading={isObjectsLoading}
      />
    </>
  );
};

export default Main;
