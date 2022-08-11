import {Link} from 'react-router-dom';
export default function NavBar(props) {
    return(
    <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid">
    <Link className="nav-link active"  to="/dashboard">
      <a class="navbar-brand">Heraeus</a>
    </Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/quiz">Quiz</Link>
          </li>
          <li>
          <Link className="nav-link" to="/"><button class="btn btn-outline-success" type="button">Signup</button></Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>)
}