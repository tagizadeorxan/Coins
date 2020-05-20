import React from 'react';

import store from './app/store';
import {bugAdded,bugRemoved,bugResolved} from './features/actions';
import { connect } from 'react-redux'
import BugList from './BugList';
import Data from './Data';
import Coins from './Coins';
 store.subscribe(()=> {
  console.log('store changed!',store.getState())
})


class App extends React.Component {
  
  constructor (props) {
    super(props);
    this.bugInput = React.createRef();
  }
   handleCLick= () => {
    this.props.bugAdded(this.bugInput.current.value)
    this.bugInput.current.value = '';
  }

  handleResolve = (id) => {
    this.props.bugResolved(id)
  }

  handleRemove = (id) => {
    this.props.bugRemoved(id);
  }

  render() {
    return(
      <>
      <input ref={this.bugInput}/>
     <button onClick={this.handleCLick}>add bug</button>
     {this.props.items.map((element,i)=><div key={i}><p >{element.description}</p>
     <button onClick={()=>this.handleResolve(element.id)}>resolve bug</button>
     <button onClick={()=>this.handleRemove(element.id)}>delete</button>
     </div>)}
     <BugList/>
     <Coins/>
     <Data/>
     </>
    )
  }
}




let mapStateToProps = (state) => {
  return {
    items: state.reducer.items
  };
}


export default connect(mapStateToProps,{bugAdded,bugRemoved,bugResolved})(App)