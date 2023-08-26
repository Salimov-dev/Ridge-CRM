import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, Typography, styled } from "@mui/material";
// components
import { FormatPhone } from "../../../components/common/table/helpers/helpers";
// utils
import { FormatDate } from "../../../utils/format-date";
import { makeDigitSeparator } from "../../../utils/make-digit-separator";
// store
import { getUserNameById } from "../../../store/users.store";
import { getDistrictById } from "../../../store/districts.store";
import { getRentTypeNameById } from "../../../store/rent-types.store";
import { getEstateTypeNameById } from "../../../store/estate-types.store";
import { getObjectTypeNameById } from "../../../store/object-types.store";
import { getCurrentRenterNameById } from "../../../store/current-renter.store";

const BaloonContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
  padding: 10px 0;
`;

const StringContainer = styled(Box)`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Baloon = ({ object }) => {
  const navigate = useNavigate();

  const totalSquare = object?.commercialTerms?.totalSquare;
  const rentSquare = object?.commercialTerms?.rentSquare;
  const rentPrice = object?.commercialTerms?.rentPrice;
  const rentTypes = object?.commercialTerms?.rentTypes;
  const name = object?.contact?.name;
  const phone = object?.contact?.phone;
  const email = object?.contact?.email;

  return (
    <BaloonContainer>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        onClick={() => navigate(`/objects/${object._id}`)}
        sx={{ paddingTop: "6px", marginBottom: "6px" }}
      >
        Перейти в объект
      </Button>
      <StringContainer>
        <Typography>
          <b>Дата создания:</b>
        </Typography>
        {FormatDate(object.created_at)}
      </StringContainer>
      <StringContainer>
        <Typography>
          <b>Менеджер:</b>
        </Typography>
        <Typography>{useSelector(getUserNameById(object?.userId))}</Typography>
      </StringContainer>
      <StringContainer>
        <Typography>
          <b>Город:</b>
        </Typography>
        <Typography>{object?.location?.city}</Typography>
      </StringContainer>
      <StringContainer>
        <Typography>
          <b>Район:</b>
        </Typography>
        <Typography>
          {useSelector(getDistrictById(object?.location?.district))}
        </Typography>
      </StringContainer>
      <StringContainer>
        <Typography>
          <b>Адрес:</b>
        </Typography>
        <Typography>{object?.location?.address}</Typography>
      </StringContainer>

      <Divider />

      <StringContainer>
        <Typography>
          <b>Тип объекта:</b>
        </Typography>
        <Typography>
          {useSelector(
            getObjectTypeNameById(object?.estateOptions?.objectTypes)
          )}
        </Typography>
      </StringContainer>
      <StringContainer>
        <Typography>
          <b>Тип недвиж:</b>
        </Typography>
        <Typography>
          {useSelector(
            getEstateTypeNameById(object?.estateOptions?.estateTypes)
          )}
        </Typography>
      </StringContainer>
      <StringContainer>
        <Typography>
          <b>Арендатор:</b>
        </Typography>
        <Typography>
          {useSelector(
            getCurrentRenterNameById(object?.estateOptions?.currentRenters)
          )}
        </Typography>
      </StringContainer>

      <Divider />

      <StringContainer>
        <Typography>
          <b>Площадь общая:</b>
        </Typography>
        {totalSquare ? `${makeDigitSeparator(totalSquare)}м²` : "-"}
      </StringContainer>
      <StringContainer>
        <Typography>
          <b>Площадь АП:</b>
        </Typography>
        <Typography>
          {rentSquare ? `${makeDigitSeparator(rentSquare)}м²` : "-"}
        </Typography>
      </StringContainer>
      <StringContainer>
        <Typography>
          <b>Стоимость АП:</b>
        </Typography>
        <Typography>
          {rentPrice ? `${makeDigitSeparator(rentPrice)}₽` : "-"}
        </Typography>
      </StringContainer>
      <StringContainer>
        <Typography>
          <b>Тип договора:</b>
        </Typography>
        <Typography>
          {rentTypes ? `${useSelector(getRentTypeNameById(rentTypes))}` : "-"}
        </Typography>
      </StringContainer>

      <Divider />

      <Typography>
        <b>Контакт:</b> {name ? `${name}` : "-"}
      </Typography>
      <StringContainer>
        <Typography>
          <b>Телефон:</b>
        </Typography>
        {phone ? FormatPhone(phone) : "-"}
      </StringContainer>
      <Typography>
        <b>Email:</b> {email ? email : "-"}
      </Typography>
    </BaloonContainer>
  );
};

export default Baloon;
