import { useSelector } from "react-redux";
import useTableHeader from "../../../columns/result-my-columns/hooks/use-table-header";
import { objectStatusesArray } from "../../../mock/object/object-status";
import { getWeeklyObjects } from "../../../utils/objects/get-weekly-objects";
import { getWeeklyObjectsWithPhone } from "../../../utils/objects/get-weekly-objects-with-phone";
import { getObjectsList } from "../../../store/object/objects.store";
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { getLastContactsList } from "../../../store/last-contact/last-contact.store";

const useData = () => {
  const currentDate = dayjs();
  const objects = useSelector(getObjectsList());
  const lastContacts = useSelector(getLastContactsList());

  // текущая неделя месяца
  const startOfCurrentWeek = currentDate.startOf("week");
  const endOfCurrentWeek = currentDate.endOf("week").day(0);
  const currentWeek = `${startOfCurrentWeek.format(
    "DD.MM"
  )} - ${endOfCurrentWeek.format("DD.MM")}`;

  const weeklyObjects = getWeeklyObjects(startOfCurrentWeek, endOfCurrentWeek);
  const weeklyObjectsWithPhone = getWeeklyObjectsWithPhone(
    startOfCurrentWeek,
    endOfCurrentWeek
  );

  // предыдущая неделя месяца
  const previousWeek = useTableHeader(1);
  const endOfPrevWeek = currentDate.subtract(1, "week").endOf("week");
  const startOfPrevWeek = endOfPrevWeek.subtract(6, "day");

  const formattedStartPrevWeekDate = endOfPrevWeek.format("YYYY-MM-DD");
  const formattedEndPrevWeekDate = startOfPrevWeek.format("YYYY-MM-DD");
  const previousWeekObjects = getWeeklyObjects(
    formattedStartPrevWeekDate,
    formattedEndPrevWeekDate
  );
  const previousWeekObjectsWithPhone = getWeeklyObjectsWithPhone(
    formattedStartPrevWeekDate,
    formattedEndPrevWeekDate
  );

  // 3 неделя месяца
  const thirdWeek = useTableHeader(2);
  const startOfThirdWeek = currentDate.subtract(1, "week").endOf("week");
  const endOfThirdWeek = startOfThirdWeek.subtract(6, "day");

  const formattedStartNexDate = startOfThirdWeek.format("YYYY-MM-DD");
  const formattedEndNexDate = endOfThirdWeek.format("YYYY-MM-DD");
  const thirdWeekObjects = getWeeklyObjects(
    formattedStartNexDate,
    formattedEndNexDate
  );
  const thirdWeekObjectsWithPhone = getWeeklyObjectsWithPhone(
    formattedStartNexDate,
    formattedEndNexDate
  );

  // 4 неделя месяца
  const fourthWeek = useTableHeader(3);
  const startOFourthWeek = currentDate.subtract(3, "week").startOf("week");
  const endOFourthWeek = startOFourthWeek.add(6, "day");

  const formattedStarFourthDate = startOFourthWeek.format("YYYY-MM-DD");
  const formattedEnFourthDate = endOFourthWeek.format("YYYY-MM-DD");
  const fourthWeekObjects = getWeeklyObjects(
    formattedStarFourthDate,
    formattedEnFourthDate
  );
  const fourthWeekObjectsWithPhone = getWeeklyObjectsWithPhone(
    formattedStarFourthDate,
    formattedEnFourthDate
  );

  // объекты для отрисовки кривых линий
  const chartData = [
    {
      id: "Объекты",
      color: "hsl(313, 70%, 50%)",
      data: [
        {
          x: fourthWeek,
          y: fourthWeekObjects?.length,
        },
        {
          x: thirdWeek,
          y: thirdWeekObjects?.length,
        },
        {
          x: previousWeek,
          y: previousWeekObjects?.length,
        },
        {
          x: currentWeek,
          y: weeklyObjects?.length,
        },
      ],
    },
    {
      id: "С телефоном",
      color: "hsl(313, 70%, 50%)",
      data: [
        {
          x: fourthWeek,
          y: fourthWeekObjectsWithPhone?.length - fourthWeekObjects?.length,
        },
        {
          x: thirdWeek,
          y:
            thirdWeekObjectsWithPhone?.length -
            thirdWeekObjectsWithPhone?.length,
        },
        {
          x: previousWeek,
          y: previousWeekObjectsWithPhone?.length - previousWeekObjects?.length,
        },
        {
          x: currentWeek,
          y: weeklyObjectsWithPhone?.length - weeklyObjects?.length,
        },
      ],
    },
  ];

  // объекты для отрисовки пирога
  const usedStatuses = {};
  objects?.forEach((object) => {
    const statusId = object.status;
    if (
      statusId &&
      objectStatusesArray.some((status) => status._id === statusId)
    ) {
      if (usedStatuses[statusId]) {
        usedStatuses[statusId]++;
      } else {
        usedStatuses[statusId] = 1;
      }
    }
  });

  const filteredObjectStatuses = objectStatusesArray?.filter(
    (status) => usedStatuses[status._id]
  );

  const pieData = filteredObjectStatuses?.map((status) => {
    return {
      id: status.name,
      label: status.name,
      value: usedStatuses[status._id],
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    };
  });

  const hasLastContact = (objectId) => {
    const objectsWithLastContact = lastContacts?.filter(
      (contact) => contact?.objectId === objectId
    );
    const hasLastContact = objectsWithLastContact?.length > 0;

    return hasLastContact;
  };

  const objectsWithoutLastContacts = objects?.filter(
    (obj) => !hasLastContact(obj._id)
  );

  const objectsOneToTwoMonth = objects?.filter((obj) => {
    const objectId = obj?._id;
    const lastContactsList = lastContacts?.filter(
      (contact) => contact.objectId === objectId
    );
    const sortedLastContacts = orderBy(lastContactsList, "date", ["desc"]);
    const lastContact = sortedLastContacts[0]?.date;

    if (!lastContact) {
      return false; // Если нет информации о последнем звонке, объект не попадает в фильтр
    }

    const lastContactDate = dayjs(lastContact);

    return lastContactDate.isBetween(
      currentDate.subtract(2, "months"),
      currentDate.subtract(1, "months")
    );
  });

  const objectsTwoToThreeMonth = objects?.filter((obj) => {
    const objectId = obj?._id;
    const lastContactsList = lastContacts?.filter(
      (contact) => contact.objectId === objectId
    );
    const sortedLastContacts = orderBy(lastContactsList, "date", ["desc"]);
    const lastContact = sortedLastContacts[0]?.date;

    if (!lastContact) {
      return false; // Если нет информации о последнем звонке, объект не попадает в фильтр
    }

    const lastContactDate = dayjs(lastContact);

    return lastContactDate.isBetween(
      currentDate.subtract(3, "months"),
      currentDate.subtract(2, "months")
    );
  });

  const objectsThreeAndMoreMonth = objects?.filter((obj) => {
    const objectId = obj?._id;
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

  const pieDataWithContacts = [
    {
      id: "Без звонков",
      label: "Объектов без звонков", // Замените на соответствующее поле объекта
      value: objectsWithoutLastContacts?.length, // Замените на поле, содержащее количество контактов
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    },
    {
      id: "От 1 до 2 мес",
      label: "Звонили от 1 до 2 мес назад", // Замените на соответствующее поле объекта
      value: objectsOneToTwoMonth?.length, // Замените на поле, содержащее количество контактов
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    },
    {
      id: "От 2 до 3 мес",
      label: "Звонили от 2 до 3 мес назад", // Замените на соответствующее поле объекта
      value: objectsTwoToThreeMonth?.length, // Замените на поле, содержащее количество контактов
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    },
    {
      id: "От 3 мес и более",
      label: "Звонили от 3 мес и более назад", // Замените на соответствующее поле объекта
      value: objectsThreeAndMoreMonth?.length, // Замените на поле, содержащее количество контактов
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    },
  ];

  return { chartData, pieData, pieDataWithContacts };
};

export default useData;
