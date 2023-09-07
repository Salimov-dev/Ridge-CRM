import { Box, Typography, styled } from "@mui/material";


const Attribute = ({ title, subTitle, withoutTypography = false, gap='4px' }) => {
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
      {!withoutTypography ? <Typography>{subTitle}</Typography> : subTitle}
    </StringContainer>
  );
};

export default Attribute;
