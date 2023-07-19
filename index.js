import  Express  from "express";
import bodyParser from "body-parser";
import config from "./src/db/Config.js";
import userRoutes from "./src/Routes/UserRoutes.js";
import productRoutes from "./src/Routes/ProductRoute.js";
import orderRoutes from "./src/Routes/OrderRoute.js";
import jwt from 'jsonwebtoken'
import cors from 'cors'


const app = Express();

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwt_secret, (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        
        
    });
} else {
    req.user = undefined;
    next();
    }
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);




app.get("/", (req, res) => {
    res.send("Hello World!🫠");
    });



    app.listen(config.port, () => {
        console.log(`Server is running on ${config.url}`);
    });

