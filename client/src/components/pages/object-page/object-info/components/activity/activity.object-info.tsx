import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
// components
import LastContacts from "./components/last-contacts";
import ObjectMeetings from "./components/object-meetings";
import ObjectTasks from "./components/object-tasks";
// columns
import { tasksColumns } from "@columns/tasks.columns";
import { meetingsColumns } from "@columns/meetings.columns";
// hooks
import { getIsCurrentUserRoleManager } from "@store/user/users.store";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const AcitivtyObjectPage = ({ object, state, setState }) => {
  const isDialogPage = true;
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());

  return (
    <Component>
      <ObjectTasks
        object={object}
        setState={setState}
        columns={tasksColumns(setState, isCurrentUserRoleManager, isDialogPage)}
      />
      <ObjectMeetings
        object={object}
        setState={setState}
        columns={meetingsColumns({
          state: state,
          setState: setState,
          isCurrentUserRoleManager: isCurrentUserRoleManager
        })}
      />
      <LastContacts object={object} setState={setState} />
    </Component>
  );
};

export default AcitivtyObjectPage;
