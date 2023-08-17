import { useSelector } from "react-redux";
import { Box, Typography, styled, Divider } from "@mui/material";
// utils
import { makeDigitSeparator } from "../../../../utils/make-digit-separator";
import { FormatDate } from "../../../../utils/format-date";
import { enterPhoneFormat } from "../../../../utils/enter-phone-format";
import { getPriceForRentMetr } from "../../../../utils/get-price-rent-for-metr";
// store
import { getMetroName } from "../../../../store/metro.store";
import { getUserNameById } from "../../../../store/users.store";
import { getObjectStatusNameById } from "../../../../store/object-status.store";
import { getWorkingPositionNameById } from "../../../../store/working-position.store";
import { getRentTypeNameById } from "../../../../store/rent-types.store";
import { getCurrentRenterNameById } from "../../../../store/current-renter.store";
import { getEstateConditionNameById } from "../../../../store/object-conditions.store";
import { getObjectTypeNameById } from "../../../../store/object-types.store";
import { getEstateTypeNameById } from "../../../../store/estate-types.store";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between; /* Center items and create space between them */
  margin-bottom: 20px;
`;

const InfoBlock = styled(Box)`
  display: flex;
  flex-direction: column;
  justift-content: center;
  white-space: nowrap;
  padding: 0 20px;
`;

const ObjectInfo = ({ object }) => {
  const metroName = useSelector(getMetroName(object?.location.metro));

  const createdTime = FormatDate(object?.created_at);
  const manager = useSelector(getUserNameById(object?.userId));
  const status = useSelector(getObjectStatusNameById(object?.status));

  const contactName = object?.contact.name;
  const contactPhone = enterPhoneFormat(object?.contact.phone);
  const contactEmail = object?.contact.email;
  const contactPosition = useSelector(
    getWorkingPositionNameById(object?.contact.position)
  );

  const priceForRentMetr = makeDigitSeparator(getPriceForRentMetr(object));
  const totalSquare = makeDigitSeparator(object?.commercialTerms.totalSquare);
  const rentHolidays = makeDigitSeparator(
    object?.commercialTerms.rentalHolidays
  );
  const rentSquare = makeDigitSeparator(object?.commercialTerms.rentSquare);
  const rentPrice = makeDigitSeparator(object?.commercialTerms.rentPrice);
  const agentComission = makeDigitSeparator(
    object?.commercialTerms.agentComission
  );
  const indexingAnnual = makeDigitSeparator(
    object?.commercialTerms.indexingAnnual
  );
  const rentTypes = useSelector(
    getRentTypeNameById(object?.commercialTerms.rentTypes)
  );

  const premisesHeight = object?.estateOptions.premisesHeight;
  const premisesFloor = object?.estateOptions.premisesFloor;
  const currentRenters = useSelector(
    getCurrentRenterNameById(object?.estateOptions.currentRenters)
  );
  const objectConditions = useSelector(
    getEstateConditionNameById(object?.estateOptions.objectConditions)
  );
  const estateTypes = useSelector(
    getEstateTypeNameById(object?.estateOptions.estateTypes)
  );
  const objectTypes = useSelector(
    getObjectTypeNameById(object?.estateOptions.objectTypes)
  );
  const parkingQuantity = object?.estateOptions.parkingQuantity;
  const electricityKw = object?.estateOptions.electricityKw;
  const waterSuply = object?.estateOptions.waterSuply;
  const cadastralNumber = object?.estateOptions.cadastralNumber;
  const loadingArea = object?.estateOptions.loadingArea;

  const readyToRent = !object?.accordTerms.readyToRent ? "Да" : "Нет";
  const readyToContract = !object?.accordTerms.readyToContract ? "Да" : "Нет";
  const readyToRenovation = !object?.accordTerms.readyToRenovation
    ? "Да"
    : "Нет";

  const fullDescription = object?.description.fullDescription;

  return (
    <>
      <Component>
        <InfoBlock>
          <h3>Информация:</h3>

          <Typography>Создан: {createdTime}</Typography>
          <Typography>Менеджер: {manager}</Typography>
          <Typography>Статус: {status}</Typography>
          <br/>
          <Typography>Метро: {metroName ? metroName : "без метро"}</Typography>
          <Typography>Кадастровый №: {cadastralNumber}</Typography>
        </InfoBlock>

        <Divider orientation="vertical" variant="middle" flexItem />
        <InfoBlock>
          <h3>Объект:</h3>
          <Typography>Текущий арендатор: {currentRenters}</Typography>
          <Typography>Тип недвижимости: {estateTypes}</Typography>
          <Typography>Тип объекта: {objectTypes}</Typography>
          <br/>
          <Typography>Электричество: {electricityKw}кВт</Typography>
          <Typography>Водоснабжение: {waterSuply}</Typography>
          <Typography>Высота потолков: {premisesHeight}м</Typography>
          <Typography>Состояние полов: {premisesFloor}</Typography>
          <br/>
          <Typography>Парковка: {parkingQuantity} авто</Typography>
          <Typography>Зона погрузки: {loadingArea}</Typography>
        </InfoBlock>

        <Divider orientation="vertical" variant="middle" flexItem />
        <InfoBlock>
          <h3>Условия:</h3>
          <Typography>Тип договора: {rentTypes}</Typography>
          <br />
          <Typography>Площадь (общая): {totalSquare}м²</Typography>
          <Typography>Площадь (аренда): {rentSquare}м²</Typography>
          <br />
          <Typography>Стоимость (аренда общая): {rentPrice}руб</Typography>
          <Typography>
            Стоимость (аренда м2): {priceForRentMetr}руб/м²
          </Typography>
          <Typography>Индексация: {indexingAnnual}% ежегодно</Typography>
          <br />
          <Typography>Каникулы: {rentHolidays} дней</Typography>
          <Typography>
            Комиссия агента: {agentComission}% или{" "}
            {makeDigitSeparator(
              (object?.commercialTerms.rentPrice / 100) * agentComission
            )}
            руб
          </Typography>
        </InfoBlock>

        <Divider orientation="vertical" variant="middle" flexItem />
        <InfoBlock>
          <h3>Контакты:</h3>
          <Typography>Контакт: {contactName}</Typography>
          <Typography>Позиция: {contactPosition}</Typography>
          <br />
          <Typography>Телефон: {contactPhone}</Typography>
          <Typography>E-mail: {contactEmail}</Typography>
        </InfoBlock>
      </Component>
      <Box sx={{ width: "100%", flex: "2" }}>
        <Typography>Описание: {fullDescription}</Typography>
      </Box>
    </>
  );
};

export default ObjectInfo;
