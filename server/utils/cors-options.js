export const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://31.129.108.151",
    "https://ridge-crm.ru",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
