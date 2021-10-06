import "./FormAddingNewItem.css";
import Alert from "../Alert/Alert";

const FormAddingNewItem = ({ handleSubmit, handleCloseEdit, handleChange, edit, values, alert }) => {
    return (
        <div className="AddItemToDo">
            <h3 className="AddItemToDo__title">Add item to do</h3>
            {alert && <Alert text="The field must not be empty!" />}
            <form action="" className="form" onSubmit={handleSubmit}>
                <input type="text" className="form__input" name="text" id="input-text" value={values.text || ""} placeholder="Name item" onChange={handleChange} />
                <button className="button form__button-add-and-edit" type="submit">
                    {edit ? "Edit item" : "Add item"}
                </button>
                {edit && (
                    <button className="button form__button-closeEdit" type="button" onClick={() => handleCloseEdit()}>
                        Not edit
                    </button>
                )}
            </form>
        </div>
    );
};

export default FormAddingNewItem;
