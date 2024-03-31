const citiesArray = [
  {
    _id: "34gffd34rgfd00032",
    name: "Москва",
    region: "77",
    latitude: 37.61892916430014,
    longitude: 55.755167662127775,
    zoom: 10
  },
  {
    _id: "45ffgfd45gffd00453",
    name: "Санкт-Петербург",
    region: "78",
    latitude: 30.311575833970437,
    longitude: 59.949006391820724,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00454",
    name: "Майкоп",
    region: "01",
    latitude: 40.100516,
    longitude: 44.609955,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00456",
    name: "Уфа",
    region: "02",
    latitude: 55.94415890788642,
    longitude: 54.74092819249899,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00457",
    name: "Улан-Удэ",
    region: "03",
    latitude: 107.60482401844357,
    longitude: 51.83465288815205,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00455",
    name: "Горно-Алтайск",
    region: "04",
    latitude: 85.94673855273427,
    longitude: 51.955457707732656,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00458",
    name: "Махачкала",
    region: "05",
    latitude: 47.476901499999975,
    longitude: 42.963613482465554,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00459",
    name: "Магас",
    region: "06",
    latitude: 44.8135,
    longitude: 43.1655,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00460",
    name: "Нальчик",
    region: "07",
    latitude: 43.6279,
    longitude: 43.4842,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00461",
    name: "Элиста",
    region: "08",
    latitude: 44.25575849999993,
    longitude: 46.321225319445716,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00462",
    name: "Черкесск",
    region: "09",
    latitude: 42.0578,
    longitude: 44.2233,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00463",
    name: "Петрозаводск",
    region: "10",
    latitude: 34.3596,
    longitude: 61.7891,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00464",
    name: "Сыктывкар",
    region: "11",
    latitude: 50.8361,
    longitude: 61.6688,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00465",
    name: "Симферополь",
    region: "12",
    latitude: 34.1001,
    longitude: 44.948,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00466",
    name: "Йошкар-Ола",
    region: "13",
    latitude: 47.8998,
    longitude: 56.6344,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00467",
    name: "Саранск",
    region: "14",
    latitude: 45.18214313232414,
    longitude: 54.19029615251865,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00468",
    name: "Якутск",
    region: "16",
    latitude: 129.7325,
    longitude: 62.0281,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00469",
    name: "Владикавказ",
    region: "15",
    latitude: 44.6821,
    longitude: 43.0241,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00470",
    name: "Казань",
    region: "16",
    latitude: 49.07717120116938,
    longitude: 55.804270856588225,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00471",
    name: "Кызыл",
    region: "17",
    latitude: 94.4376,
    longitude: 51.7192,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00472",
    name: "Ижевск",
    region: "18",
    latitude: 53.2115,
    longitude: 56.8526,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00473",
    name: "Абакан",
    region: "19",
    latitude: 91.4424,
    longitude: 53.7223,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00474",
    name: "Грозный",
    region: "20",
    latitude: 45.6983,
    longitude: 43.3178,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00475",
    name: "Чебоксары",
    region: "21",
    latitude: 47.25,
    longitude: 56.1333,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00476",
    name: "Барнаул",
    region: "22",
    latitude: 83.7636,
    longitude: 53.3606,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00477",
    name: "Чита",
    region: "24",
    latitude: 113.4993,
    longitude: 52.034,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00478",
    name: "Петропавловск-Камчатский",
    region: "25",
    latitude: 158.655,
    longitude: 53.037,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00479",
    name: "Краснодар",
    region: "23",
    latitude: 38.975,
    longitude: 45.0355,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00480",
    name: "Красноярск",
    region: "24",
    latitude: 92.8526,
    longitude: 56.0097,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00481",
    name: "Пермь",
    region: "25",
    latitude: 56.2344,
    longitude: 58.0103,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00482",
    name: "Владивосток",
    region: "25",
    latitude: 131.8735,
    longitude: 43.1056,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00483",
    name: "Ставрополь",
    region: "26",
    latitude: 41.9691,
    longitude: 45.0448,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00484",
    name: "Хабаровск",
    region: "27",
    latitude: 135.0599,
    longitude: 48.4647,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00485",
    name: "Благовещенск",
    region: "28",
    latitude: 127.5489,
    longitude: 50.2721,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00486",
    name: "Архангельск",
    region: "29",
    latitude: 40.5169,
    longitude: 64.5361,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00487",
    name: "Астрахань",
    region: "30",
    latitude: 48.0336,
    longitude: 46.3476,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00488",
    name: "Белгород",
    region: "31",
    latitude: 36.58355299999997,
    longitude: 50.585989778936856,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00489",
    name: "Брянск",
    region: "32",
    latitude: 34.3667,
    longitude: 53.2667,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00490",
    name: "Владимир",
    region: "33",
    latitude: 40.4,
    longitude: 56.1333,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00491",
    name: "Волгоград",
    region: "34",
    latitude: 44.53121903942673,
    longitude: 48.715576177518,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00492",
    name: "Вологда",
    region: "35",
    latitude: 39.90404242576189,
    longitude: 59.218897661236106,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00493",
    name: "Воронеж",
    region: "36",
    latitude: 39.20312846191397,
    longitude: 51.66703445058373,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00494",
    name: "Иваново",
    region: "37",
    latitude: 40.9758677090943,
    longitude: 57.00263492630739,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00495",
    name: "Иркутск",
    region: "38",
    latitude: 104.27797440407788,
    longitude: 52.286833349700125,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00496",
    name: "Калининград",
    region: "39",
    latitude: 20.45,
    longitude: 54.7,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00497",
    name: "Калуга",
    region: "40",
    latitude: 36.26205593701168,
    longitude: 54.51573107820564,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00498",
    name: "Кемерово",
    region: "42",
    latitude: 86.09122580797363,
    longitude: 55.35347609827661,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00499",
    name: "Киров",
    region: "43",
    latitude: 49.6667,
    longitude: 58.6,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00500",
    name: "Кострома",
    region: "44",
    latitude: 40.9167,
    longitude: 57.7833,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00501",
    name: "Курган",
    region: "45",
    latitude: 65.34175576416011,
    longitude: 55.44318515059051,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00502",
    name: "Курск",
    region: "46",
    latitude: 36.19503970848508,
    longitude: 51.733850859685845,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00503",
    name: "Липецк",
    region: "47",
    latitude: 39.596519599455206,
    longitude: 52.60720563019769,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00504",
    name: "Магадан",
    region: "49",
    latitude: 150.8,
    longitude: 59.5667,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00505",
    name: "Красногорск",
    region: "50",
    latitude: 37.3255,
    longitude: 55.8227,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00506",
    name: "Мурманск",
    region: "51",
    latitude: 33.0833,
    longitude: 68.9667,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00507",
    name: "Нижний Новгород",
    region: "52",
    latitude: 44.00335548930727,
    longitude: 56.326369551668634,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00508",
    name: "Великий Новгород",
    region: "53",
    latitude: 31.2722,
    longitude: 58.5213,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00509",
    name: "Новосибирск",
    region: "54",
    latitude: 82.9339,
    longitude: 55.0324,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00510",
    name: "Омск",
    region: "55",
    latitude: 73.3686,
    longitude: 54.9924,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00511",
    name: "Оренбург",
    region: "56",
    latitude: 55.0968,
    longitude: 51.7682,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00512",
    name: "Орёл",
    region: "57",
    latitude: 36.0833,
    longitude: 52.9833,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00513",
    name: "Пенза",
    region: "58",
    latitude: 45.0083,
    longitude: 44.0367,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00514",
    name: "Псков",
    region: "60",
    latitude: 28.330836356933567,
    longitude: 57.81851962708709,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00515",
    name: "Ростов-на-Дону",
    region: "61",
    latitude: 39.7167,
    longitude: 47.2333,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00516",
    name: "Рязань",
    region: "62",
    latitude: 39.7247,
    longitude: 54.6078,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00517",
    name: "Самара",
    region: "63",
    latitude: 50.1501,
    longitude: 53.195,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00518",
    name: "Саратов",
    region: "64",
    latitude: 46.03176478639053,
    longitude: 51.53571456680565,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00519",
    name: "Южно-Сахалинск",
    region: "65",
    latitude: 142.7333,
    longitude: 46.9667,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00520",
    name: "Екатеринбург",
    region: "66",
    latitude: 60.6,
    longitude: 56.8333,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00521",
    name: "Смоленск",
    region: "67",
    latitude: 32.0444,
    longitude: 54.7818,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00522",
    name: "Тамбов",
    region: "68",
    latitude: 41.4562488211672,
    longitude: 52.725093190637786,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00523",
    name: "Тверь",
    region: "69",
    latitude: 35.91885077278391,
    longitude: 56.86050801193346,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00524",
    name: "Севастополь",
    region: "71",
    latitude: 33.5185,
    longitude: 44.572,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00525",
    name: "Нарьян-Мар",
    region: "83",
    latitude: 52.99622570556725,
    longitude: 67.6422066452454,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00526",
    name: "Ханты-Мансийск",
    region: "86",
    latitude: 69.02828315888574,
    longitude: 61.00591573676674,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00527",
    name: "Анадырь",
    region: "87",
    latitude: 177.5167,
    longitude: 64.75,
    zoom: 12
  },
  {
    _id: "45ffgfd45gffd00528",
    name: "Салехард",
    region: "89",
    latitude: 66.61536462683468,
    longitude: 66.53120534257685,
    zoom: 12
  }
];
export { citiesArray };
