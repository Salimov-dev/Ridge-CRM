import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { Box, FormHelperText, Typography } from "@mui/material";
// components
import SimpleSelectField from "@components/common/inputs/simple-select-field";
// data
import { hasDistrict } from "@data/object/has-district";
import {
  allDistrictsList,
  getFindedObjectDistrictsList
} from "@data/object/get-districts-list";

const Container = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const DistrictName = styled(Box)(({ colors, errors }) => ({
  width: "100%",
  height: "51px",
  display: "flex",
  padding: "0 16px",
  alignItems: "center",
  border: "1px solid",
  borderColor: errors?.district?.message ? colors.error["red"] : "grey",
  borderRadius: "4px"
}));

const DistrictSelect = ({
  register,
  errors,
  watchDistrict,
  selectedArea,
  isUpdate = false,
  disabled
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Container>
        {!isUpdate && !hasDistrict(selectedArea) ? (
          <DistrictName colors={colors} errors={errors}>
            {selectedArea ? (
              selectedArea
            ) : (
              <Typography
                sx={{
                  color: errors?.district?.message
                    ? colors.error["gold"]
                    : "Tomato"
                }}
              >
                Выберите объект на карте
              </Typography>
            )}
          </DistrictName>
        ) : (
          <SimpleSelectField
            label="Район"
            register={register}
            name="district"
            labelId="district"
            required={true}
            itemsList={
              isUpdate
                ? allDistrictsList()
                : getFindedObjectDistrictsList(selectedArea)
            }
            value={watchDistrict}
            errors={errors?.district}
            disabled={disabled}
          />
        )}
        {!selectedArea && (
          <FormHelperText
            sx={{ color: colors.error["gold"], paddingLeft: "14px" }}
          >
            {errors?.district?.message}
          </FormHelperText>
        )}
      </Container>
    </>
  );
};

export default DistrictSelect;
