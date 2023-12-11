import PropTypes from "prop-types";

import api from "../services/api";

function NavBar({ onStart }) {
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <button
        type="button"
        className="btn mx-2"
        onClick={() => {
          api
            .post("/api/games")
            .then((response) => {
              if (response.status === 201) {
                onStart();
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      >
        Restart
      </button>
    </nav>
  );
}

NavBar.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default NavBar;
