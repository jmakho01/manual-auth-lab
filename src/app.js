import express from 'express';
import session from "express-session";
import defaultRouter from './routers/routes.js';

//configure Express.js app
const app = express();

//view engine
app.set("view engine", "ejs");
app.set("views", "src/views");

//static directories
app.use(express.static('public'));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//enable sessions first...
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

//attach user to every request second...
app.use((req, res, next) => {
    if (req.session.user) {
        req.user = req.session.user;
    } else {
        req.user = null;
    }
    console.log(req.user);
    next();
})

//mount routes last...
app.use("/", defaultRouter);

export default app;