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
    onDeleteTimer = (timerId)=>{
        this.setState({
            timers: this.state.timers.filter(timer=>timer.id !== timerId)
        })
    }
    handleCreateFormSubmit = (timer) => {
        const newTimer = {
            title: timer.title || 'Timer',
            project: timer.project || 'Project',
            elapsed: 0,
            // runningSince:null,
            id: uuidv4()

        }
        this.setState({
            timers: this.state.timers.concat(newTimer)
        });
    }
    handleEditFormSubmit = (attr) => {
        this.setState({
            timers: this.state.timers.map(timer => {
                if (attr.id === timer.id) {
                    return Object.assign({}, timer, {title: attr.title, project: attr.project})
                }
                else{
                    return timer
                }
            })
        })


    }

    render() {
        return (
            <div>
                <EditableTimerList
                    timers={this.state.timers}
<<<<<<< HEAD
                    onFormSubmit={this.handleEditFormSubmit}
=======
                    onDeleteTimer = {this.onDeleteTimer}
>>>>>>> delete-tasks
                />
                <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit}/>
            </div>

        );
    }
}


class ToggleableTimerForm extends Component {

    state = {
        isOpen: false
    }
    handleFormOpen = () => {
        this.setState({isOpen: true})
    }
    handleFormSubmit = (timer) => {
        this.props.onFormSubmit(timer)
        this.setState({isOpen: false})
    }
    handleFormClose = () => {
        this.setState({isOpen: false});
    };

    render() {
        if (this.state.isOpen) {
            return (
                <TimerForm onFormSubmit={this.handleFormSubmit}
                           onFormClose={this.handleFormClose}
                />

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


class EditableTimerList extends Component {

    render() {
        const timers = this.props.timers.map((timer) => (
            <EditableTimer
                key={timer.id}
                id={timer.id}
                title={timer.title}
                project={timer.project}
                elapsed={timer.elapsed}
                runningSince={timer.runningSince}
<<<<<<< HEAD
                onFormSubmit={this.props.onFormSubmit}
=======
                onDeleteTimer = {this.props.onDeleteTimer}
>>>>>>> delete-tasks
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
    //Dashboard --> EditableTimerList --> EditableTimer
    state = {
        editFormOpen: false
    }
    handleEditClick = () => {
        this.setState({editFormOpen: true})

    }
    handleSubmit = (timer) => {
        this.props.onFormSubmit(timer)
        this.setState({editFormOpen: false})

    }
    onFormClose = () => {
        this.setState({editFormOpen: false})

    }

    render() {
        if (this.state.editFormOpen) {
            return (
                <div>
                    <TimerForm
                        id={this.props.id}
                        title={this.props.title}
                        project={this.props.project}
                        onFormSubmit={this.handleSubmit}
                        onFormClose={this.onFormClose}
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
<<<<<<< HEAD
                        onEditClick={this.handleEditClick}
=======
                        onDeleteTimer = {this.props.onDeleteTimer}

>>>>>>> delete-tasks
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
    handleSubmit = () => {
        this.props.onFormSubmit({
            id: this.props.id,
            title: this.state.title,
            project: this.state.project
        });
    };

    render() {
        const submitText = this.props.id ? 'Update' : 'Create';
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
                </div>
                <div>

                    <button onClick={this.handleSubmit}>
                        {submitText}
                    </button>
                    <button onClick={this.props.onFormClose}>
                        Cancel
                    </button>
                </div>

            </div>
        );
    }
}

class Timer extends Component {
    handleTrashClick= ()=>{
        this.props.onDeleteTimer(this.props.id)
    }
    render() {
        return (
            <div>
                {this.props.title}
                {this.props.project}
                {this.props.elapsed}
                <button>
                    Start
                </button>
<<<<<<< HEAD
                <button onClick={this.props.onEditClick}>Edit</button>
=======
                <button onClick={this.handleTrashClick}>Delete</button>
>>>>>>> delete-tasks
            </div>
        );

    }
}


export default TimersDashboard;
