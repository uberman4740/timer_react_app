import React, {Component} from 'react';
import {renderElapsedString} from './helpers.js'

const uuidv4 = require('uuid/v4');

class TimersDashboard extends Component {
    state = {
        timers: [
            // {
            //     title: "Morning Coding",
            //     project: "Personal Development",
            //     elapsed: 0,
            //     runningSince: null,
            //     id: uuidv4()
            // },
            // {
            //     title: "Cooking Breakfast",
            //     project: "Food",
            //     elapsed: 219894,
            //     runningSince: Date.now(),
            //     id: uuidv4()
            //
            // }
        ]
    }


    onDeleteTimer = (timerId) => {
        this.setState({
            timers: this.state.timers.filter(timer => timer.id !== timerId)
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
                else {
                    return timer
                }
            })
        })


    }
    handleOnStartClick = (timerId) => {
        const now = Date.now()
        this.setState({
            timers: this.state.timers.map(timer => {
                if (timer.id === timerId) {
                    return Object.assign({}, timer, {
                        runningSince: now,

                    })
                }
                else{
                    return timer
                }
            })
        })
    }
    handleOnStopClick = (timerId) =>{
        const now = Date.now();
        this.setState({timers: this.state.timers.map(timer=>{
            if (timer.id === timerId){
                const lastElapsed = now -timer.runningSince;
                return Object.assign({},timer,{
                    elapsed: timer.elapsed + lastElapsed,
                    runningSince:null})
            }
            else{
                return timer
            }

        })})
    }


    render() {
        return (
            <div className='ui three column centered grid container'>
                <div className='column'>
                    <EditableTimerList
                        timers={this.state.timers}

                        onFormSubmit={this.handleEditFormSubmit}
                        onDeleteTimer={this.onDeleteTimer}
                        onStartClick={this.handleOnStartClick}
                        onStopClick={this.handleOnStopClick}
                    />
                    <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit}/>
                </div>


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
                <div className='ui basic content center aligned segment'>
                    <button
                        className={'ui basic button icon'}
                        onClick={this.handleFormOpen}
                    >
                        <i className={'plus icon'}/>
                    </button>
                </div>

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
                onFormSubmit={this.props.onFormSubmit}
                onDeleteTimer={this.props.onDeleteTimer}
                onStartClick={this.props.onStartClick}
                onStopClick={this.props.onStopClick}
            />
        ))
        return (
            <div id={'timers'}>
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

                    <Timer
                        id={this.props.id}
                        title={this.props.title}
                        project={this.props.project}
                        elapsed={this.props.elapsed}
                        runningSince={this.props.runningSince}
                        onStartClick={this.props.onStartClick}
                        onStopClick={this.props.onStopClick}

                        onEditClick={this.handleEditClick}

                        onDeleteTimer={this.props.onDeleteTimer}


                    />

            );
        }
    }
}

class Timer extends Component {
    componentDidMount() {
        this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50)
    }

    componentWillUnmount() {
        clearInterval(this.forceUpdateInterval)
    }


    handleTrashClick = () => {
        this.props.onDeleteTimer(this.props.id)
    }
    handleStartClick = () => {
        this.props.onStartClick(this.props.id)

    }
    handleStopClick = () => {
        this.props.onStopClick(this.props.id)
    }


    render() {
        const elapsedString = renderElapsedString(this.props.elapsed, this.props.runningSince)
        return (
            <div className={'ui centered card'}>
                <div className={'content'}>
                    <div className={'header'}>
                        {this.props.title}
                    </div>
                    <div className={'meta'}>
                        {this.props.project}

                    </div>
                    <div className={'center aligned description'}>
                        {elapsedString}
                    </div>
                    <div className={'extra content'}>
                        <span className={'right floated edit icon'}
                              onClick={this.props.onEditClick}

                        >
                            <i className={'edit icon'}/>
                        </span>
                        <span className={'right floated trash icon'} onClick={this.handleTrashClick}>
                            <i className={'trash icon'}/>

                        </span>

                    </div>


                </div>
                <TimerActionButton
                    timerIsRunning={!!this.props.runningSince}
                    onStartClick={this.handleStartClick}
                    onStopClick={this.handleStopClick}

                />


            </div>
        );

    }
}

class TimerActionButton extends Component {
    render() {
        if (this.props.timerIsRunning) {
            return (
                <div
                    className={'ui bottom attached red basic button'}
                    onClick={this.props.onStopClick}
                >
                    Stop

                </div>
            );

        }
        else {
            return (
                <div className={'ui bottom attached green basic button'}
                     onClick={this.props.onStartClick}
                >
                    Start
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
            <div className={'ui centered card'}>
                <div className={'content'}>
                    <div className={'ui form'}>
                        <div className={'field'}>
                            <label>Title</label>
                            <input type='text'
                                   value={this.state.title}
                                   onChange={this.handleTitleChange}
                            />
                        </div>
                        <div className={'field'}>
                            <label>Project</label>
                            <input
                                type='text'
                                value={this.state.project}
                                onChange={this.handleProjectChange}/>
                        </div>
                        <div className={'ui two bottom attached buttons'}>

                            <button
                                className={'ui basic blue button'}
                                onClick={this.handleSubmit}>
                                {submitText}
                            </button>
                            <button
                                className={'ui basic red button'}
                                onClick={this.props.onFormClose}>
                                Cancel
                            </button>
                        </div>

                    </div>

                </div>


            </div>
        );
    }
}


export default TimersDashboard;
