import {Link} from 'react-router-dom';
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
export default function NavBar(props) {
    return(
      <nav class="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'lightblue' }}>
      <div class="container-fluid">
          <a href="/dashboard" class="navbar-brand">Heraeus</a>
          <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse9">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse9">
              <div class="navbar-nav">
                  <a href="/dashboard" class="nav-item nav-link active">Home</a>
                  <a href="/quiz" class="nav-item nav-link">Quiz</a>
              </div>
              <form class="d-flex ms-auto">
                  <Link to ="/signin"><button type="submit" class="btn btn-outline-light">LOGOUT</button></Link>
              </form>
          </div>
      </div>        
  </nav>)
}