import "./App.css";
import { useEffect, useState } from "react";
import List from "./components/List/List";
import StatisticsTable from "./components/StatisticsTable/StatisticsTable";
import FormAddingNewItem from "./components/FormAddingNewItem/FormAddingNewItem";

const App = () => {
    const initArrToDoList = [
        {
            text: "Выпить кофе",
            id: Math.random().toString(16).slice(2),
            checkIn: false,
        },
        {
            text: "Не пропустить встречу с друзьями",
            id: Math.random().toString(16).slice(2),
            checkIn: false,
        },
        {
            text: "Сходить в тренажерный зал",
            id: Math.random().toString(16).slice(2),
            checkIn: false,
        },
        {
            text: "Лечь спать до 22.00",
            id: Math.random().toString(16).slice(2),
            checkIn: false,
        },
    ];

    const [edit, setEdit] = useState(false);
    const [toDoEdit, setToDoEdit] = useState({});
    const [values, setValues] = useState({});
    const [toDoList, setToDoList] = useState(initArrToDoList);
    const [alert, setAlert] = useState(false);
    const [statisticItemsToDo, setStatisticItemsToDo] = useState({
        all: toDoList.length,
        complete: 0,
        incomplete: toDoList.length,
    });

    const tableStatistic = [
        { title: "All items", text: statisticItemsToDo.all },
        { title: "Complete", text: statisticItemsToDo.complete },
        { title: "Incomplete", text: statisticItemsToDo.incomplete },
    ];

    useEffect(() => {
        setTimeout(() => {
            if (alert) {
                setAlert(false);
            }
        }, 3000);
    }, [alert]);

    useEffect(() => {
        if (edit) {
            document.getElementById("input-text").focus();
        }
    }, [edit]);

    const handleClickCheckbox = (item) => {
        return toDoList.map((el) => {
            if (item.id === el.id && item.checkIn === false) {
                setStatisticItemsToDo({
                    ...statisticItemsToDo,
                    complete: statisticItemsToDo.complete + 1,
                    incomplete: statisticItemsToDo.incomplete - 1,
                });

                return (el.checkIn = true);
            }
            if (item.id === el.id && item.checkIn === true) {
                setStatisticItemsToDo({
                    ...statisticItemsToDo,
                    complete: statisticItemsToDo.complete - 1,
                    incomplete: statisticItemsToDo.incomplete + 1,
                });
                return (el.checkIn = false);
            }
            return null;
        });
    };

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setValues({ ...values, [name]: value, id: String(Date.now()), checkIn: false });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (edit && toDoEdit !== {}) {
            const editToDoList = toDoList.map((item) => {
                if (item.id === toDoEdit.id) {
                    return { ...item, text: values.text };
                }
                return item;
            });
            setToDoList(editToDoList);
            setEdit(false);
        } else {
            if (values.text === undefined) {
                setAlert(true);
            } else {
                handleAddItemToDo(values);
                setStatisticItemsToDo({
                    ...statisticItemsToDo,
                    all: statisticItemsToDo.all + 1,
                    incomplete: statisticItemsToDo.incomplete + 1,
                });
            }
        }
        setValues({});
    };

    const handleAddItemToDo = (ItemToDo) => {
        setToDoList([...toDoList, ItemToDo]);
    };

    const handleItemDeleting = (ItemToDo) => {
        const deletedItem = toDoList.filter((item) => {
            if (item.id !== ItemToDo.id) {
                return item;
            }
            if (item.id === ItemToDo.id && ItemToDo.checkIn === true) {
                setStatisticItemsToDo({
                    ...statisticItemsToDo,
                    all: statisticItemsToDo.all - 1,
                    complete: statisticItemsToDo.complete - 1,
                });
            }
            if (item.id === ItemToDo.id && ItemToDo.checkIn === false) {
                setStatisticItemsToDo({
                    ...statisticItemsToDo,
                    all: statisticItemsToDo.all - 1,
                    incomplete: statisticItemsToDo.incomplete - 1,
                });
            }
            return null;
        });
        setToDoList(deletedItem);
    };

    const editItem = (item) => {
        setEdit(true);
        setToDoEdit(item);
        setValues(item);
    };

    const handleCloseEdit = () => {
        setEdit(false);
        setToDoEdit({});
        setValues({});
    };

    return (
        <div className="toDoList">
            <h1 className="toDoList__title">To do list</h1>
            <FormAddingNewItem values={values} handleSubmit={handleSubmit} handleChange={handleChange} handleCloseEdit={handleCloseEdit} edit={edit} alert={alert} />
            <StatisticsTable tableStatistic={tableStatistic} />
            <List toDoList={toDoList} edit={edit} toDoEdit={toDoEdit} handleClickCheckbox={handleClickCheckbox} handleItemDeleting={handleItemDeleting} editItem={editItem} />
        </div>
    );
};

export default App;
