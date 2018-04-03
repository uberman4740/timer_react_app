import React, {Component} from 'react';

const uuidv4 = require('uuid/v4');


class TimersDashboard extends Component {
    state = {
        timers: [
            {
                title: "Morning Coding",
                project: "Personal Development",
                elapsed: "0000001",
                runningSince: null,
                id: uuidv4()
            },
            {
                title: "Cooking Breakfast",
                project: "Food",
                elapsed: "0000012",
                runningSince: Date.now(),
                id: uuidv4()

            }
        ]
    }

    onFormSubmit = (timer) =>{
        const newTimer = {
            title:timer.title || 'Timer',
            project:timer.project || 'Project',
            elapsed:0,
            // runningSince:null,
            id:uuidv4

        }
        this.setState({
            timers:  this.state.timers.concat(newTimer)
        })
    }

    render() {
        return (
            <div>
                <EditableTimerList
                    timers={this.state.timers}
                />
                <ToggleableTimerForm onFormSubmit={this.onFormSubmit}/>
            </div>

        );
    }
}


class EditableTimerList extends Component {
    render() {
        const timers = this.props.timers.map((timer) => (
            <EditableTimer
                key={timer.id}
                id={timer.id}
                title={timer.title}
                project={timer.project}
                elapped={timer.elapsed}
                runningSince={timer.runningSince}
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
        editFormOpen: false
    }

    render() {
        if (this.state.editFormOpen) {
            return (
                <div>
                    <TimerForm
                        id={this.props.id}
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
                        id={this.props.id}
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
    // Dashboard -> ToggleableTimerForm ------------------> TimerForm
    //           -> EditableTimerList   -> EditableTimer -> TimerForm
    state = {
        title: this.props.title || '',
        project: this.props.project || ''
    };
    handleProjectChange = (e) => {
        this.setState({project: e.target.value});
    };
    handleTitleChange = (e) => {
        this.setState({title: e.target.value})
    }
    handleSubmit = ()=>{
        this.props.onFormSubmit({
            id:this.props.id, // can be undefined?
            title: this.state.title,
            project: this.state.project
        })
    }

    render() {
        const submitText = this.props.title ? 'Update' : 'Create';
        return (
            <div>
                <div>
                    <label>Title</label>
                    <input type='text'
                           value={this.state.title}
                           onChange={this.handleTitleChange}
                    />
                </div>
                <div>
                    <label>Project</label>
                    <input
                        type='text'
                        value={this.state.project}
                        onChange={this.handleProjectChange}/>
                    <div>

                        <button onClick={this.handleSubmit}>
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
    // Dashboard -> ToggleableTimerForm

    state = {
        isOpen: false
    }
    handleFormOpen = () => {
        this.setState({isOpen: true})
    }
    handleFormSubmit=(timer)=>{
        this.props.onFormSubmit(timer)
        this.setState({isOpen: false})
    }

    render() {
        if (this.state.isOpen) {
            return (
                <TimerForm onFormSubmmit={this.handleFormSubmit}/>
            );
        }
        else {
            return (
                <button
                    onClick={this.handleFormOpen}
                >
                    Add new item
                </button>
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
