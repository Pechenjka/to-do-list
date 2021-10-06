import "./List.css";
import { Fragment } from "react";

const List = ({ toDoList, edit, toDoEdit, handleClickCheckbox, handleItemDeleting, editItem }) => {
    return (
        <ul className="list">
            {toDoList.length < 1 ? (
                <p className="list__not-posts">To do list is empty!</p>
            ) : (
                toDoList.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <li className={`list__item-container ${edit && item.id === toDoEdit.id ? "list__item-container_select" : ""}`}>
                                <input type="checkbox" className="list__checkbox" checked={item.checkIn} onChange={() => handleClickCheckbox(item)} />
                                <p className={`list__item ${item.checkIn === true && "list__item_check"}`}>{item.text}</p>
                                <button type="button" className={`button list__button-edit ${edit && item.id === toDoEdit.id ? "list__button-edit_active" : ""} `} onClick={() => editItem(item)}>
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className={`list__button-delete ${edit && item.id === toDoEdit.id ? "list__button-delete_disabled" : ""} `}
                                    disabled={edit && item.id === toDoEdit.id}
                                    onClick={() => handleItemDeleting(item)}
                                >
                                    &times;
                                </button>
                            </li>
                        </Fragment>
                    );
                })
            )}
        </ul>
    );
};

export default List;
