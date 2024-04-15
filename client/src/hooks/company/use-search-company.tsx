import "dayjs/locale/ru";
import { useMemo } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { getObjectsList } from "@store/object/objects.store";

const useSearchCompany = (companies, data) => {
  const objects = useSelector(getObjectsList());

  const searchedCompanies = useMemo(() => {
    let array = companies;

    // Найти по названию компании
    if (data?.company?.length) {
      array = array?.filter((comp) =>
        comp.name.toLowerCase().includes(data.company.toLowerCase())
      );
    }

    // Найти по адресу объекта
    if (data?.address?.length) {
      const findedObjects = objects?.filter((obj) =>
        obj?.address?.toLowerCase()?.includes(data?.address.toLowerCase())
      );
      const objectIds = findedObjects?.map((obj) => obj._id);

      const result = array?.filter((cont) =>
        cont.objects.some((obj) => objectIds?.includes(obj.object))
      );

      return result;
    }

    // Добавлены от и до
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

    return array;
  }, [data, companies]);

  return searchedCompanies;
};

export default useSearchCompany;
