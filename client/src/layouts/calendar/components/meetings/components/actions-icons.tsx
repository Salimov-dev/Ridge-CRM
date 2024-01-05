import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import CalendarActionIcon from "../../../../../components/common/calendar/calendar-body/components/month/calendar-action-icon";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
import { getCurrentUserId, getIsUserCurator } from "@store/user/users.store";

const ActionsContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const ActionsIcons = ({ day, setState, isCurrentDay, isFutureDay }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const {
    handleOpenCreateManagerTaskPage,
    handleOpenCreateMyTaskPage,
    handleOpenCreateMeetingPage,
  } = useDialogHandlers(setState);

  return (
    <ActionsContainer>
      <>
        {isCurator ? (
          <CalendarActionIcon
            tooltipTitle="Добавить менеджеру задачу"
            hoverColor={colors.task["managerTask"]}
            icon={
              <ControlPointOutlinedIcon
                sx={{ width: "100%", height: "100%" }}
              />
            }
            day={day}
            onClick={() => handleOpenCreateManagerTaskPage(day)}
            isCurrentDay={isCurrentDay}
            isFutureDay={isFutureDay}
          />
        ) : null}
        <CalendarActionIcon
          tooltipTitle="Добавить встречу"
          hoverColor={colors.meeting["primary"]}
          icon={<AccessTimeIcon sx={{ width: "100%", height: "100%" }} />}
          day={day}
          onClick={() => handleOpenCreateMeetingPage(day)}
          isCurrentDay={isCurrentDay}
          isFutureDay={isFutureDay}
        />
      </>
      <CalendarActionIcon
        tooltipTitle="Добавить себе задачу"
        hoverColor={colors.task["myTask"]}
        icon={
          <ControlPointOutlinedIcon sx={{ width: "100%", height: "100%" }} />
        }
        day={day}
        onClick={() => handleOpenCreateMyTaskPage(day)}
        isCurrentDay={isCurrentDay}
        isFutureDay={isFutureDay}
      />
    </ActionsContainer>
  );
};

export default ActionsIcons;
