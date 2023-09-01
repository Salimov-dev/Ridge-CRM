import { Box, Typography, styled } from "@mui/material";
import BasicTable from "../../../common/table/basic-table";
import {
  commercialTermsColumns,
  contactsColumns,
  estateOptionsColumns,
  estateTypeColumns,
  locationColumns,
} from "../../../../columns/object-page-columns";
import { meetingsColumns } from "../../../../columns/meetings-columns";
import { useSelector } from "react-redux";
import {
  getMeetingLoadingStatus,
  getObjectMeetingsList,
} from "../../../../store/meeting/meetings.store";
import DividerStyled from "../../../common/divider/divider-styled";
import {
  getObjectTasksList,
  getTaskLoadingStatus,
} from "../../../../store/task/tasks.store";
import { tasksColumns } from "../../../../columns/tasks-columns";
import AddAndClearFiltersButton from "../../../common/buttons/add-and-clear-filters-button";
import ObjectMeetings from "./components/object-meetings";
import ObjectsParams from "./components/object-params";
import ObjectTasks from "./components/object-tasks";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const ObjectInfo = ({ object, isLoading }) => {
  const description = object?.description?.fullDescription;
  const meetings = useSelector(getObjectMeetingsList(object._id));
  const meetingsColumn = meetingsColumns;
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());

  const tasks = useSelector(getObjectTasksList(object._id));
  const tasksColumn = tasksColumns;
  const isTasksLoading = useSelector(getTaskLoadingStatus());

  return (
    <Component>
      <ObjectsParams object={object} isLoading={isLoading} />
      <ObjectMeetings
        meetings={meetings}
        isMeetingsLoading={isMeetingsLoading}
      />
      <ObjectTasks tasks={tasks} isTasksLoading={isTasksLoading} />
    </Component>
  );
};

export default ObjectInfo;
