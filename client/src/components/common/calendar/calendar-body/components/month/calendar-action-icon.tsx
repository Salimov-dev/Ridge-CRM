import { Box, Tooltip, styled } from "@mui/material";

const Component = styled(Box)`
  display: flex;
  justify-content: end;
`;

const Icon = styled(Box)`
  width: 25px;
  height: 25px;
  opacity: 0.3;
`;

const CalendarActionIcon = ({
  tooltipTitle,
  icon,
  isCurrentDay,
  isFutureDay,
  hoverColor,
  day,
  onClick,
}) => {
  return (
    <Component onClick={() => onClick(day)}>
      {isCurrentDay || isFutureDay ? (
        <Tooltip title={tooltipTitle} placement="top-start" arrow>
          <Icon
            sx={{
              "&:hover": {
                opacity: "1",
                transform: "scale(1.2)",
                color: hoverColor,
              },
            }}
          >
            {icon}
          </Icon>
        </Tooltip>
      ) : null}
    </Component>
  );
};

export default CalendarActionIcon;
