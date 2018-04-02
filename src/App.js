import React, { Component } from 'react';


class TimersDashboard extends Component{
    render(){
        return (
            <div>
                <EditableTimerList/>
                <ToggleableTimerForm isOpen={true}/>
            </div>

        );
    }
}

class App extends Component {
  render() {
    return (
        <div>





        </div>


    );
  }
}

export default App;
