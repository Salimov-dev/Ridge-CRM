import { Box, Typography, styled } from "@mui/material";

const StringContainer = styled(Box)`
  display: flex;
  align-items: flex-start;
  gap: 4px;
`;

const Attribute = ({ title, subTitle, withoutTypography = false }) => {
  return (
    <StringContainer>
      <Typography>
        <b>{title}</b>
      </Typography>
      {!withoutTypography ? <Typography>{subTitle}</Typography> : subTitle}
    </StringContainer>
  );
};

export default Attribute;
