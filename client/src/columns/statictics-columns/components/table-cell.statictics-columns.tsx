import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { loadStaticticPositions } from "@store/statictics/statictics-positions.store";
import PositionStatisticsColumns from "./position.statictics-columns";
import {
  statisticPositionContact,
  statisticPositionObject,
  statisticPositionPresentation
} from "@data/statistics/statistic-positions";

const TableCellStatisticsColumns = ({
  objects = [],
  contacts = [],
  presentations = [],
  onlyTitle = false,
  isLastWeek = false
}) => {
  const staticticPositions = useSelector(loadStaticticPositions());
  const positionIsObjects = staticticPositions?.includes(
    statisticPositionObject
  );
  const positionIsContacts = staticticPositions?.includes(
    statisticPositionContact
  );
  const positionIsPresentations = staticticPositions?.includes(
    statisticPositionPresentation
  );

  const isShowAllPositions =
    !positionIsObjects && !positionIsContacts && !positionIsPresentations;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "6px",
        border: isLastWeek ? "3px dashed white" : "none",
        padding: isLastWeek ? "4px" : "none"
      }}
    >
      {isShowAllPositions || positionIsObjects ? (
        <PositionStatisticsColumns
          onlyTitle={onlyTitle}
          item={objects}
          title="Объекты"
          background="yellow"
          color="black"
        />
      ) : null}

      {isShowAllPositions || positionIsContacts ? (
        <PositionStatisticsColumns
          onlyTitle={onlyTitle}
          item={contacts}
          title="Контакты"
          background="FireBrick"
        />
      ) : null}

      {isShowAllPositions || positionIsPresentations ? (
        <PositionStatisticsColumns
          onlyTitle={onlyTitle}
          item={presentations}
          title="Презентации"
          background="RoyalBlue"
        />
      ) : null}
    </Box>
  );
};

export default TableCellStatisticsColumns;
