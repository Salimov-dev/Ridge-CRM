// libraries
import { useSelector } from "react-redux";
// components
import { FormatPhone, UserAvatar } from "../../../components/common/table/helpers/helpers";
import OpenButton from "./components/open-button";
// mock
import { gendersArray } from "../../../mock/genders";
// store
import { getUserStatusNameById } from "../../../store/user-statuses.store";
import { getUserNameById } from "../../../store/users.store";
// utils
import { FormatDate } from "../../../utils/format-date";

export const groupedColumns = [
  {
    header: "Основная информация",
    columns: [
      {
        accessorKey: "created_at",
        header: "Дата",
        cell: (info) => {
          const date = info.getValue();
          return FormatDate(new Date(date));
        },
      },
      {
        accessorKey: "image",
        header: "Аватар",
        cell: (info) => {
          const ava = info.getValue();
          return <UserAvatar path={ava}/>;
        },
      },
      {
        accessorKey: "name.lastName",
        header: "Фамилия",
        cell: (info) => {
          const lastName = info.getValue();
          return lastName;
        },
      },
      {
        accessorKey: "name.firstName",
        header: "Имя",
        cell: (info) => {
          const firstName = info.getValue();
          return firstName;
        },
      },
      {
        accessorKey: "name.surName",
        header: "Отчество",
        cell: (info) => {
          const surName = info.getValue();
          return surName;
        },
      },
      {
        accessorKey: "gender",
        header: "Пол",
        cell: (info) => {
          const gender = info.getValue();
          return gendersArray.find((gen) => gen._id === gender).name;
        },
      },
      {
        accessorKey: "birthday",
        header: "ДР",
        cell: (info) => {
          const birthday = info.getValue();
          return FormatDate(new Date(birthday));
        },
      },
    ],
  },
  {
    header: "Контакты",
    columns: [
      {
        accessorKey: "contacts.phone",
        header: "Телефон",
        cell: (info) => {
          const phone = info.getValue();
          return FormatPhone(phone);
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => {
          const email = info.getValue();
          return email;
        },
      },
    ],
  },
  {
    header: "Куратор и статус",
    columns: [
      {
        accessorKey: "curatorId",
        header: "Куратор",
        cell: (info) => {
          const curatorId = info.getValue();
          return useSelector(getUserNameById(curatorId));
        },
      },
      {
        accessorKey: "status",
        header: "Статус",
        cell: (info) => {
          const status = info.getValue();
          return useSelector(getUserStatusNameById(status));
        },
      },
    ],
  },
  {
    header: "Трудовой договор",
    columns: [
      {
        accessorKey: "contract.startDate",
        header: "От",
        cell: (info) => {
          const startDate = info.getValue();
          return FormatDate(new Date(startDate));
        },
      },
      {
        accessorKey: "contract.endDate",
        header: "До",
        cell: (info) => {
          const endDate = info.getValue();
          return FormatDate(new Date(endDate));
        },
      },
      {
        accessorKey: "contract.trialPeriod",
        header: "ИС",
        cell: (info) => {
          const trialPeriod = info.getValue();
          return trialPeriod ? FormatDate(new Date(trialPeriod)) : "";
        },
      },
    ],
  },
  {
    accessorKey: "_id",
    header: "Править",
    enableSorting: false,
    cell: (info) => {
      const id = info.getValue();
      return <OpenButton userId={id} />;
    },
  },
];
