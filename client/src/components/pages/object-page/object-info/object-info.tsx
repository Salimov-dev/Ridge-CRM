// libraries
import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
// components
import PageDialogs from "@components/common/dialog/page-dialogs";
import Acitivty from "./components/activity/activity";
import Contacts from "./components/contacts/contacts";
import TabsStyled from "@components/common/tabs/tabs-styled";
import Information from "./components/information/information";
// store
import { getObjectsList } from "@store/object/objects.store";
import {
  getCurrentUserId,
  getIsUserCurator,
  getUsersList
} from "@store/user/users.store";
import { getActualUsersList } from "@utils/actual-items/get-actual-users-list";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const ObjectInfo = ({ object, objectId, isLoading }) => {
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

  const objects = useSelector(getObjectsList());
  const usersList = getActualUsersList(objects);
  const users = useSelector(getUsersList());

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );
  const actualObjects = isCurator ? currentUserObjects : objects;

  const tabs = [
    {
      label: "Информация",
      component: <Information object={object} isLoading={isLoading} />
    },
    {
      label: "Контакты",
      component: <Contacts object={object} setState={setState} />
    },
    {
      label: "Активность",
      component: (
        <Acitivty object={object} objectId={objectId} setState={setState} />
      )
    }
  ];
  const [value, setValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Component>
      <TabsStyled tabs={tabs} value={value} onChange={handleTabChange} />
      <PageDialogs
        users={usersList}
        state={state}
        setState={setState}
        objects={actualObjects}
      />
    </Component>
  );
};

export default ObjectInfo;
