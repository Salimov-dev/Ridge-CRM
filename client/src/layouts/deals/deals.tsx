import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// components
import Stages from "./components/stages/stages";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import ObjectPageDialog from "../../components/UI/dialogs/object-page-dialog/object-page-dialog";
import ObjectUpdatePageDialog from "../../components/UI/dialogs/objects/object-update-page-dialog";
// store
import { getObjectsList } from "../../store/object/objects.store";
import { getDealStagesList } from "../../store/deal/deal-stages.store";
import { getSidebarCollapsState } from "../../store/sidebar-collaps-state.store";
import { getCurrentUserId } from "../../store/user/users.store";

const Deals = () => {
  const objects = useSelector(getObjectsList());
  const dealStages = useSelector(getDealStagesList());
  const currentUserId = useSelector(getCurrentUserId());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  const isCollapsedSidebar = useSelector(getSidebarCollapsState());
  const [width, setWidth] = useState(0);
  const screenWidth = window?.innerWidth;
  const fullWidth = screenWidth - 262;
  const collapseWidth = screenWidth - 132;

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const getObjectAddress = (id) => {
    const object = objects?.find((obj) => obj?._id === id);
    const address = `${object?.location?.city}, ${object?.location?.address}`;
    return address;
  };

  useEffect(() => {
    setWidth(isCollapsedSidebar ? collapseWidth : fullWidth);
  }, [isCollapsedSidebar]);

  return (
    <Box
      sx={{
        height: "100%",
        width: width,
      }}
    >
      <LayoutTitle title="Сделки" />
      <Stages stages={dealStages} getObjectAddress={getObjectAddress} />

      <ObjectPageDialog />
      <ObjectUpdatePageDialog />
    </Box>
  );
};

export default Deals;
