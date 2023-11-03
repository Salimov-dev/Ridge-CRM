import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
// components
import TopBarDataContainter from "./topbar-data-container";
// store
import { getPresentationsWeeklyList } from "../../../../store/presentation/presentations.store";
import {
  getObjectsWeeklyList,
  getObjectsWeeklyWithPhoneList,
} from "../../../../store/object/objects.store";
import { getMeetingsWeeklyList } from "../../../../store/meeting/meetings.store";
import { getTasksWeeklyList } from "../../../../store/task/tasks.store";
import {
  getCurrentUserId,
  getIsUserCurator,
} from "../../../../store/user/users.store";

const ResultComponent = styled(Box)`
  display: flex;
  height: 50px;
  padding: 0 30px;
  gap: 8px;
  justify-content: center;
  align-items: center;
  border: 2px dashed gray;
  border-top: 0px;
  border-radius: 0 0 6px 6px;
`;

const TopBarWeeklyResults = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  // 34-39 ворнинги 
  const presentations = useSelector(getPresentationsWeeklyList());
  const objects = useSelector(getObjectsWeeklyList());
  const objectsWithPhone = useSelector(getObjectsWeeklyWithPhoneList());
  const meetings = useSelector(getMeetingsWeeklyList());
  const tasks = useSelector(getTasksWeeklyList());

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
        title="Объектов за неделю:"
        elements={objects}
        path="/objects"
        backgroundColor="Gold"
        fontColor="black"
      />
      <TopBarDataContainter
        title="С контактами:"
        elements={objectsWithPhone}
        path="/objects"
        backgroundColor="OrangeRed"
      />
      <TopBarDataContainter
        title="Презентаций:"
        elements={presentations}
        path="/presentations"
        backgroundColor="SaddleBrown"
      />
      <TopBarDataContainter
        title="Провести встреч:"
        elements={meetings}
        path="/meetings"
        backgroundColor="RoyalBlue"
      />
      <TopBarDataContainter
        title="Выполнить задач:"
        elements={
          isCurator ? currentUserTaskWithoutManagerTasks : currentUserTasks
        }
        path="/calendar"
        backgroundColor="Sienna"
      />
      {isCurator ? (
        <TopBarDataContainter
          title="Задач Менеджерам:"
          elements={tasksFromCurator}
          path="/calendar"
          backgroundColor="FireBrick"
        />
      ) : (
        <TopBarDataContainter
          title="Задач от Куратора:"
          elements={tasksFromCurator}
          path="/calendar"
          backgroundColor="FireBrick"
        />
      )}
    </ResultComponent>
  );
};

export default TopBarWeeklyResults;
