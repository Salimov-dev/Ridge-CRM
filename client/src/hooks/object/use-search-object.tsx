import "dayjs/locale/ru";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getMeetingsList } from "../../store/meeting/meetings.store";
import { getTasksList } from "../../store/task/tasks.store";

const useSearchObject = (objects, data) => {
  const meetings = useSelector(getMeetingsList());
  const tasks = useSelector(getTasksList());

  const hasMeetings = (objectId) => {
    const objectsWithMeetings = meetings.filter(
      (meet) => meet?.objectId === objectId
    );
    const hasMeeting = objectsWithMeetings.length > 0;

    return hasMeeting;
  };

  const hasTasks = (objectId) => {
    const objectsWithTasks = tasks.filter(
      (task) => task?.objectId === objectId
    );
    const hasTasks = objectsWithTasks.length > 0;

    return hasTasks;
  };

  const searchedObjects = useMemo(() => {
    let array = objects;

    // object contacts
    if (data?.phone?.length) {
      array = array?.filter((obj) =>
        String(obj.contact.phone).includes(data?.phone)
      );
    }
    if (data?.name?.length) {
      array = array?.filter((obj) =>
        obj?.contact.name.toLowerCase().includes(data?.name.toLowerCase())
      );
    }

    // object params
    if (data?.address?.length) {
      array = array?.filter((obj) =>
        obj.location.address.toLowerCase().includes(data.address.toLowerCase())
      );
    }
    if (data.selectedStatuses?.length) {
      array = array?.filter((obj) =>
        data.selectedStatuses.includes(obj.status)
      );
    }
    if (data.selectedMetro?.length) {
      array = array?.filter((obj) =>
        data.selectedMetro.includes(obj.location.metro)
      );
    }
    if (data.selectedUsers?.length) {
      array = array?.filter((item) =>
        data.selectedUsers?.includes(item?.userId)
      );
    }
    if (data.selectedCurrentRenters?.length) {
      array = array?.filter((item) =>
        data.selectedCurrentRenters?.includes(
          item?.estateOptions.currentRenters
        )
      );
    }
    if (data.selectedEstateTypes?.length) {
      array = array?.filter((item) =>
        data.selectedEstateTypes?.includes(item?.estateOptions.estateTypes)
      );
    }
    if (data.selectedObjectTypes?.length) {
      array = array?.filter((item) =>
        data.selectedObjectTypes?.includes(item?.estateOptions.objectTypes)
      );
    }

    // Фильтр для выбранных районов и городов
    if (data.selectedDistricts?.length) {
      array = array?.filter((item) =>
        data.selectedDistricts.includes(item.location.district)
      );

      // Обновляем список выбранных городов на основе отфильтрованных районов
      const filteredCities = data.selectedDistricts?.reduce(
        (cities, district) => {
          return cities.concat(
            array
              ?.filter((item) => item.location?.district === district)
              .map((item) => item.location?.city)
          );
        },
        []
      );

      // Фильтруем города исходя из списка отфильтрованных городов
      if (data.selectedCities?.length) {
        array = array?.filter((item) =>
          filteredCities?.includes(item.location.city)
        );
      } else {
        array = array?.filter((item) =>
          data.selectedDistricts?.includes(item.location.district)
        );
      }
    } else if (data.selectedCities?.length) {
      array = array?.filter((item) =>
        data.selectedCities?.includes(item.location?.city)
      );
    }

    // objects data and time pickers
    if (data.startDate && data.endDate) {
      const startDate = dayjs(data.startDate);
      const endDate = dayjs(data.endDate).endOf("day");

      array = array?.filter((item) => {
        const itemDate = dayjs(item.created_at);
        return itemDate.isBetween(startDate, endDate, null, "[]");
      });
    } else if (data.startDate) {
      const selectedDate = dayjs(data.startDate);
      array = array?.filter((item) => dayjs(item.created_at) >= selectedDate);
    } else if (data.endDate) {
      const endDate = dayjs(data.endDate).endOf("day");
      array = array?.filter((item) => dayjs(item?.created_at) <= endDate);
    }

    // c номером телефона
    if (data.objectActivity === "534gdfsg2356hgd213mnbv") {
      array = array?.filter((item) => item?.contact.phone);
    }
    // без номера телефона
    if (data.objectActivity === "976hd324gfdsg324534543") {
      array = array?.filter((item) => !item?.contact.phone);
    }
    // с задачами
    if (data.objectActivity === "gf87634gdsfgsdf345tgdf") {
      array = array?.filter((item) => hasTasks(item._id));
    }
    // без задач
    if (data.objectActivity === "93254435gdf354yrt54hgh") {
      array = array?.filter((item) => !hasTasks(item._id));
    }
    // со встречами
    if (data.objectActivity === "7653gfdsgsd23fgdsgdfg") {
      array = array?.filter((item) => hasMeetings(item._id));
    }
    // без встреч
    if (data.objectActivity === "95459gdj239t54jgh95445") {
      array = array?.filter((item) => !hasMeetings(item._id));
    }
    // с последним звонком
    // if (data.objectActivity === "95459gdj239t54jgh95445") {
    //   array = array?.filter((item) => !hasMeetings(item._id));
    // }
    // без активности
    if (data.objectActivity === "hgfd235654hjf324543qre") {
      array = array?.filter(
        (item) => !hasMeetings(item._id) && !hasTasks(item._id)
      );
    }

    return array;
  }, [data, objects]);

  return searchedObjects;
};

export default useSearchObject;
