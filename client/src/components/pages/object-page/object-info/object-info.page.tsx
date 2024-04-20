// libraries
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
// components
import PageDialogs from "@components/common/dialog/page-dialogs";
import TabsStyled from "@components/common/tabs/tabs-styled";
import tabsObjectInfoPage from "./tabs/tabs.object-info";
// utils
import { getActualUsersList } from "@utils/actual-items/get-actual-users-list";
// store
import { getObjectsList } from "@store/object/objects.store";
import {
  getCurrentUserId,
  getIsCurrentUserRoleCurator
} from "@store/user/users.store";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const ObjectInfoPage = ({ object }) => {
  const [value, setValue] = useState(0);
  const [state, setState] = useState({
    createMyTaskPage: false,
    updateMyTaskPage: false,
    createManagerTaskPage: false,
    updateManagerTaskPage: false,
    createLastContactPage: false,
    updateLastContactPage: false,
    createMeetingPage: false,
    updateMeetingPage: false,
    taskId: "",
    objectId: "",
    lastContactId: "",
    meetingId: ""
  });

  const objectId = object?._id;
  const objects = useSelector(getObjectsList());
  const actualUsersList = getActualUsersList(objects);

  const currentUserId = useSelector(getCurrentUserId());
  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());

  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );
  const actualObjects = isCurrentUserRoleCurator ? currentUserObjects : objects;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (objectId) {
      setState((prevState) => ({ ...prevState, objectId: objectId }));
    }
  }, []);

  return (
    <Component>
      <TabsStyled
        tabs={tabsObjectInfoPage(object, setState)}
        value={value}
        onChange={handleTabChange}
      />
      <PageDialogs
        users={actualUsersList}
        state={state}
        setState={setState}
        objects={actualObjects}
      />
    </Component>
  );
};

export default ObjectInfoPage;