import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
import Position from "./components/position";
import { loadStaticticPositions } from "../../../store/statictics/statictics-positions.store";

const TableCell = ({
  objects = [],
  objectsWithPhone = [],
  presentations = [],
  onlyTitle = false,
}) => {
  const staticticPositions = useSelector(loadStaticticPositions());
  const isObjects = staticticPositions?.includes("91dfgiuqh2314ugdfh2144213");
  const isObjectsWithPhone = staticticPositions?.includes(
    "91dfgiuqhufj23gh23j854h99"
  );
  const isPresentations = staticticPositions?.includes(
    "91dfgiu76fh2384hgf4599565"
  );

  const isShowAll = !isObjects && !isObjectsWithPhone && !isPresentations;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "6px",
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

      {isShowAll || isObjectsWithPhone ? (
        <Position
          onlyTitle={onlyTitle}
          item={objectsWithPhone}
          title="С телефоном"
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
