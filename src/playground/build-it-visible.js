class VisibilityToggle extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this)

        this.state = {
            visibility: false,
            name: 'd'
        }
    }

    handleToggleVisibility(){
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            }
        })
    }
    
    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.handleToggleVisibility}>
                    {this.state.visibility ? 'Hide' : 'Show'} Details
                </button>
                {this.state.visibility && <p>Here are some details</p>}
            </div>
        )
    }
}

ReactDOM.render(<VisibilityToggle/>, document.getElementById('app'))