import React from "react";
import { useLocation } from "react-router";
import { useFAQStore } from "../store/faq";
import FAQCard from "./FAQCard";
export default function Dashboard() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const language = searchParams.get("lang") || "en";

  const { FAQs, getFAQs } = useFAQStore();
  React.useEffect(() => {
    const fetchFAQs = async () => {
      await getFAQs(language);
    };
    fetchFAQs();
  }, [getFAQs]);
  const FAQjsx = FAQs.map((item) => {
    return (
      <div className="col-4 mb-4" key={item._id}>
        <FAQCard question={item.question} answer={item.answer} _id={item._id} />
      </div>
    );
  });

  return (
    <main className="container">
      <h1 className="display-1">FAQ Dashboard</h1>
      <div className="row">{FAQjsx}</div>
    </main>
  );
}
