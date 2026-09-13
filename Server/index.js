import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import submitContactForm from "./controllers/contactForm.js";

const app = express();

// CONSTANTS
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

// CONSOLE LOGS
console.log("PORT", PORT);

app.get("/health", function (request, response) {
    response.status(200).json({
        success: true,
        message: "Health Check",
    });
});

app.post("/submit-form", submitContactForm);


app.use((error, request, response, next) => {
    if (error instanceof SyntaxError && "body" in error) {
        return response.status(400).json({
            success: false,
            message: "The request body contains invalid JSON.",
        });
    }

    next(error);
});

app.use((request, response) => {
    response.status(404).json({
        success: false,
        message: "The requested route was not found.",
    });
});

function listenCallBack() {
    console.log(`APP IS RUNNING ON PORT: ${PORT}`);
}

app.listen(PORT, listenCallBack);
