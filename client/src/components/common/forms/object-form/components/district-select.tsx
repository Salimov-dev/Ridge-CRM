import SimpleSelectField from "@components/common/inputs/simple-select-field";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { districtsMSK } from "@data/districts/districts-msk";
import { districtsSPB } from "@data/districts/districts-spb";

const Container = styled(Box)`
  width: 100%;
  display: flex;
  gap: 4px;
  align-items: center;
`;

const DistrictName = styled(Box)`
  width: 100%;
  height: 51px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  border: 1px solid gray;
  border-radius: 4px;
`;

const DistrictSelect = ({ register, errors, watchDistrict, selectedArea }) => {
  const getDistrictsList = () => {
    if (selectedArea?.includes("Санкт-Петербург")) {
      return districtsSPB;
    }
    if (selectedArea?.includes("Москва")) {
      return districtsMSK;
    }

    return districtsSPB;
  };

  const hasDistrict =
    selectedArea?.includes("Санкт-Петербург") ||
    selectedArea?.includes("Москва");

  return (
    <>
      <Container>
        {!hasDistrict ? (
          <DistrictName>
            {selectedArea ? selectedArea : "Выберите адрес на карте"}
          </DistrictName>
        ) : (
          <SimpleSelectField
            label="Район"
            register={register}
            name="location.district"
            labelId="location.district"
            required={true}
            itemsList={getDistrictsList()}
            value={watchDistrict}
            errors={errors?.location?.district}
          />
        )}
      </Container>
    </>
  );
};

export default DistrictSelect;
