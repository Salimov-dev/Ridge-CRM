export const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://31.129.108.151",
    "https://ridge-crm.ru",
    "http://ridge-crm.ru",
    "http://ridge-crm.ru:8080",
    "https://185.59.216.1",
    "https://185.59.216.254",
    "https://185.59.216.0/24"
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization"
  ],
  credentials: true,
  optionSuccessStatus: 200
};
