import { useSelector } from "react-redux";
import { Dispatch, SetStateAction } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
// styled
import { AlignCenter } from "@styled/styled-columns";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
import UserNameWithAvatar from "@components/common/user/user-name-with-avatar";
import ObjectTableEntity from "@components/common/table-entities/object/object.table-entity";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
// icons
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudOffIcon from "@mui/icons-material/CloudOff";
// utils
import { FormatDate } from "@utils/date/format-date";
// store
import { getPresentationStatusNameById } from "@store/presentation/presentation-statuses.store";
import { getObjectById } from "@store/object/objects.store";
// interfaces
import { PresentationAgreementStatuses } from "@interfaces/presentation/presentation.interface";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// dialogs
import presentationsDialogsState from "@dialogs/dialog-handlers/presentations.dialog-handlers";

interface PresentationsColumnsProps {
  isCurrentUserRoleManager: boolean;
  isCurrentUserRoleCurator: boolean;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

export const presentationsColumns = ({
  setState,
  isCurrentUserRoleCurator,
  isCurrentUserRoleManager
}: PresentationsColumnsProps) => {
  let columns = [];

  const { handleOpenUpdatePresentationPage } = presentationsDialogsState({
    setState
  });

  const firstColumns = {
    header: "Презентация",
    columns: [
      {
        accessorKey: "created_at",
        header: "Дата",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const date = info.getValue();
          return <AlignCenter>{FormatDate(date)}</AlignCenter>;
        }
      },
      {
        accessorKey: "objectId",
        header: "Объект презентации",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const objectId = info.getValue();
          const object = useSelector(getObjectById(objectId));
          return <ObjectTableEntity object={object} setState={setState} />;
        }
      },
      {
        accessorKey: "cloudLink",
        header: "Облако",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const cloudLink = info.getValue();

          const handleOpenCloud = () => {
            const cloudLink = info.getValue();

            if (cloudLink) {
              window.open(cloudLink, "_blank");
            }
          };
          return cloudLink?.length ? (
            <AlignCenter>
              <Tooltip title="Открыть облако" placement="top-start" arrow>
                <Button onClick={handleOpenCloud}>
                  <CloudDoneIcon sx={{ color: "white" }} />
                </Button>
              </Tooltip>
            </AlignCenter>
          ) : (
            <AlignCenter>
              <Tooltip title="Облако отсутствует" placement="top-start" arrow>
                <CloudOffIcon sx={{ color: "white" }} />
              </Tooltip>
            </AlignCenter>
          );
        }
      }
    ]
  };

  const considerationColumn = {
    id: "considerationColumn",
    header: "Согласование",
    enableSorting: false,
    columns: [
      {
        accessorKey: "status",
        header: "Статус рассмотрения",
        cell: (info: { getValue: () => any }) => {
          const status = info.getValue();
          const name = useSelector(getPresentationStatusNameById(status));

          const getColor = () => {
            if (status === PresentationAgreementStatuses.ToBeAgreed) {
              return "orange";
            }
            if (status === PresentationAgreementStatuses.Refused) {
              return "red";
            }
            if (status === PresentationAgreementStatuses.Agreed) {
              return "green";
            }
            if (status === PresentationAgreementStatuses.Finalize) {
              return "blue";
            }
          };

          return (
            <AlignCenter>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "30px",
                  background: getColor()
                }}
              >
                {name}
              </Typography>
            </AlignCenter>
          );
        }
      },
      {
        accessorKey: "curatorComment",
        header: "Комментарий Куратора",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const curatorComment = info.getValue();
          return curatorComment ? (
            <AlignCenter>{curatorComment}</AlignCenter>
          ) : (
            <AlignCenter>Дождитесь итогов согласования</AlignCenter>
          );
        }
      }
    ]
  };

  const updateColumn = {
    id: "updateColumn",
    header: "-",
    columns: [
      {
        accessorKey: "_id",
        header: "Согласование",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const presentationId = info.getValue();

          return (
            <AlignCenter>
              {isCurrentUserRoleCurator ? (
                <ButtonStyled
                  title="СОГЛАСОВАТЬ"
                  style="CANCEL"
                  disabled={!isCurrentUserRoleCurator}
                  onClick={() =>
                    handleOpenUpdatePresentationPage(presentationId)
                  }
                />
              ) : (
                <ButtonStyled
                  title="Править"
                  style="PRESENTATION"
                  disabled={!isCurrentUserRoleCurator}
                  onClick={() =>
                    handleOpenUpdatePresentationPage(presentationId)
                  }
                />
              )}
            </AlignCenter>
          );
        }
      }
    ]
  };

  const managerColumn = {
    id: "managerColumn",
    header: "Менеджер",
    columns: isCurrentUserRoleManager !== undefined && [
      {
        accessorKey: "userId",
        header: "Фамилия и Имя",
        enableSorting: false,
        cell: (info: { getValue: () => any }) => {
          const userId = info.getValue();
          const { getAvatarSrc, isLoading } = useGetUserAvatar(userId);

          return (
            <AlignCenter>
              <UserNameWithAvatar
                userId={userId}
                avatarSrc={getAvatarSrc()}
                isLoading={isLoading}
              />
            </AlignCenter>
          );
        }
      }
    ]
  };

  if (!isCurrentUserRoleManager) {
    columns = [firstColumns, considerationColumn, managerColumn, updateColumn];
  } else {
    columns = [firstColumns, considerationColumn, updateColumn];
  }

  return columns;
};
