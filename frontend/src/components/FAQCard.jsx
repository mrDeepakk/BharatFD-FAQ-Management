import { useFAQStore } from "../store/faq.js";
export default function FAQCard(props) {
  const { deleteFAQ } = useFAQStore();
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Q : {props.question}</h5>
        <h6 className="card-subtitle mb-2 text-muted">A : {props.answer}</h6>
        <button
          className="btn btn-outline-danger"
          onClick={async () => await deleteFAQ(props._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
