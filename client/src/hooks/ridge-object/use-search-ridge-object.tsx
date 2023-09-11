import "dayjs/locale/ru";
import { useMemo } from "react";
import dayjs from "dayjs";
import { getRidgeTasksList } from "../../store/ridge-task/ridge-tasks.store";
import { getRidgeLastContactsList } from "../../store/ridge-last-contact/last-ridge-contact.store";
import { useSelector } from "react-redux";

const useSearchRidgeObject = (objects, data) => {

  const tasks = useSelector(getRidgeTasksList());
  const lastContacts = useSelector(getRidgeLastContactsList());

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

    if (data?.comment?.length) {
      array = array?.filter((obj) =>
        obj.comment.toLowerCase().includes(data.comment.toLowerCase())
      );
    }

    if (data?.contacts?.length) {
      array = array?.filter((obj) =>
        obj?.findedContacts?.toLowerCase().includes(data?.contacts?.toLowerCase())
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

    // date and time pickers
    if (data.startDate && data.endDate) {
      const startDate = dayjs(data.startDate);
      const endDate = dayjs(data.endDate).endOf("day");
      array = array?.filter((item) => {
        const itemDate = dayjs(item.date);
        return itemDate.isBetween(startDate, endDate, null, "[]");
      });
    } else if (data.startDate) {
      const selectedDate = dayjs(data.startDate);
      array = array?.filter((item) => dayjs(item.date) >= selectedDate);
    } else if (data.endDate) {
      const endDate = dayjs(data.endDate).endOf("day");
      array = array?.filter((item) => dayjs(item?.date) <= endDate);
    }

       // c контактами
       if (data.objectActivity === "09345gdsnvla234t4gdgdfs43") {
        array = array?.filter((obj) => obj?.findedContacts);
      }
      // без контактов
      if (data.objectActivity === "7634nhgdxsadwe235thshd3245") {
        array = array?.filter((obj) => !obj?.findedContacts);
      }
      // с задачами
      if (data.objectActivity === "9076342sg234yhgdfdsf345435") {
        array = array?.filter((obj) => hasTasks(obj._id));
      }
      // без задач
      if (data.objectActivity === "3487549ogokbnmsakwe4gdfs52") {
        array = array?.filter((obj) => !hasTasks(obj._id));
      }
      // с последним звонком
      if (data.objectActivity === "78650gkfh9030bawrlgjgsdf43") {
        array = array?.filter((obj) => hasLastContact(obj._id));
      }
      // без последнего звонка
      if (data.objectActivity === "3240gfdk10934pqvma3214f390") {
        array = array?.filter((obj) => !hasLastContact(obj._id));
      }
      // без активности
      if (data.objectActivity === "7652fgdnhgawqgzcv456g56873") {
        array = array?.filter(
          (obj) => !hasLastContact(obj._id) && !hasTasks(obj._id)
        );
      }

    return array;
  }, [data, objects]);

  return searchedObjects;
};

export default useSearchRidgeObject;
