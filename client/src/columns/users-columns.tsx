// libraries
import { useDispatch, useSelector } from "react-redux";
// components
import TableOpenButton from "../components/common/buttons/table-open-button";
import {
  FormatPhone,
  UserAvatar,
} from "../components/common/table/helpers/helpers";
// mock
import { gendersArray } from "../mock/genders";
// store
import { getUserNameById } from "../store/user/users.store";
import { getUserStatusNameById } from "../store/user/user-statuses.store";
// utils
import { FormatDate } from "../utils/date/format-date";
import {
  setUpdateManagerId,
  setUpdateManagerOpenState,
} from "../store/user/update-user.store";
import { Typography } from "@mui/material";

export const usersColumns = [
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
          return <UserAvatar path={ava} />;
        },
      },
      {
        accessorKey: "name.lastName",
        header: "Фамилия",
        cell: (info) => {
          const lastName = info.getValue();
          return (
            <Typography sx={{ textAlign: "center" }}>{lastName}</Typography>
          );
        },
      },
      {
        accessorKey: "name.firstName",
        header: "Имя",
        cell: (info) => {
          const firstName = info.getValue();
          return (
            <Typography sx={{ textAlign: "center" }}>{firstName}</Typography>
          );
        },
      },
      {
        accessorKey: "name.surName",
        header: "Отчество",
        cell: (info) => {
          const surName = info.getValue();
          return (
            <Typography sx={{ textAlign: "center" }}>{surName}</Typography>
          );
        },
      },
      {
        accessorKey: "gender",
        header: "Пол",
        cell: (info) => {
          const gender = info.getValue();
          return (
            <Typography sx={{ textAlign: "center" }}>
              {gendersArray.find((gen) => gen._id === gender).name}
            </Typography>
          );
        },
      },
      {
        accessorKey: "birthday",
        header: "ДР",
        cell: (info) => {
          const birthday = info.getValue();
          return (
            <Typography sx={{ textAlign: "center" }}>
              {FormatDate(new Date(birthday))}
            </Typography>
          );
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
          return (
            <Typography sx={{ textAlign: "center" }}>
              {FormatPhone(phone)}
            </Typography>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => {
          const email = info.getValue();
          return <Typography sx={{ textAlign: "center" }}>{email}</Typography>;
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
          return (
            <Typography sx={{ textAlign: "center" }}>
              {useSelector(getUserNameById(curatorId))}
            </Typography>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Статус",
        cell: (info) => {
          const status = info.getValue();
          return (
            <Typography sx={{ textAlign: "center" }}>
              {useSelector(getUserStatusNameById(status))}
            </Typography>
          );
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
          return (
            <Typography sx={{ textAlign: "center" }}>
              {FormatDate(new Date(startDate))}
            </Typography>
          );
        },
      },
      {
        accessorKey: "contract.endDate",
        header: "До",
        cell: (info) => {
          const endDate = info.getValue();
          return (
            <Typography sx={{ textAlign: "center" }}>
              {FormatDate(new Date(endDate))}
            </Typography>
          );
        },
      },
      {
        accessorKey: "contract.trialPeriod",
        header: "ИС",
        cell: (info) => {
          const trialPeriod = info.getValue();
          return (
            <Typography sx={{ textAlign: "center" }}>
              {trialPeriod ? FormatDate(new Date(trialPeriod)) : ""}
            </Typography>
          );
        },
      },
    ],
  },
  {
    accessorKey: "_id",
    header: "Править",
    enableSorting: false,
    cell: (info) => {
      const userId = info.getValue();
      const dispatch = useDispatch();
      const handleClick = () => {
        dispatch(setUpdateManagerId(userId));
        dispatch(setUpdateManagerOpenState(true));
      };
      return <TableOpenButton text="Править" onClick={handleClick} />;
    },
  },
];
