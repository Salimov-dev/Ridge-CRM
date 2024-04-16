import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import "dayjs/locale/ru";
import { getLastContactsList } from "../../store/last-contact/last-contact.store";
import { getTasksList } from "../../store/task/tasks.store";

const useSearchObjectDatabase = (objects, data, period) => {
  const currentDate = dayjs();
  const lastContacts = useSelector(getLastContactsList());
  const tasks = useSelector(getTasksList());

  const searchedObjects = useMemo(() => {
    let array = objects;

    // Фильтр для "Звонок от 1 до 2 месяцев"
    if (period === "fromOneMonthToTwo") {
      array = array?.filter((obj) => {
        const objectId = obj?._id;

        // Проверяем, есть ли задачи с isCallTask === true и isDone === false
        const hasUnfinishedCallTasks = tasks?.some(
          (task) =>
            task.objectId === objectId && task.isCallTask && !task.isDone
        );

        if (hasUnfinishedCallTasks) {
          return false; // Если есть незавершенные звонки, объект не попадает в фильтр
        }

        const lastContactsList = lastContacts?.filter(
          (contact) => contact.objectId === objectId
        );

        const sortedLastContacts = orderBy(lastContactsList, "date", ["desc"]);
        const lastContact = sortedLastContacts[0]?.date;

        if (!lastContact) {
          return false; // Если нет информации о последнем звонке, объект не попадает в фильтр
        }

        const lastContactDate = dayjs(lastContact);

        // Проверяем, что разница между текущей датой и датой последнего контакта
        // составляет более 1 месяца, но не более 2 месяцев
        return lastContactDate.isBetween(
          currentDate.subtract(2, "months"),
          currentDate.subtract(1, "months")
        );
      });
    }

    // Фильтр для "Звонок от 2 до 3 месяцев"
    if (period === "fromTwoMonthToThree") {
      array = array?.filter((obj) => {
        const objectId = obj?._id;

        // Проверяем, есть ли задачи с isCallTask === true и isDone === false
        const hasUnfinishedCallTasks = tasks?.some(
          (task) =>
            task.objectId === objectId && task.isCallTask && !task.isDone
        );

        if (hasUnfinishedCallTasks) {
          return false; // Если есть незавершенные звонки, объект не попадает в фильтр
        }

        const lastContactsList = lastContacts?.filter(
          (contact) => contact.objectId === objectId
        );

        const sortedLastContacts = orderBy(lastContactsList, "date", ["desc"]);
        const lastContact = sortedLastContacts[0]?.date;

        if (!lastContact) {
          return false; // Если нет информации о последнем звонке, объект не попадает в фильтр
        }

        const lastContactDate = dayjs(lastContact);

        // Проверяем, что разница между текущей датой и датой последнего контакта
        // составляет более 2 месяцев, но не более 3 месяцев
        return lastContactDate.isBetween(
          currentDate.subtract(3, "months"),
          currentDate.subtract(2, "months")
        );
      });
    }

    // Фильтр для "Звонок от 3 месяцев"
    if (period === "fromThreeMonthAndMore") {
      array = array?.filter((obj) => {
        const objectId = obj?._id;

        // Проверяем, есть ли задачи с isCallTask === true и isDone === false
        const hasUnfinishedCallTasks = tasks?.some(
          (task) =>
            task.objectId === objectId && task.isCallTask && !task.isDone
        );

        if (hasUnfinishedCallTasks) {
          return false; // Если есть незавершенные звонки, объект не попадает в фильтр
        }

        const lastContactsList = lastContacts?.filter(
          (contact) => contact.objectId === objectId
        );

        const sortedLastContacts = orderBy(lastContactsList, "date", ["desc"]);
        const lastContact = sortedLastContacts[0]?.date;

        if (!lastContact) {
          return false; // Если нет информации о последнем звонке, объект не попадает в фильтр
        }

        const lastContactDate = dayjs(lastContact);

        // Проверяем, что разница между текущей датой и датой последнего контакта
        // составляет более 3 месяцев
        return lastContactDate.isBefore(currentDate.subtract(3, "months"));
      });
    }

    // Фильтр для "Звонок до 1 месяца"
    if (period === "beforeOneMonth") {
      array = array?.filter((obj) => {
        const objectId = obj?._id;
        const tasksList = tasks?.filter(
          (task) =>
            task.isCallTask &&
            task.objectId === objectId &&
            task.isDone === false
        );

        const sortedTasks = orderBy(tasksList, "date", ["desc"]);
        const lastTask = sortedTasks[0]?.date;

        if (!lastTask) {
          return false; // Если нет информации о последнем звонке, объект не попадает в фильтр
        }

        const lastTaskDate = dayjs(lastTask);

        // Проверяем, что разница между текущей датой и датой последнего контакта
        // составляет более 1 месяца, но не более 2 месяцев
        return lastTaskDate.isBetween(
          currentDate.add(0, "months"),
          currentDate.add(1, "months"),
          null,
          "(]"
        );
      });
    }

    // Фильтр для "Без следующего звонка"
    if (period === "withouNextCall") {
      array = array?.filter((obj) => {
        const objectId = obj?._id;
        const tasksList = tasks?.filter(
          (task) =>
            task.isCallTask &&
            task.objectId === objectId &&
            task.isDone === false &&
            dayjs(task.date).isAfter(currentDate) // Добавлено условие для выбора только будущих задач
        );

        // Проверяем, есть ли задачи с указанным условием
        if (tasksList && tasksList.length > 0) {
          return false; // Если есть такие задачи, объект не попадает в фильтр
        }

        return true; // Если нет задач с указанным условием, объект попадает в фильтр
      });
    }

    // Фильтр для "Надо позвонить через 1 месяц и до 2 месяцев"
    if (period === "afterOneMonthUpToTwo") {
      array = array?.filter((obj) => {
        const objectId = obj?._id;
        const tasksList = tasks?.filter(
          (task) =>
            task.isCallTask &&
            task.objectId === objectId &&
            task.isDone === false
        );

        const sortedTasks = orderBy(tasksList, "date", ["desc"]);
        const lastTask = sortedTasks[0]?.date;

        if (!lastTask) {
          return false; // Если нет информации о последнем звонке, объект не попадает в фильтр
        }

        const lastTaskDate = dayjs(lastTask);

        // Проверяем, что разница между текущей датой и датой последнего контакта
        // составляет более 1 месяца, но не более 2 месяцев
        return lastTaskDate.isBetween(
          currentDate.add(1, "months"),
          currentDate.add(2, "months"),
          null,
          "(]"
        );
      });
    }
    // Фильтр для "Надо позвонить через 2 месяца и до 3 месяцев"
    if (period === "afterTwoMonthUpToThree") {
      array = array?.filter((obj) => {
        const objectId = obj?._id;
        const tasksList = tasks?.filter(
          (task) =>
            task.isCallTask &&
            task.objectId === objectId &&
            task.isDone === false
        );

        const sortedTasks = orderBy(tasksList, "date", ["desc"]);
        const lastTask = sortedTasks[0]?.date;

        if (!lastTask) {
          return false; // Если нет информации о последнем звонке, объект не попадает в фильтр
        }

        const lastTaskDate = dayjs(lastTask);

        // Проверяем, что разница между текущей датой и датой последнего контакта
        // составляет более 2 месяца, но не более 3 месяцев
        return lastTaskDate.isBetween(
          currentDate.add(2, "months"),
          currentDate.add(3, "months"),
          null,
          "(]"
        );
      });
    }

    // Фильтр для "Надо позвонить через 3 месяца и более afterThreeMonthAndMore"
    if (period === "afterThreeMonthAndMore") {
      array = array?.filter((obj) => {
        const objectId = obj?._id;
        const tasksList = tasks?.filter(
          (task) =>
            task.isCallTask &&
            task.objectId === objectId &&
            task.isDone === false
        );

        const sortedTasks = orderBy(tasksList, "date", ["desc"]);
        const lastTask = sortedTasks[0]?.date;

        if (!lastTask) {
          return false; // Если нет информации о последнем звонке, объект не попадает в фильтр
        }

        const lastTaskDate = dayjs(lastTask);

        // Проверяем, что разница между текущей датой и датой последнего контакта
        // составляет более 3 месяцев
        return lastTaskDate.diff(currentDate, "months", true) >= 3;
      });
    }

    return array;
  }, [data, objects]);

  let filteredObjects = searchedObjects;
  if (data.selectedUsers?.length) {
    filteredObjects = filteredObjects?.filter((obj) =>
      data.selectedUsers.includes(obj.userId)
    );
  }
  if (data.selectedStatuses?.length) {
    filteredObjects = filteredObjects?.filter((obj) =>
      data.selectedStatuses.includes(obj.status)
    );
  }

  const sortedFilteredObjects = useMemo(() => {
    return orderBy(filteredObjects, ["created_at"], ["desc"]);
  }, [filteredObjects]);

  const searchedSortedObjects = useMemo(() => {
    return orderBy(searchedObjects, ["created_at"], ["asc"]);
  }, [searchedObjects]);

  return {
    searchedObjects: searchedSortedObjects,
    filteredObjects: sortedFilteredObjects
  };
};

export default useSearchObjectDatabase;
