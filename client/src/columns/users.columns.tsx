// components
import { FormatPhone } from "@components/common/table/helpers/helpers";
import { AlignCenter } from "@components/common/columns/styled";
// data
import { gendersArray } from "../data/genders";
// components
import UserNameWithAvatar from "@components/common/user/user-name-with-avatar";
// utils
import { FormatDate } from "@utils/date/format-date";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
import ButtonStyled from "@components/common/buttons/button-styled.button";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "@store/user/users.store";
import { getObjectsList } from "@store/object/objects.store";
import { getContactsList } from "@store/contact/contact.store";
import { getCompaniesList } from "@store/company/company.store";
import { getPresentationsList } from "@store/presentation/presentations.store";

export const usersColumns = (onOpenUpdateUserPage) => [
  {
    header: "Основная информация",
    columns: [
      {
        accessorKey: "created_at",
        header: "Дата",
        cell: (info) => {
          const date = info.getValue();

          return <AlignCenter>{FormatDate(date)}</AlignCenter>;
        }
      },
      {
        accessorKey: "_id",
        header: "Аватар",
        cell: (info) => {
          const userId = info.getValue();
          const { getAvatarSrc, isLoading } = useGetUserAvatar(userId);

          return (
            <AlignCenter>
              <UserNameWithAvatar
                userId={userId}
                avatarSrc={getAvatarSrc()}
                isLoading={isLoading}
                withName={false}
              />
            </AlignCenter>
          );
        }
      },
      {
        accessorKey: "lastName",
        header: "Фамилия",
        cell: (info) => {
          const lastName = info.getValue();
          return <AlignCenter>{lastName || "-"}</AlignCenter>;
        }
      },
      {
        accessorKey: "firstName",
        header: "Имя",
        cell: (info) => {
          const firstName = info.getValue();
          return <AlignCenter>{firstName || "-"}</AlignCenter>;
        }
      },
      {
        accessorKey: "surName",
        header: "Отчество",
        cell: (info) => {
          const surName = info.getValue();
          return <AlignCenter>{surName || "-"}</AlignCenter>;
        }
      },
      {
        accessorKey: "gender",
        header: "Пол",
        cell: (info) => {
          const gender = info.getValue();
          const result = gendersArray?.find((gen) => gen?._id === gender)?.name;

          return <AlignCenter>{gender !== null ? result : "-"}</AlignCenter>;
        }
      },
      {
        accessorKey: "birthday",
        header: "ДР",
        cell: (info) => {
          const birthday = info.getValue();
          return <AlignCenter>{FormatDate(birthday)}</AlignCenter>;
        }
      }
    ]
  },

  {
    header: "Результаты",
    columns: [
      {
        accessorFn: (row) => row,
        header: "Объектов",
        cell: (info) => {
          const row = info.getValue();
          const userId = row?._id;

          const objects = useSelector(getObjectsList());
          const filteredObjects = objects?.filter(
            (obj) => obj.userId === userId
          );

          return <AlignCenter>{filteredObjects?.length}шт</AlignCenter>;
        }
      },
      {
        accessorFn: (row) => row,
        header: "Контактов",
        cell: (info) => {
          const row = info.getValue();
          const userId = row?._id;

          const contacts = useSelector(getContactsList());
          const filteredContacts = contacts?.filter(
            (obj) => obj.userId === userId
          );

          return <AlignCenter>{filteredContacts?.length}шт</AlignCenter>;
        }
      },
      {
        accessorFn: (row) => row,
        header: "Компаний",
        cell: (info) => {
          const row = info.getValue();
          const userId = row?._id;

          const companies = useSelector(getCompaniesList());
          const filteredCompanies = companies?.filter(
            (comp) => comp.userId === userId
          );

          return <AlignCenter>{filteredCompanies?.length}шт</AlignCenter>;
        }
      },
      {
        accessorFn: (row) => row,
        header: "Презентаций",
        cell: (info) => {
          const row = info.getValue();
          const userId = row?._id;

          const presentations = useSelector(getPresentationsList());
          const filteredPresentations = presentations?.filter(
            (pres) => pres.userId === userId
          );

          return <AlignCenter>{filteredPresentations?.length}шт</AlignCenter>;
        }
      }
    ]
  },

  {
    header: "Контакты",
    columns: [
      {
        accessorKey: "phone",
        header: "Телефон",
        cell: (info) => {
          const phone = info.getValue();

          return (
            <AlignCenter>
              {phone !== null ? FormatPhone(phone) : "-"}
            </AlignCenter>
          );
        }
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => {
          const email = info.getValue();
          return <AlignCenter>{email}</AlignCenter>;
        }
      }
    ]
  },
  {
    header: "Пользователь",
    columns: [
      {
        accessorFn: (row) => row,
        header: "Открыть",
        maxWidth: 70,
        minWidth: 50,
        width: 60,
        cell: (info) => {
          const row = info.getValue();
          const userId = row._id;

          const userRoleManager = "69gfoep3944jgjdso345002";
          const isRoleManager = row?.role.includes(userRoleManager);

          // const lastContactId = info.getValue();
          // const lastContact = useSelector(getLastContactsById(lastContactId));
          // const currentUserId = useSelector(getCurrentUserId());
          // const isAuthorEntity = useSelector(
          //   getIsUserAuthorThisEntity(currentUserId, lastContact)
          // );

          return (
            <AlignCenter>
              <ButtonStyled
                title="ПРАВИТЬ"
                background={isRoleManager ? "green" : "blue"}
                backgroundHover={isRoleManager ? "darkGreen" : "darkBlue"}
                colorHover="white"
                onClick={() => onOpenUpdateUserPage(userId)}
              />
            </AlignCenter>
          );
        }
      }
    ]
  }
];
