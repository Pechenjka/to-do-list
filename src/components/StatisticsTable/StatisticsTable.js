import "./StatisticsTable.css";
import { Fragment } from "react";

const StatisticsTable = ({ tableStatistic }) => {
    return (
        <div className="table">
            {tableStatistic.map((item, index) => {
                return (
                    <Fragment key={index}>
                        <h3 className="table__title">{item.title}</h3>
                        <p className="table__text">{item.text}</p>
                    </Fragment>
                );
            })}
        </div>
    );
};

export default StatisticsTable;
