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
import { getCurrentUserId } from "../../store/user/users.store";
// mock
import { dealStagesArray } from "../../mock/deals-stages";

const Deals = () => {
  const objects = useSelector(getObjectsList());
  const dealStages = dealStagesArray;
  
  const currentUserId = useSelector(getCurrentUserId());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const getObjectAddress = (id) => {
    const object = objects?.find((obj) => obj?._id === id);
    const address = `${object?.location?.city}, ${object?.location?.address}`;
    return address;
  };

  return (
    <Box
 
    >
      <LayoutTitle title="Сделки" />
      <Stages stages={dealStages} getObjectAddress={getObjectAddress} />

      <ObjectPageDialog />
      <ObjectUpdatePageDialog />
    </Box>
  );
};

export default Deals;
