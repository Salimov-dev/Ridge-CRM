// libraries
import { useSelector } from "react-redux";
import { Box, Button, Tooltip, Typography } from "@mui/material";
// styled
import { AlignCenter } from "@styled/styled-columns";
// components
import ButtonStyled from "@components/common/buttons/button-styled.button";
import UserNameWithAvatar from "@components/common/user/user-name-with-avatar";
import AnyObjectTableEntity from "@components/common/table-entities/any-object.table-entity";
// hooks
import useGetUserAvatar from "@hooks/user/use-get-user-avatar";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// icons
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudOffIcon from "@mui/icons-material/CloudOff";
// utils
import { FormatDate } from "@utils/date/format-date";
// store
import { getPresentationStatusNameById } from "@store/presentation/presentation-status.store";
import { getObjectById } from "@store/object/objects.store";

export const presentationsColumns = (
  setState,
  isCurrentUserRoleCurator,
  isCurrentUserRoleManager
) => {
  let columns = [];

  const { handleOpenObjectPage, handleOpenUpdatePresentationPage } =
    useDialogHandlers(setState);

  const firstColumns = {
    header: "Презентация",
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
        accessorKey: "objectId",
        header: "Объект презентации",
        cell: (info) => {
          const objectId = info.getValue();
          const object = useSelector(getObjectById(objectId));
          return objectId ? (
            <AlignCenter>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <AnyObjectTableEntity
                  object={object}
                  onOpenObjectPage={handleOpenObjectPage}
                />
              </Box>
            </AlignCenter>
          ) : (
            <AlignCenter>-</AlignCenter>
          );
        }
      },
      {
        accessorKey: "cloudLink",
        header: "Облако",
        cell: (info) => {
          const cloudLink = info.getValue();

          const handleOpenCloud = () => {
            const cloudLink = info.getValue();

            if (cloudLink) {
              window.open(cloudLink, "_blank"); // Открывает ссылку в новой вкладке браузера
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
    header: "Рассмотрение",
    columns: [
      {
        accessorKey: "status",
        header: "Статус рассмотрения",
        cell: (info) => {
          const status = info.getValue();
          const name = useSelector(getPresentationStatusNameById(status));

          const getColor = () => {
            const toBeAgreed = "654wqeg3469y9dfsd82dd334";
            const refused = "654wqeporew325iugfu43005";
            const agreed = "654wqepvmq49450iqw23fd68";
            const finalize = "654wqe92hc0siq123of00q99";

            if (status === toBeAgreed) {
              return "orange";
            }
            if (status === refused) {
              return "red";
            }
            if (status === agreed) {
              return "green";
            }
            if (status === finalize) {
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
        cell: (info) => {
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
    header: "Согласование",
    columns: [
      {
        accessorKey: "_id",
        header: "Презентация",
        cell: (info) => {
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
        cell: (info) => {
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
