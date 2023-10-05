import "dayjs/locale/ru";
import dayjs from "dayjs";
import { useMemo} from "react";
import { useSelector } from "react-redux";
import { getMeetingsList } from "../../store/meeting/meetings.store";
import { getTasksList } from "../../store/task/tasks.store";
import { getLastContactsList } from "../../store/last-contact/last-contact.store";

const useSearchObject = (objects, data) => {
  const meetings = useSelector(getMeetingsList());
  const tasks = useSelector(getTasksList());
  const lastContacts = useSelector(getLastContactsList());

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

  const hasLastContact = (objectId) => {
    const objectsWithLastContact = lastContacts.filter(
      (contact) => contact?.objectId === objectId
    );
    const hasLastContact = objectsWithLastContact.length > 0;

    return hasLastContact;
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

    if (data?.address?.length) {
      array = array?.filter((obj) =>
      obj.location.address.toLowerCase().includes(data.address.toLowerCase())
      );
    }

    if (data?.cadastralNumber?.length) {
      array = array?.filter((obj) =>
      obj.estateOptions.cadastralNumber.includes(data.cadastralNumber)
      );
    }
    
    // object params
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
      array = array?.filter((obj) => data.selectedUsers?.includes(obj?.userId));
    }
    if (data.selectedCurrentRenters?.length) {
      array = array?.filter((obj) =>
        data.selectedCurrentRenters?.includes(obj?.estateOptions.currentRenters)
      );
    }
    if (data.selectedEstateTypes?.length) {
      array = array?.filter((obj) =>
        data.selectedEstateTypes?.includes(obj?.estateOptions.estateTypes)
      );
    }
    if (data.selectedObjectTypes?.length) {
      array = array?.filter((obj) =>
        data.selectedObjectTypes?.includes(obj?.estateOptions.objectTypes)
      );
    }

    // Фильтр для выбранных районов и городов
    if (data.selectedDistricts?.length) {
      array = array?.filter((obj) =>
        data.selectedDistricts.includes(obj.location.district)
      );

      // Обновляем список выбранных городов на основе отфильтрованных районов
      const filteredCities = data.selectedDistricts?.reduce(
        (cities, district) => {
          return cities.concat(
            array
              ?.filter((obj) => obj.location?.district === district)
              .map((obj) => obj.location?.city)
          );
        },
        []
      );

      // Фильтруем города исходя из списка отфильтрованных городов
      if (data.selectedCities?.length) {
        array = array?.filter((obj) =>
          filteredCities?.includes(obj.location.city)
        );
      } else {
        array = array?.filter((obj) =>
          data.selectedDistricts?.includes(obj.location.district)
        );
      }
    } else if (data.selectedCities?.length) {
      array = array?.filter((obj) =>
        data.selectedCities?.includes(obj.location?.city)
      );
    }

    // objects data and time pickers
    if (data.startDate && data.endDate) {
      const startDate = dayjs(data.startDate);
      const endDate = dayjs(data.endDate).endOf("day");

      array = array?.filter((obj) => {
        const objDate = dayjs(obj.created_at);
        return objDate.isBetween(startDate, endDate, null, "[]");
      });
    } else if (data.startDate) {
      const selectedDate = dayjs(data.startDate);
      array = array?.filter((obj) => dayjs(obj.created_at) >= selectedDate);
    } else if (data.endDate) {
      const endDate = dayjs(data.endDate).endOf("day");
      array = array?.filter((obj) => dayjs(obj?.created_at) <= endDate);
    }

    // c номером телефона
    if (data.objectActivity === "534gdfsg2356hgd213mnbv") {
      array = array?.filter((obj) => obj?.contact.phone);
    }
    // без номера телефона
    if (data.objectActivity === "976hd324gfdsg324534543") {
      array = array?.filter((obj) => !obj?.contact.phone);
    }
    // с задачами
    if (data.objectActivity === "gf87634gdsfgsdf345tgdf") {
      array = array?.filter((obj) => hasTasks(obj._id));
    }
    // без задач
    if (data.objectActivity === "93254435gdf354yrt54hgh") {
      array = array?.filter((obj) => !hasTasks(obj._id));
    }
    // со встречами
    if (data.objectActivity === "7653gfdsgsd23fgdsgdfg") {
      array = array?.filter((obj) => hasMeetings(obj._id));
    }
    // без встреч
    if (data.objectActivity === "95459gdj239t54jgh95445") {
      array = array?.filter((obj) => !hasMeetings(obj._id));
    }
    // с последним звонком
    if (data.objectActivity === "765gdf2345ytrhgfd2354") {
      array = array?.filter((obj) => hasLastContact(obj._id));
    }
    // без последнего звонка
    if (data.objectActivity === "5149gjgnvmzofhwey45568") {
      array = array?.filter((obj) => !hasLastContact(obj._id));
    }
    // без активности
    if (data.objectActivity === "hgfd235654hjf324543qre") {
      array = array?.filter(
        (obj) => !hasMeetings(obj._id) && !hasTasks(obj._id)
      );
    }

    return array;
  }, [data, objects]);

  return searchedObjects;
};

export default useSearchObject;
