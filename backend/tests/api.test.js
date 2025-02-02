import request from "supertest";
import app from "../index.js";

describe("FAQ API Endpoints", () => {
    describe("GET /api/faq", () => {
        test("should translate the question and answers to Hindi", async () => {
            const response = await request(app).get("/api/faq?lang=hi");
            expect(response.statusCode).toBe(200);
            expect(response.body[0].question).toBe("क्या मुझे यह इंटर्नशिप मिलेगी?");
            expect(response.body[0].answer).toBe("हाँ, हाँ मैं करूँगा :)");
        });

        test("should return English questions and answers if lang isn't passed", async () => {
            const response = await request(app).get("/api/faq");
            expect(response.statusCode).toBe(200);
            expect(response.body[0].question).toBe("Will I get this internship?");
            expect(response.body[0].answer).toBe("Yes, yes I will :)");
        });
    });

    describe("POST /api/faq/admin", () => {
        test("should add a new FAQ", async () => {
            const newFAQ = {
                question: "IM BORRREDDD?",
                answer: "HELP",
            };

            const response = await request(app)
                .post("/api/faq/admin")
                .send(newFAQ)
                .set("Content-Type", "application/json");

            expect(response.statusCode).toBe(201);
        });

        test("should return 400 if question or answer is missing", async () => {
            const response = await request(app)
                .post("/api/faq/admin")
                .send({})
                .set("Content-Type", "application/json");

            expect(response.statusCode).toBe(400);
        });
    });
});
