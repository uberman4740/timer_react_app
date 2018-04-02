import React, {Component} from 'react';
const uuidv4 = require('uuid/v4');


class TimersDashboard extends Component {
    state = {
        timers: [
            {
                title : "Morning Coding",
                project : "Personal Development",
                elapsed : "0000001",
                runningSince : null ,
                id: uuidv4()
            },
            {
                title:"Cooking Breakfast",
                project:"Food",
                elapsed:"0000012",
                runningSince:Date.now(),
                id : uuidv4()

            }
        ]
    }

    render() {
        return (
            <div>
                <EditableTimerList
                    timers = {this.state.timers}
                />
                <ToggleableTimerForm/>
            </div>

        );
    }
}


class EditableTimerList extends Component {
    render() {
        const timers = this.props.timers.map((timer)=>(
            <EditableTimer
                key = {timer.id}
                id={timer.id}
                title={timer.title}
                project= {timer.project}
                elapped = {timer.elapsed}
                runningSince = {timer.runningSince}
            />
        ))
        return (
            <div>
                {timers}

            </div>
        );
    }
}

class EditableTimer extends Component {
    state = {
        editFormOpen : false
    }
    render() {
        if (this.state.editFormOpen) {
            return (
                <div>
                    <TimerForm
                        id = {this.props.id}
                        title={this.props.title}
                        project={this.props.project}


                    />
                </div>
            );
        }
        else {
            return (
                <div>
                    <Timer
                        id = {this.props.id}
                        title={this.props.title}
                        project={this.props.project}
                        elapsed={this.props.elapsed}
                        runningSince={this.props.runningSince}

                    />
                </div>
            );
        }
    }
}

class TimerForm extends Component {
    render() {
        const submitText = this.props.title ? 'Update' : 'Create';
        return (
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

class Timer extends Component {
    render() {
        return (
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

class ToggleableTimerForm extends Component {
    state = {
        isOpen: false
    }
    render() {
        if (this.state.isOpen) {
            return (
                <TimerForm/>
            );
        }
        else {
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
