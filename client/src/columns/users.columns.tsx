// libraries
import { useSelector } from "react-redux";
// components
import { FormatPhone } from "@components/common/table/helpers/helpers";
import { AlignCenter } from "@components/common/columns/styled";
// data
import { gendersArray } from "../data/genders";
// store
import { getUserNameById } from "@store/user/users.store";
import { getUserStatusNameById } from "@store/user/user-statuses.store";
// utils
import { FormatDate } from "@utils/date/format-date";
// icons
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
import UserNameWithAvatar from "@components/common/table/components/user-name-with-avatar";
import ButtonStyled from "@components/common/buttons/button-styled.button";

export const usersColumns = (handleOpenUpdatePresentationPage) => [
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
        accessorKey: "_id",
        header: "Аватар",
        cell: (info) => {
          const userId = info.getValue();
          const { avatarSrc, isLoading } = useGetUserAvatar(userId);
          const getAvatarSrc = () => {
            return isLoading ? null : avatarSrc;
          };
          return (
            <UserNameWithAvatar
              userId={userId}
              avatarSrc={getAvatarSrc()}
              isLoading={isLoading}
            />
          );
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
    accessorFn: (row) => row,
    header: "Править",
    enableSorting: false,
    cell: (info) => {
      const userId = info.getValue()._id;

      return (
        <ButtonStyled
          title="Править"
          style="SUCCESS"
          onClick={() => handleOpenUpdatePresentationPage(userId)}
        />
      );
    },
  },
];
