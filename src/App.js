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
class EditableTimer extends Component{
    render(){
        if (this.props.editFormOpen){
            return(
                <div>
                    <TimerForm
                        title = {this.props.title}
                        project = {this.props.project}


                    />
                </div>
            );
        }
        else {
            return(
                <div>
                    <Timer
                    title = {this.props.title}
                    project = {this.props.project}
                    elapsed={this.props.elapsed}
                    runningSince={this.props.runningSince}

                    />
                </div>
            );
        }
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
