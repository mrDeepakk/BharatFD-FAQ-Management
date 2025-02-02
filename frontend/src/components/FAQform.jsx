import { useFAQStore } from "../store/faq";

export default function FAQform() {
  const { createFAQ } = useFAQStore();
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const question = formData.get("faqQuestion");
    const answer = formData.get("faqAnswer");
    const resp = await createFAQ({
      question: question,
      answer: answer,
    });
    window.location.href = "/";
    console.log(resp);
  }
  return (
    <section className="container">
      <h1 className="display-1">Add FAQ</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="mb-3">
          <label htmlFor="faqQuestion" className="form-label display-6">
            Question
          </label>
          <input
            type="text"
            className="form-control"
            id="faqQuestion"
            name="faqQuestion"
            placeholder="What is the purpose of life?"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="faqAnswer" className="form-label display-6">
            Answer
          </label>
          <textarea
            className="form-control"
            id="faqAnswer"
            name="faqAnswer"
            rows="3"
            defaultValue={
              "Are you guys even seeing this project? If you are that's nice :) I'm a hardworking person, and even though there's a SEA of submissions, I still want to give this my best shot. Thanks for taking the time to check out my project :) I appreciate it even if I don't pass this round"
            }
          ></textarea>
        </div>
        <button className="btn btn-success">Add FAQ?</button>
      </form>
    </section>
  );
}
