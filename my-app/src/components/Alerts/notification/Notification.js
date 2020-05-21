import React, {Component} from 'react';
import Noty from 'noty'
import './../noty.css'
import './../bootstrap-v4.css';

class Notification extends  Component {
  
      componentDidMount () {
       this.showNotification();
      }

      showNotification(){
        new Noty({
          type:this.props.notification,
          theme:"bootstrap-v4",
          layout:"topRight",
          text:this.props.text,
          timeout:"1000"
        }).show()
      }

    render() {
        return(
            <div>
            
          </div>
        
        )
    }
}

export default Notification;