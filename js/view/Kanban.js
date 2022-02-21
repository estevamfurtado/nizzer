import List from "./List.js";
import NizzerAPI from "../api/NizzerAPI.js";

export default class Kanban {

    constructor (kanban) {
        this.elements = {};
        this.elements.root = Kanban.createRoot();
        this.elements.root.dataset.id = kanban.id;
        this.elements.title = this.elements.root.querySelector(".kanban__title");
        this.elements.main = this.elements.root.querySelector(".kanban__main");
        this.elements.createList = this.elements.root.querySelector(".add-list");

        this.elements.title.textContent = kanban.content.title;

        kanban.lists.forEach(list => {
            const listView = new List(list);
            this.elements.main.insertBefore(listView.elements.root, this.elements.createList);
        })
        
        // Add list
        this.elements.createList.addEventListener("click", () => {
            const list = NizzerAPI.newList({title: "Lista"}, kanban.id);
            const newListView = new List(list);
            this.elements.main.insertBefore(newListView.elements.root, this.elements.createList);
        })

        // Change name
        this.elements.title.addEventListener("blur", () => {
            NizzerAPI.changeKanbanContent(kanban.id, {title: this.elements.title.textContent})
        });


        this.elements.remove_delete = this.elements.root.querySelector(".kanban__remove__delete");
        this.elements.remove_confirm = this.elements.root.querySelector(".kanban__remove__confirm");
        this.elements.remove_dismiss = this.elements.root.querySelector(".kanban__remove__dissmiss");

        // remove
        this.elements.remove_delete.addEventListener("click", () => {
            this.elements.remove_delete.classList.add("hidden");
            this.elements.remove_confirm.classList.remove("hidden");
            this.elements.remove_dismiss.classList.remove("hidden");
        })
        this.elements.remove_confirm.addEventListener("click", () => {
            NizzerAPI.removeKanban(kanban.id);
            this.elements.root.parentElement.removeChild(this.elements.root);
        })
        this.elements.remove_dismiss.addEventListener("click", () => {
            this.elements.remove_delete.classList.remove("hidden");
            this.elements.remove_confirm.classList.add("hidden");
            this.elements.remove_dismiss.classList.add("hidden");
        })


    }

    static createRoot() {
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(
            `<div class="kanban" draggable="true">
                <div class="kanban__header">
                    <div class="kanban__title" contenteditable></div>
                    <div class="kanban__remove">
                        <div class="kanban__remove__delete kanban__remove__item">x</div>
                        <div class="kanban__remove__confirm kanban__remove__item hidden">y</div>
                        <div class="kanban__remove__dissmiss kanban__remove__item hidden">n</div>
                    </div>
                </div>
                <div class="kanban__main">
                    <div class="add-list">
                        <div class="add-list__title">+ Lista<div/>
                    </div>
                </div>
            </div>`
        ).children[0];
    }

}