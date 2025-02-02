import express from "express";
import catchAsync from "../utils/catchAsync.js";

import FAQHandler from "../controllers/faqs.js"

const FAQRouter = express.Router();

FAQRouter.get("/",catchAsync(FAQHandler.getFAQs));
FAQRouter.post("/admin",catchAsync(FAQHandler.addFAQ))
FAQRouter.delete("/admin/:faqId",catchAsync(FAQHandler.deleteFAQ))

export default FAQRouter;