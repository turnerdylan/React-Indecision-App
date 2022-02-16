class IndecisionApp extends React.Component {
    constructor(props) {
        super(props)
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.state = {
            options: []
        }
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)
    
            if(options) {
                this.setState(() => ({ options }))
            }
        } catch (e) {
            //Do nothing
        }
    }

    componentDidUpdate(prevProps, prevState) {
        //saving data on app updates
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }

    handleDeleteOptions() {
        this.setState(() => ({
            options: []
        }))
    }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }))
    }

    handlePick () {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option)
    }

    handleAddOption(option) {
        if(!option){
            return 'Please enter something'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        }

        this.setState((prevState) => ({options: prevState.options.concat(option)}))
    }
    
    render(){

        return (
            <div>
            <Header/>
            <hr></hr>
            <Action
                hasOptions={this.state.options.length > 0}
                handlePick={this.handlePick}
            />
            <hr></hr>
            <Options
                options={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                handleDeleteOption={this.handleDeleteOption}
            />
            <hr></hr>
            <AddOption
                handleAddOption={this.handleAddOption}
            />
        </div>
        )
    }
}

const Header = (props) => {
    return (<div>
        <h1>{props.title}</h1>
        {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
    )
}

Header.defaultProps = {
    title: 'Indecision',
    subtitle: 'Cant decide what to do?'
}

const Action = (props) => {
    return (
        <div>
            <button
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >
            What should I do</button>
        </div>
        )
}

const Options = (props) => {
    return (
        <div>
        {props.options.length !== 0 && <button onClick={props.handleDeleteOptions}>Remove all</button>}
            {props.options.length === 0 && <p>Please add a task!</p>}
            {
                props.options.map((option) => (
                    <Option 
                        key={option}
                        optionText={option}
                        handleDeleteOption={props.handleDeleteOption}
                    />
                    ))
            }
            
        </div>
        )
}

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button onClick={(e) => {
                props.handleDeleteOption(props.optionText)
            }}>
            Remove
            </button>
        </div>
        )
}

class AddOption extends React.Component{
    constructor (props) {
        super(props)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            error: undefined
        }
    }

    handleAddOption(e){
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option)

        this.setState(() => ({error}))

        if(!error) {
            e.target.elements.option.value = ''
        }
    }

    render() {
        return (
            <div>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.handleAddOption}>
                <input type="text" name="option"></input>
                <button>Add task</button>
            </form>
            </div>
            )
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));