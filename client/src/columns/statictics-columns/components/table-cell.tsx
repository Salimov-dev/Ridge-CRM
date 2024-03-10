import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Position from "./position";
import { loadStaticticPositions } from "@store/statictics/statictics-positions.store";

const TableCell = ({
  objects = [],
  contacts = [],
  presentations = [],
  onlyTitle = false,
  isLastWeek = false
}) => {
  const staticticPositions = useSelector(loadStaticticPositions());
  const isObjects = staticticPositions?.includes("91dfgiuqh2314ugdfh2144213"); // Объекты
  const isContacts = staticticPositions?.includes(
    "91dfgiuqhufj23gh23j854h99" // Контакты
  );
  const isPresentations = staticticPositions?.includes(
    "91dfgiu76fh2384hgf4599565" // Презентации
  );

  const isShowAll = !isObjects && !isContacts && !isPresentations;

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
      {isShowAll || isObjects ? (
        <Position
          onlyTitle={onlyTitle}
          item={objects}
          title="Объекты"
          background="yellow"
          color="black"
        />
      ) : null}

      {isShowAll || isContacts ? (
        <Position
          onlyTitle={onlyTitle}
          item={contacts}
          title="Контакты"
          background="FireBrick"
        />
      ) : null}

      {isShowAll || isPresentations ? (
        <Position
          onlyTitle={onlyTitle}
          item={presentations}
          title="Презентации"
          background="RoyalBlue"
        />
      ) : null}
    </Box>
  );
};

export default TableCell;
