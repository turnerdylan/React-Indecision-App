import React from "react"
import Option from "./Option"

const Options = (props) => (
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

export default Options