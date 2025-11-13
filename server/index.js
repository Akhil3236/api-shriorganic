import  express  from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "../server/routes/userRoutes.js"
import userAuthRouters from "../server/routes/userAuthRouters.js"



dotenv.config();



const app=express();
const PORT=process.env.PORT || 4001;



const allowedOrigins = [
    "*"
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {

      if (!origin) return callback(null, true);
  
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };

app.use(cors(corsOptions))


app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


/*-----------------------------------
  basic rotue for testing the server
----------------------------------- */
app.get("/", (req, res) => {

    res.status(200).json({
        sucess:true,
        message:"Hello from the server , server is working"
    })
});

/*-----------------------------------
            Server route
----------------------------------- */
  
app.use("/api/user",userRoutes);
app.use("/api/auth",userAuthRouters);


/*-----------------------------------
            serevr listner
----------------------------------- */

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});