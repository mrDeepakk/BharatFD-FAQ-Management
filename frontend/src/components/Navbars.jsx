import { Link } from "react-router";
export default function Navbar() {
  return (
    <>
      <nav className="container navbar navbar-expand-sm">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <span className="display-6">Admin Dashboard</span>
          </Link>
          <div>
            <ul className="navbar-nav">
              <li className="navbar-item">
                <Link to="/new">
                  <span className="display-6">Add FAQ</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
