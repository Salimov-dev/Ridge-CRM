// libraries
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import { orderBy } from "lodash";
// components
import LayoutTitle from "../../components/common/page-titles/layout-title";
import BasicTable from "../../components/common/table/basic-table";
import ObjectCreatePageDialog from "../../components/UI/dialogs/objects/object-create-page-dialog";
import ObjectPageDialog from "../../components/UI/dialogs/object-page-dialog/object-page-dialog";
import ObjectUpdatePageDialog from "../../components/UI/dialogs/objects/object-update-page-dialog";
import ChangePeriodButton from "./components/change-period-button";
// columns
import { objectsColumns } from "../../columns/objects-columns/objects-columns";
// store
import {
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/object/objects.store";
import { getLastContactsList } from "../../store/last-contact/last-contact.store";

const ChangePeriodsContainer = styled(Box)`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  gap: 6px;
  justify-content: space-between;
`;

const ObjectsDatabase = () => {
  const [period, setPeriod] = useState("fromOneMonthToTwo");
  const isLoading = useSelector(getObjectsLoadingStatus());
  const objects = useSelector(getObjectsList());
  const columns = objectsColumns;
  const lastContacts = useSelector(getLastContactsList());
  const currentDate = dayjs();

  let array = objects;

  // Фильтр для "Звонок от 1 до 2 месяцев"
  if (period === "fromOneMonthToTwo") {
    array = array?.filter((obj) => {
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
  }

  // Фильтр для "Звонок от 2 до 3 месяцев"
  if (period === "fromTwoMonthToThree") {
    array = array?.filter((obj) => {
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
  }

  // Фильтр для "Звонок от 3 месяцев"
  if (period === "fromThreeMonthAndMore") {
    array = array?.filter((obj) => {
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
  }

  const fromOneMonthToTwoCount = objects?.filter((obj) => {
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

  const fromTwoMonthToThreeCount = objects?.filter((obj) => {
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

  const fromThreeMonthAndMoreCount = objects?.filter((obj) => {
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

  const sortedObjects = orderBy(array, ["created_at"], ["desc"]);

  const handleChangePeriod = (period) => {
    setPeriod(period);
  };

  return (
    <Box>
      <LayoutTitle title="Проработка базы объектов" />
      <ChangePeriodsContainer>
        {/* <ChangePeriodButton
          width="100%"
          text={`${currentWeek} (${weeklyObjects?.length}шт)`}
          background="DarkGreen"
          backgroundHover="ForestGreen"
        />
        <ChangePeriodButton
          width="100%"
          text="06.11 - 12.11 (18шт)"
          background="DarkGreen"
          backgroundHover="ForestGreen"
        />
        <ChangePeriodButton
          width="100%"
          text="13.11 - 19.11 (6шт)"
          background="DarkGreen"
          backgroundHover="ForestGreen"
        />
        <ChangePeriodButton
          width="100%"
          text="20.11 - 26.11 (5шт)"
          background="DarkGreen"
          backgroundHover="ForestGreen"
        /> */}

        <ChangePeriodButton
          periodName="fromOneMonthToTwo"
          minWidth="320px"DarkGreen
          text={`Не звонили от 1мес до 2мес (${fromOneMonthToTwoCount?.length}шт)`}
          background="DarkGreen"
          backgroundHover="ForestGreen"
          count={fromOneMonthToTwoCount?.length}
          onClick={handleChangePeriod}
        />
        <ChangePeriodButton
          periodName="fromTwoMonthToThree"
          minWidth="320px"
          text={`Не звонили от 2мес до 3мес (${fromTwoMonthToThreeCount?.length}шт)`}
          background="DarkOrange"
          backgroundHover="Tomato"
          onClick={handleChangePeriod}
        />
        <ChangePeriodButton
          periodName="fromThreeMonthAndMore"
          minWidth="320px"
          text="Не звонили более 3мес (12шт)"
          background="FireBrick"
          backgroundHover="Crimson"
          text={`Не звонили более 3мес (${fromThreeMonthAndMoreCount?.length}шт)`}
          onClick={handleChangePeriod}
        />
      </ChangePeriodsContainer>

      <BasicTable
        items={sortedObjects}
        itemsColumns={columns}
        isLoading={isLoading}
      />

      <ObjectCreatePageDialog />
      <ObjectPageDialog />
      <ObjectUpdatePageDialog />
    </Box>
  );
};

export default ObjectsDatabase;
