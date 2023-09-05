import { Typography } from "@mui/material";
import DividerStyled from "../../../../../../../../../../components/common/divider/divider-styled";

const Result = ({ task }) => {
  const result = task?.result
  const isDone = task?.isDone;

  return result ? (
    <>
      <DividerStyled color={isDone ? "darkGray" : "gray"} />
      <Typography>
        <b>Итог:</b> {result}
      </Typography>
    </>
  ) : null;
};

export default Result;
