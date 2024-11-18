import express from "express";
import usersRoutes from "./routes/users";
const app = express();
const PORT = 3051;
const apiVersion = "v1";
app.get(`/${apiVersion}`, function (req, res) {
    res.send('Hello World!');
});

app.use(express.json());
app.use(`/${apiVersion}`, usersRoutes);
//Rodando servidor na porta determinada com o método listen do express
app.listen(PORT, () =>
    console.log(`✨ Server started on ${PORT}`)
);
