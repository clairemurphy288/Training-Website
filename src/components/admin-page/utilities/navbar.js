import {Link} from 'react-router-dom';
export default function NavBar(props) {
    return(<nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
    <Link className="nav-link active"  to="/admin">
      <a class="navbar-brand" href="#"><i class="fa-solid fa-house"></i></a>
    </Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
          <Link className="nav-link active"  to="/user">
            Users
          </Link>
          </li>
          {/* <li class="nav-item">
            <a class="nav-link" href="#">Quiz Dashboard</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Create</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li> */}
        </ul>
      </div>
    </div>
  </nav>)
}