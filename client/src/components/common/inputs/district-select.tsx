import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { Box, FormHelperText, Typography } from "@mui/material";
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
// components
import SelectFieldStyled from "./select-field-styled";
// interfaces
import { IObjectCreateInitState } from "@interfaces/object/object.interface";
import { ITheme } from "@interfaces/theme/theme.interface";
// utils
import { objectHasDistrict } from "@utils/objects/object-has-district";
import {
  allDistrictsList,
  getFindedObjectDistrictsList
} from "@utils/objects/get-finded-object-districts-list";

interface DistrictSelectProps {
  register: UseFormRegister<IObjectCreateInitState>;
  errors: FieldErrors<IObjectCreateInitState>;
  watchDistrict: string;
  selectedArea: any;
  isUpdatePage?: boolean;
  disabled?: boolean;
}

interface DistrictNameProps {
  colors: ITheme;
  errors: FieldErrors<IObjectCreateInitState>;
}

const Container = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const DistrictName = styled(Box)(({ colors, errors }: DistrictNameProps) => ({
  width: "100%",
  height: "51px",
  display: "flex",
  padding: "0 16px",
  alignItems: "center",
  border: "1px solid",
  borderColor: errors?.district?.message ? colors.error["red"] : "grey",
  borderRadius: "4px"
}));

const DistrictSelect: FC<DistrictSelectProps> = ({
  register,
  errors,
  watchDistrict,
  selectedArea,
  isUpdatePage = false,
  disabled
}): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Container>
        {!isUpdatePage && !objectHasDistrict(selectedArea) ? (
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
          <SelectFieldStyled
            label="Район"
            register={register}
            name="district"
            labelId="district"
            required={true}
            itemsList={
              isUpdatePage
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
