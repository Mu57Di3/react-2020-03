import React from "react";
import { render, shallow } from "enzyme";
import { ButtonColors, States, Task } from "../src/constants/ToDo";
import StateBtn from "../src/components/StateBtn";
import { registerIcons } from "../src/tools";
import TaskRow from "../src/components/TaskRow";
import TasksList from "../src/containers/TasksList";

registerIcons();

const tasks: Task[] = [
    { id: 1, label: "Первое", state: States.Active },
    { id: 2, label: "Второе", state: States.Canceled },
    { id: 3, label: "Третье", state: States.Complete },
];

const clickMock = jest.fn();

describe("Компонент StateBtn", () => {
    it("Кнопка с переданным состоянием", () => {
        const item = render(<StateBtn state={States.Active} click={clickMock} />);
        expect(item.find("svg").hasClass("fa-circle")).toBe(true);
    });

    it("Цвет кнопки", () => {
        const item = shallow(<StateBtn state={States.Active} color={ButtonColors.blue} click={clickMock} />);
        expect(item.hasClass("text-primary")).toBe(true);
    });
});

describe("Компонент TaskRow", () => {
    const item = render(<TaskRow {...tasks[0]} click={clickMock} />);

    it("Label", () => {
        expect(item.text()).toBe(tasks[0].label);
    });

    it("Buttons count", () => {
        expect(item.find("button").length).toBe(2);
    });

    it("Remove red button", () => {
        expect(item.find("button.text-danger").length).toBe(1);
    });
});

describe("Компонент TasksList", () => {
    it("List all filter", () => {
        const item = render(<TasksList list={tasks} click={clickMock} filter={null} cancel={clickMock} />);
        expect(item.find("div > div.col-12").length).toBe(3);
    });

    it("Only active", () => {
        const item = render(<TasksList list={tasks} click={clickMock} filter={States.Active} cancel={clickMock} />);
        expect(item.find("div > div.col-12").length).toBe(1);
    });

    it("Empty list", () => {
        const item = render(<TasksList list={tasks} click={clickMock} filter={1000} cancel={clickMock} />);
        expect(item.text()).toBe("Нет задач");
    });
});
