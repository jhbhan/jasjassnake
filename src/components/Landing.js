import React, {Component} from 'react'
import {Link} from 'react-router-dom';


class Landing extends Component {

  render(){
    return (
    <div className="row container">
      <Link to={'/1p'} className="waves-effect waves-light btn-large offset-l3 col s6  initial_button">
          1 Player
      </Link>
      <Link to={'/2p'}  className="waves-effect waves-light btn-large offset-l3 col s6 initial_button">
          2 Player (unavailable currently)
      </Link>
      <Link to={'/jasjas'}  className="waves-effect waves-light btn-large offset-l3 col s6 initial_button">
          Jas player ;)
      </Link>
    </div>
    );
  }
}

export default Landing;
