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


class EditableTimerList extends Component{
    render(){
        return(
            <div>
                <EditableTimer
                    title="Morning Coding"
                    project="Personal Development"
                    elapsed="0000001"
                    runningSince={null}
                />
                <EditableTimer
                    title="Cooking Breakfast"
                    project="Food"
                    elapsed="0000012"
                    runningSince={null}
                    editFormOpen={true}
                />

            </div>
        );
    }
}
class App extends Component {
  render() {
    return (
        <div>
            <TimersDashboard/>




        </div>


    );
  }
}

export default App;
