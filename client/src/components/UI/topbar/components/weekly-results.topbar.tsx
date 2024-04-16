import React from "react";
import { Box, Tooltip, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import TopBarDataContainter from "./data-container.topbar-ui";
// utils
import { getCurrentWeekObjects } from "@utils/objects/get-current-week-objects";
import { getCurrentWeekPresentations } from "@utils/presentations/get-current-week-presentations";
import { getCurrentWeekMeetings } from "@utils/meetings/get-current-week-meetings";
import { getCurrentWeekTasks } from "@utils/tasks/get-current-week-tasks";
import { getCurrentWeekContacts } from "@utils/contacts/get-current-week-contacts";
// store
import { getObjectsLoadingStatus } from "@store/object/objects.store";
import { getPresentationsLoadingStatus } from "@store/presentation/presentations.store";
import { getMeetingLoadingStatus } from "@store/meeting/meetings.store";
import { getTaskLoadingStatus } from "@store/task/tasks.store";
import {
  getCurrentUserId,
  getIsCurrentUserRoleCurator
} from "@store/user/users.store";
import { getContactLoadingStatus } from "@store/contact/contact.store";

const ResultComponent = styled(Box)`
  display: flex;
  height: 50px;
  padding: 0 15px;
  gap: 8px;
  justify-content: center;
  align-items: center;
  border-top: 0px;
  border-radius: 0 0 6px 6px;
`;

const TopBarWeeklyResults = React.memo(() => {
  const currentUserId = useSelector(getCurrentUserId());
  const objects = getCurrentWeekObjects();
  const contacts = getCurrentWeekContacts();
  const presentations = getCurrentWeekPresentations();
  const meetings = getCurrentWeekMeetings();
  const tasks = getCurrentWeekTasks();

  const isCurrentUserRoleCurator = useSelector(getIsCurrentUserRoleCurator());
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());
  const isObjectLoading = useSelector(getObjectsLoadingStatus());
  const isContactsLoading = useSelector(getContactLoadingStatus());
  const isPresentationsLoading = useSelector(getPresentationsLoadingStatus());
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
    <ResultComponent>
      <TopBarDataContainter
        title="Объектов:"
        elements={objects}
        path="/objects"
        backgroundColor="DarkOrange"
        fontColor="white"
        isLoading={isObjectLoading}
      />
      <TopBarDataContainter
        title="Контактов:"
        elements={contacts}
        path="/contacts"
        backgroundColor="OrangeRed"
        isLoading={isContactsLoading}
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
          isCurrentUserRoleCurator
            ? currentUserTaskWithoutManagerTasks
            : currentUserTasks
        }
        path="/calendar"
        backgroundColor="Sienna"
        isLoading={isTasksLoading}
      />
      {isCurrentUserRoleCurator ? (
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
  );
});

export default TopBarWeeklyResults;
