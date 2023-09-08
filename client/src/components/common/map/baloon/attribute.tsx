import { Box, Typography, styled } from "@mui/material";

const Attribute = ({
  title=null,
  subTitle,
  gap = "4px",
}) => {
  const StringContainer = styled(Box)`
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: ${gap};
  `;

  return (
    <StringContainer>
      <Typography>
        <b>{title}</b>
      </Typography>
      {<Typography>{subTitle}</Typography>}
    </StringContainer>
  );
};

export default Attribute;
