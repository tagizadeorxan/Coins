import React, {Component} from 'react';
import './showall.css';
import {Link} from 'react-router-dom';

class ShowAll extends Component {



componentDidMount () {
    console.log(this.props.data);
}

    render() {
        return (
            <div className="show-all-coins">

                {this.props.data.map((e,i)=> 
                   <Link key={i} className="Link" to={`/eachcoin/${e.id}`}> <div className="show-each-coin" >
                      <img alt="coin-front" src={e.frontphoto}/>
                      <div>
                          <h3>{e.name}</h3>
                          <p>{e.text.substring(100, e.text.lastIndexOf('.', 5))}</p>

                      </div>
                      
                    </div> </Link>
                )}
            </div>
        )
    }
}

export default ShowAll;