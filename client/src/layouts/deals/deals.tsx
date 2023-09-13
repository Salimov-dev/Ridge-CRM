import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// components
import LayoutTitle from "../../components/common/page-titles/layout-title";
import Stages from "./components/stages/stages";
import AddObjectToDealDialog from "../../components/UI/dialogs/deals/add-object-to-deal-dialog";
// store
import { getDealsList } from "../../store/deal/deal.store";
import { getSidebarCollapsState } from "../../store/sidebar-collaps-state.store";
import { getObjectsList } from "../../store/object/objects.store";
import { getDealStagesList } from "../../store/deal/deal-stages.store";
import {
  setAddObjectToDealOpenState,
  setAddObjectToDealStageId,
} from "../../store/deal/add-object-to-deal.store";
import {
  getCurrentUserId,
  getUserNameById,
} from "../../store/user/users.store";

const Deals = () => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(0);
  const deals = useSelector(getDealsList());
  const dealStages = useSelector(getDealStagesList());
  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const userName = useSelector(getUserNameById(currentUserId));
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  const isCollapsedSidebar = useSelector(getSidebarCollapsState());
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
    dispatch(setAddObjectToDealOpenState(true));
    dispatch(setAddObjectToDealStageId(id));
  };

  useEffect(() => {
    setWidth(isCollapsedSidebar ? collapseWidth : fullWidth);
  }, [isCollapsedSidebar, fullWidth, collapseWidth]);

  useEffect(() => {
    setTimeout(() => {
      setWidth(isCollapsedSidebar ? collapseWidth : fullWidth);
    }, 0);
  }, [isCollapsedSidebar, fullWidth, collapseWidth]);

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

      <AddObjectToDealDialog objects={transformObjects} stages={dealStages} />
    </Box>
  );
};

export default Deals;
