import "dayjs/locale/ru";
import dayjs from "dayjs";
import { useMemo } from "react";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
// interfaces
import { IObject } from "@interfaces/object/object.interface";
import { IDataProps } from "@interfaces/data/data-props.type";
import { isSearchQuery } from "@interfaces/search-query/is-search-query.type-guard";
import { IContact } from "@interfaces/contact/contact.inteface";
import { ICompany } from "@interfaces/company/company.inteface";
// store
import { getContactsList } from "@store/contact/contact.store";
import { getCompaniesList } from "@store/company/company.store";
import { getObjectsList } from "@store/object/objects.store";

interface IUseSearchObject {
  data: IDataProps;
}

const useSearchObject = ({ data }: IUseSearchObject) => {
  const objects: IObject[] = useSelector(getObjectsList());
  const contacts = useSelector(getContactsList());
  const companies = useSelector(getCompaniesList());

  const searchedObjects = useMemo(() => {
    let array = objects;

    // ПОИСК ПО АДРЕСУ
    if (data?.address) {
      const searchQuery = data.address;
      if (isSearchQuery(searchQuery)) {
        return (array = array?.filter((obj) =>
          obj?.address?.toLowerCase().includes(searchQuery.toLowerCase())
        ));
      }
    }

    // ПОИСК ПО ТЕЛЕФОНУ ИЗ КОНТАКТА
    if (data?.phone?.length) {
      const findedContacts: IContact[] = contacts?.filter((cont: IContact) => {
        const findedPhones = cont.phones?.filter((phones) =>
          phones?.phone.includes(String(data?.phone))
        );
        return findedPhones?.length > 0;
      });
      const contactIds = findedContacts?.map((cont: IContact) => cont._id);
      const result = array?.filter((obj) =>
        obj.contacts.some((elem) => contactIds?.includes(elem.contact))
      );

      return result;
    }

    // ПОИСК ПО ИМЕНИ КОНТАКТА
    if (data?.name?.length) {
      const searchQuery = data.name;
      const findedContacts: IContact[] = contacts?.filter((cont: IContact) => {
        if (isSearchQuery(searchQuery)) {
          const findedNames = cont.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());

          return findedNames;
        }
      });
      const contactIds = findedContacts?.map((cont: IContact) => cont._id);
      const result = array?.filter((obj) =>
        obj.contacts.some((contact) => contactIds?.includes(contact.contact))
      );
      return result;
    }

    // ПОИСК ПО ИМЕНИ КОМПАНИИ
    if (data?.company?.length) {
      const searchQuery = data.company;
      const findedCompanies: ICompany[] = companies?.filter(
        (comp: ICompany) => {
          if (isSearchQuery(searchQuery)) {
            const findedNames = comp.name
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase());

            return findedNames;
          }
        }
      );
      const companyIds = findedCompanies?.map((comp: ICompany) => comp._id);
      const result = array?.filter((obj) =>
        obj.companies.some((company) => companyIds?.includes(company.company))
      );
      return result;
    }

    // ПОИСК В ОПИСАНИИ ОБЪЕКТА
    if (data?.fullDescription?.length) {
      const searchQuery = data.fullDescription;
      if (isSearchQuery(searchQuery)) {
        return (array = array?.filter((obj) =>
          obj?.fullDescription
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        ));
      }
    }

    // ФИЛЬТРАЦИЯ ПО НАСЕЛЕННОМУ ПУНКТУ
    if (data.selectedCities?.length) {
      array = array?.filter((obj) => data.selectedCities?.includes(obj?.city));
    }

    // ФИЛЬТРАЦИЯ ПО РАЙОНУ
    if (data.selectedDistricts?.length) {
      array = array?.filter((obj) =>
        data.selectedDistricts?.includes(obj?.district)
      );
    }

    // ФИЛЬТРАЦИЯ ПО СТАНЦИИ МЕТРО
    if (data.selectedMetro?.length) {
      array = array?.filter((obj) => data.selectedMetro?.includes(obj?.metro));
    }

    // ФИЛЬТРАЦИЯ ПО СТАТУСУ ОБЪЕКТА
    if (data.selectedStatuses?.length) {
      array = array?.filter((obj) =>
        data.selectedStatuses?.includes(obj?.status)
      );
    }

    // ПОИСК ПО КАДАСТРОВОМУ НОМЕРУ
    if (data?.cadastralNumber?.length) {
      const searchQuery = data.cadastralNumber;
      if (isSearchQuery(searchQuery)) {
        return (array = array?.filter((obj) =>
          obj?.cadastralNumber
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        ));
      }
    }

    // ФИЛЬТРАЦИЯ ПО ТИПУ НЕДВИЖИМОСТИ
    if (data.selectedEstateTypes?.length) {
      array = array?.filter((obj) =>
        data.selectedEstateTypes?.includes(obj?.estateTypes)
      );
    }

    // ФИЛЬТРАЦИЯ ПО ТИПУ ОБЪЕКТА
    if (data.selectedObjectTypes?.length) {
      array = array?.filter((obj) =>
        data.selectedObjectTypes?.includes(obj?.objectTypes)
      );
    }

    // ФИЛЬТРАЦИЯ ПО РАСПОЛОЖЕНИЮ ОБЪЕКТА
    if (data.selectedObjectProperties?.length) {
      array = array?.filter((obj) =>
        data.selectedObjectProperties?.includes(obj?.objectProperties)
      );
    }

    // ФИЛЬТРАЦИЯ ПО ТИПУ ТОРГОВОЙ ПЛОЩАДИ
    if (data.selectedTradeArea?.length) {
      array = array?.filter((obj) =>
        data.selectedTradeArea?.includes(obj?.tradeArea)
      );
    }

    // ФИЛЬТРАЦИЯ ПО ТЕКУЩЕМУ АРЕНДАТОРУ
    if (data.selectedCurrentRenters?.length) {
      array = array?.filter((obj) =>
        data.selectedCurrentRenters?.includes(obj?.currentRenters)
      );
    }

    // ФИЛЬТРАЦИЯ ПО ДАТЕ СОЗДАНИЯ ОБЪЕКТА
    const startDate = dayjs(data.startDate as string);
    const endDate = dayjs(data.endDate as string).endOf("day");

    if (data.startDate && data.endDate) {
      array = array?.filter((obj) => {
        const objCreatedDate = dayjs(obj.created_at);
        return (
          objCreatedDate.isAfter(startDate) && objCreatedDate.isBefore(endDate)
        );
      });
    } else if (data.startDate) {
      array = array?.filter((obj) => dayjs(obj.created_at) >= startDate);
    } else if (data.endDate) {
      array = array?.filter((obj) => dayjs(obj?.created_at) <= endDate);
    }

    // выбор по менеджеру
    if (data.selectedUsers?.length) {
      array = array?.filter((obj) => data.selectedUsers?.includes(obj?.userId));
    }

    return array;
  }, [data, objects]);

  const sortedSearchedObjects = useMemo(() => {
    return orderBy(searchedObjects, ["created_at"], ["desc"]);
  }, [searchedObjects]);

  return sortedSearchedObjects;
};

export default useSearchObject;
