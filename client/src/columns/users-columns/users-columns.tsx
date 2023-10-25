// libraries
import { useDispatch, useSelector } from "react-redux";
// components
import MultiColorContainedButton from "../../components/common/buttons/multi-color-contained-button";
import {
  FormatPhone,
  UserAvatar,
} from "../../components/common/table/helpers/helpers";
import { AlignCenter } from "../../components/common/columns/styled";
// mock
import { gendersArray } from "../../mock/genders";
// store
import { getUserNameById } from "../../store/user/users.store";
import { getUserStatusNameById } from "../../store/user/user-statuses.store";
import {
  setUpdateManagerId,
  setUpdateManagerOpenState,
} from "../../store/user/update-user.store";
// utils
import { FormatDate } from "../../utils/date/format-date";
// icons
import basicAva from "../../assets/basic-ava.jpg"

export const usersColumns = [
  {
    header: "Основная информация",
    columns: [
      {
        accessorKey: "created_at",
        header: "Дата",
        cell: (info) => {
          const date = info.getValue();
          return FormatDate(date);
        },
      },
      {
        accessorKey: "image",
        header: "Аватар",
        cell: (info) => {
          const ava = info.getValue();
          return <UserAvatar path={ava ? ava : basicAva} />;
        },
      },
      {
        accessorKey: "name.lastName",
        header: "Фамилия",
        cell: (info) => {
          const lastName = info.getValue();
          return <AlignCenter>{lastName}</AlignCenter>;
        },
      },
      {
        accessorKey: "name.firstName",
        header: "Имя",
        cell: (info) => {
          const firstName = info.getValue();
          return <AlignCenter>{firstName}</AlignCenter>;
        },
      },
      {
        accessorKey: "name.surName",
        header: "Отчество",
        cell: (info) => {
          const surName = info.getValue();
          return <AlignCenter>{surName}</AlignCenter>;
        },
      },
      {
        accessorKey: "gender",
        header: "Пол",
        cell: (info) => {
          const gender = info.getValue();
          return (
            <AlignCenter>
              {gendersArray.find((gen) => gen._id === gender).name}
            </AlignCenter>
          );
        },
      },
      {
        accessorKey: "birthday",
        header: "ДР",
        cell: (info) => {
          const birthday = info.getValue();
          return <AlignCenter>{FormatDate(birthday)}</AlignCenter>;
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
          return <AlignCenter>{FormatPhone(phone)}</AlignCenter>;
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => {
          const email = info.getValue();
          return <AlignCenter>{email}</AlignCenter>;
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
            <AlignCenter>{useSelector(getUserNameById(curatorId))}</AlignCenter>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Статус",
        cell: (info) => {
          const status = info.getValue();
          return (
            <AlignCenter>
              {useSelector(getUserStatusNameById(status))}
            </AlignCenter>
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
          return <AlignCenter>{FormatDate(startDate)}</AlignCenter>;
        },
      },
      {
        accessorKey: "contract.endDate",
        header: "До",
        cell: (info) => {
          const endDate = info.getValue();
          return <AlignCenter>{FormatDate(endDate)}</AlignCenter>;
        },
      },
      {
        accessorKey: "contract.trialPeriod",
        header: "ИС",
        cell: (info) => {
          const trialPeriod = info?.getValue();

          return (
            <AlignCenter>
              {trialPeriod ? FormatDate(trialPeriod) : ""}
            </AlignCenter>
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
      const dispatch = useDispatch();
      const userId = info.getValue();

      const handleClick = () => {
        dispatch<any>(setUpdateManagerId(userId));
        dispatch<any>(setUpdateManagerOpenState(true));
      };

      return (
        <MultiColorContainedButton
          text="Править"
          onClick={handleClick}
          background="chocolate"
          backgroudHover="sienna"
          fontColor="white"
        />
      );
    },
  },
];
