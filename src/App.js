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
class TimerForm extends Component{
    render(){
        const submitText = this.props.title ? 'Update' : 'Create';
        return(
            <div>
                <div>
                    <label>Title</label>
                    <input type='text' defaultValue={this.props.title}/>
                </div>
                <div>
                    <label>Project</label>
                    <input type='text' defaultValue={this.props.project}/>
                    <div>
                        <button>
                            {submitText}
                        </button>
                        <button>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

class Timer extends Component{
    render(){
        return(
            <div>
                {this.props.title}
                {this.props.project}
                {this.props.elapsedTime}
                <div>
                    Start
                </div>
            </div>
        );

    }
}

class ToggleableTimerForm extends Component{
    render(){
        if (this.props.isOpen){
            return(
                <TimerForm/>
            );
        }
        else{
            <button>Add new item</button>
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
