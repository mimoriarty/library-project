import { useContext } from "react";

import { LibraryContext } from "../App";
import digitalLibrary from "../assets/images/digital-library.png";

export default function Home() {
  const { isLoggedIn } = useContext(LibraryContext);
  return (
    <div>
      {!isLoggedIn && <div class="notification is-info">
        <button class="delete"></button>
        Public version, please <button className="button-link"><strong>Log in</strong></button>, to access your dashboard.
      </div>}
      <div className="card content m-6">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={digitalLibrary} alt="Kerberos Library Logo" />
          </figure>
        </div>
        <div className="card-content">
          <p>Kerberos is a digital library application where you can borrow any book ever written, no licences, no charges, just because we love people who reads without paper. Trees are living things not just books getting dust!<br/> Enjoy your reading.</p>
          <button className="button is-primary">
            <strong>Sign up</strong>
          </button>
        </div>
      </div>
    </div>
  );
}