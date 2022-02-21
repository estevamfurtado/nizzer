import NizzerAPI from "../api/NizzerAPI.js";

import Kanban from "./Kanban.js";

export default class Board {
    constructor (root) {
        this.elements = {};
        this.elements.root = root;
        this.elements.addKanban = this.elements.root.querySelector(".board__addKanban");

        Board.kanbans().forEach(kanban => {
            const kanbanView = new Kanban(kanban);
            this.elements.root.insertBefore(kanbanView.elements.root, this.elements.addKanban);
        })

        this.elements.addKanban.addEventListener("click", () => {
            const newKanban = NizzerAPI.newKanban();
            const newKanbanView = new Kanban(newKanban);
            this.elements.root.insertBefore(newKanbanView.elements.root, this.elements.addKanban)
        });
    }

    static kanbans() {
        return NizzerAPI.getAllData();
    }
}