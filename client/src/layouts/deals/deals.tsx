import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// components
import LayoutTitle from "../../components/common/page-titles/layout-title";
import Stages from "./components/stages/stages";
import CreateDealDialog from "../../components/UI/dialogs/deals/create-deal-dialog";
// store
import { getDealsList } from "../../store/deal/deal.store";
import { getSidebarCollapsState } from "../../store/sidebar-collaps-state.store";
import { getObjectsList } from "../../store/object/objects.store";
import { getDealStagesList } from "../../store/deal/deal-stages.store";
import {
  setCreateDealOpenState,
  setCreateDealStageId,
} from "../../store/deal/add-object-to-deal.store";
import {
  getCurrentUserId,
  getUserNameById,
} from "../../store/user/users.store";
import ObjectPageDialog from "../../components/UI/dialogs/object-page-dialog/object-page-dialog";
import UpdateDealDialog from "../../components/UI/dialogs/deals/update-deal-dialog";

const Deals = () => {
  const dispatch = useDispatch();
  const deals = useSelector(getDealsList());
  const dealStages = useSelector(getDealStagesList());
  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const userName = useSelector(getUserNameById(currentUserId));
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  const isCollapsedSidebar = useSelector(getSidebarCollapsState());
  const [width, setWidth] = useState(0);
  const screenWidth = window?.innerWidth;
  const fullWidth = screenWidth - 262;
  const collapseWidth = screenWidth - 122;

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const getObjectAddress = (id) => {
    const object = objects?.find((obj) => obj?._id === id);
    const address = `${object?.location?.city}, ${object?.location?.address}`;
    return address;
  };

  const handleAddObject = (id) => {
    dispatch(setCreateDealOpenState(true));
    dispatch(setCreateDealStageId(id));
  };

  useEffect(() => {
    setWidth(isCollapsedSidebar ? collapseWidth : fullWidth);
  }, [isCollapsedSidebar]);

  return (
    <Box
      sx={{
        height: "480px",
        width: width,
      }}
    >
      <LayoutTitle title="Сделки" />
      <Stages
        deals={deals}
        dealStages={dealStages}
        userName={userName}
        onOpen={handleAddObject}
        getObjectAddress={getObjectAddress}
      />

      <CreateDealDialog objects={transformObjects} stages={dealStages} />
      <UpdateDealDialog objects={transformObjects} stages={dealStages} />
      <ObjectPageDialog />
    </Box>
  );
};

export default Deals;
