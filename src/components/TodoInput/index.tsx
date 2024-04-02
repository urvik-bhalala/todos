import { Button, Form, InputGroup } from "react-bootstrap";

import './todoInput.scss';

type todoInputTypes = {
    todoName: string,
    onChangeTodoName: (todoName : string) => void,
    addTodo: () => void,
}

const TodoInput = ({todoName, onChangeTodoName, addTodo}: todoInputTypes) => {
    
    return (
        <div className="todo-input-container">
            <InputGroup className="mb-3 todo-input-group">
                <Form.Control
                    placeholder="Go to running"
                    aria-label="todo name"
                    aria-describedby="basic-addon2"
                    className="todo-input ms-5"
                    value={todoName}
                    onChange={(e) => onChangeTodoName(e.target.value)}
                />
                <Button variant="outline-secondary" id="button-addon2" className="todo-add-btn px-5 border-0" onClick={addTodo}>
                    ADD TODO
                </Button>
            </InputGroup>
        </div>
    )
};

export default TodoInput;