import { Box, Typography, styled } from "@mui/material";
import { FC } from "react";

interface RowItemMapProps {
  title?: string;
  subTitle?: string | null;
  gap?: string;
}

interface ComponentProps {
  gap?: number | string;
}

const Component = styled(Box)<ComponentProps>(({ gap }) => ({
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  gap: gap
}));

const RowItemMap: FC<RowItemMapProps> = ({
  title = null,
  subTitle = "",
  gap = "4px"
}) => {
  return (
    <Component gap={gap}>
      <Typography>
        <b>{title}</b>
      </Typography>
      {<Typography>{subTitle}</Typography>}
    </Component>
  );
};

export default RowItemMap;
