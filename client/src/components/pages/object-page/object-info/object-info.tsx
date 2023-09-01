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
import CreateMeetingButton from "../../../../layouts/calendar/components/header/components/create-meeting-button";
import CreateTaskButton from "../../../../layouts/calendar/components/header/components/create-task-button";

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
      <Typography variant="h3">Локация</Typography>
      <BasicTable
        items={[object]}
        itemsColumns={locationColumns}
        isLoading={isLoading}
        isPaginate={false}
      />

      <Typography variant="h3">Объект</Typography>
      <BasicTable
        items={[object]}
        itemsColumns={estateTypeColumns}
        isLoading={isLoading}
        isPaginate={false}
      />

      <Typography variant="h3">Параметры</Typography>
      <BasicTable
        items={[object]}
        itemsColumns={estateOptionsColumns}
        isLoading={isLoading}
        isPaginate={false}
      />

      <Typography variant="h3">Условия</Typography>
      <BasicTable
        items={[object]}
        itemsColumns={commercialTermsColumns}
        isLoading={isLoading}
        isPaginate={false}
      />

      <Typography variant="h3">Контакты</Typography>
      <BasicTable
        items={[object]}
        itemsColumns={contactsColumns}
        isLoading={isLoading}
        isPaginate={false}
      />

      <Typography variant="h3">Описание</Typography>
      <Box sx={{ marginBottom: "20px" }}>
        {description ? object.description.fullDescription : "Нет описания"}
      </Box>

      <DividerStyled />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3">Встречи по этому объекту:</Typography>
        <CreateMeetingButton />
      </Box>
      {meetings.length ? (
        <BasicTable
          items={meetings}
          itemsColumns={meetingsColumn}
          isLoading={isMeetingsLoading}
        />
      ) : (
        <Typography>Не обнаружены</Typography>
      )}

      <DividerStyled />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3">Задачи по этому объекту:</Typography>
        <CreateTaskButton title="Добавить встречу" background="red" />
      </Box>
      {tasks.length ? (
        <BasicTable
          items={tasks}
          itemsColumns={tasksColumn}
          isLoading={isTasksLoading}
        />
      ) : (
        <Typography>Не обнаружены</Typography>
      )}
    </Component>
  );
};

export default ObjectInfo;
