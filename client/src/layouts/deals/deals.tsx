import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
// components
import Stages from "./components/stages/stages";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import CreateDealDialog from "../../components/UI/dialogs/deals/create-deal-dialog";
import UpdateDealDialog from "../../components/UI/dialogs/deals/update-deal-dialog";
import ObjectPageDialog from "../../components/UI/dialogs/object-page-dialog/object-page-dialog";
// store
import { getDealsList } from "../../store/deal/deal.store";
import { getObjectsList } from "../../store/object/objects.store";
import { getDealStagesList } from "../../store/deal/deal-stages.store";
import { getSidebarCollapsState } from "../../store/sidebar-collaps-state.store";
import {
  setCreateDealOpenState,
  setCreateDealStageId,
} from "../../store/deal/add-object-to-deal.store";
import {
  getCurrentUserId,
  getUserNameById,
} from "../../store/user/users.store";

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

  const sortedDeals = orderBy(deals, ["created_at"], ["desc"]);
  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const getObjectAddress = (id) => {
    const object = objects?.find((obj) => obj?._id === id);
    const address = `${object?.location?.city}, ${object?.location?.address}`;
    return address;
  };

  const handleCreateDeal = (id) => {
    dispatch(setCreateDealOpenState(true));
    dispatch(setCreateDealStageId(id));
  };

  useEffect(() => {
    setWidth(isCollapsedSidebar ? collapseWidth : fullWidth);
  }, [isCollapsedSidebar]);

  return (
    <Box
      sx={{
        height: "580px",
        width: width,
      }}
    >
      <LayoutTitle title="Сделки" />
      <Stages
        deals={sortedDeals}
        stages={dealStages}
        userName={userName}
        onOpen={handleCreateDeal}
        getObjectAddress={getObjectAddress}
      />

      <CreateDealDialog
        objects={transformObjects}
        deals={deals}
        stages={dealStages}
      />
      <UpdateDealDialog objects={transformObjects} stages={dealStages} />
      <ObjectPageDialog />
    </Box>
  );
};

export default Deals;
