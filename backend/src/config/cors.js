const whiteList = [
  "http://localhost:5000",
  "http://localhost:5173",
  process.env.CORS_ORIGIN,
];

const corsOptions = {
  origin: (origin, callBack) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callBack(null, true);
    } else {
      callBack(`Not Allowed By Cors`);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;
