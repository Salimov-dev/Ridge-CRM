import React from "react";
import { Box, Tooltip, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import TopBarDataContainter from "./topbar-data-container";
// utils
import { getCurrentWeekObjects } from "@utils/objects/get-current-week-objects";
import { getCurrentWeekPresentations } from "@utils/presentations/get-current-week-presentations";
import { getCurrentWeekMeetings } from "@utils/meetings/get-current-week-meetings";
import { getCurrentWeekTasks } from "@utils/tasks/get-current-week-tasks";
import { getCurrentWeekObjectsWithPhone } from "@utils/objects/get-current-week-objects-wtih-phone";
// store
import { getObjectsLoadingStatus } from "@store/object/objects.store";
import { getPresentationsLoadingStatus } from "@store/presentation/presentations.store";
import { getMeetingLoadingStatus } from "@store/meeting/meetings.store";
import { getTaskLoadingStatus } from "@store/task/tasks.store";
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";

const ResultComponent = styled(Box)`
  display: flex;
  height: 50px;
  padding: 0 15px;
  gap: 8px;
  justify-content: center;
  align-items: center;
  // border: 2px solid #1f2a40;
  border-top: 0px;
  border-radius: 0 0 6px 6px;
`;

const TopBarWeeklyResults = React.memo(() => {
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const objects = getCurrentWeekObjects();
  const isObjectLoading = useSelector(getObjectsLoadingStatus());
  const objectsWithPhone = getCurrentWeekObjectsWithPhone();

  const presentations = getCurrentWeekPresentations();
  const isPresentationsLoading = useSelector(getPresentationsLoadingStatus());

  const meetings = getCurrentWeekMeetings();
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());
  const tasks = getCurrentWeekTasks();
  const isTasksLoading = useSelector(getTaskLoadingStatus());

  const currentUserTasks = tasks?.filter(
    (task) => task.userId === currentUserId
  );
  const tasksFromCurator = tasks?.filter((task) => task.managerId !== null);

  const currentUserTaskWithoutManagerTasks = currentUserTasks?.filter(
    (task) => {
      const isTaskInTasksFromCurator = tasksFromCurator?.some(
        (curatorTask) => curatorTask._id === task._id
      );
      return !isTaskInTasksFromCurator;
    }
  );

  return (
    <Tooltip title="Результаты текущей недели" placement="bottom" arrow>
      <ResultComponent>
        <TopBarDataContainter
          title="Объектов:"
          elements={objects}
          path="/objects"
          backgroundColor="Gold"
          fontColor="black"
          isLoading={isObjectLoading}
        />
        <TopBarDataContainter
          title="С контактами:"
          elements={objectsWithPhone}
          path="/objects"
          backgroundColor="OrangeRed"
          isLoading={isObjectLoading}
        />
        <TopBarDataContainter
          title="Презентаций:"
          elements={presentations}
          path="/presentations"
          backgroundColor="SaddleBrown"
          isLoading={isPresentationsLoading}
        />
        <TopBarDataContainter
          title="Провести встреч:"
          elements={meetings}
          path="/meetings"
          backgroundColor="RoyalBlue"
          isLoading={isMeetingsLoading}
        />
        <TopBarDataContainter
          title="Выполнить задач:"
          elements={
            isCurator ? currentUserTaskWithoutManagerTasks : currentUserTasks
          }
          path="/calendar"
          backgroundColor="Sienna"
          isLoading={isTasksLoading}
        />
        {isCurator ? (
          <TopBarDataContainter
            title="Задач Менеджерам:"
            elements={tasksFromCurator}
            path="/calendar"
            backgroundColor="FireBrick"
            isLoading={isTasksLoading}
          />
        ) : (
          <TopBarDataContainter
            title="Задач от Куратора:"
            elements={tasksFromCurator}
            path="/calendar"
            backgroundColor="FireBrick"
            isLoading={isTasksLoading}
          />
        )}
      </ResultComponent>
    </Tooltip>
  );
});

export default TopBarWeeklyResults;
