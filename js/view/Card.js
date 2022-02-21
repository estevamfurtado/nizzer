import NizzerAPI from "../api/NizzerAPI.js";

export default class Card {

    constructor (card) {
        this.elements = {};
        this.elements.root = Card.createRoot();
        this.elements.root.dataset.id = card.id;
        this.title = card.content.title;

        this.elements.input = this.elements.root.querySelector(".card__input");
        this.elements.input.textContent = card.content.title;

        this.elements.remove_delete = this.elements.root.querySelector(".card__remove__delete");
        this.elements.remove_confirm = this.elements.root.querySelector(".card__remove__confirm");
        this.elements.remove_dismiss = this.elements.root.querySelector(".card__remove__dissmiss");

        // remove
        this.elements.remove_delete.addEventListener("click", () => {
            this.elements.remove_delete.classList.add("hidden");
            this.elements.remove_confirm.classList.remove("hidden");
            this.elements.remove_dismiss.classList.remove("hidden");
        })
        this.elements.remove_confirm.addEventListener("click", () => {
            NizzerAPI.removeCard(card.id);
            this.elements.root.parentElement.removeChild(this.elements.root);
        })
        this.elements.remove_dismiss.addEventListener("click", () => {
            this.elements.remove_delete.classList.remove("hidden");
            this.elements.remove_confirm.classList.add("hidden");
            this.elements.remove_dismiss.classList.add("hidden");
        })

        // Saves card title content
        this.elements.input.addEventListener("blur", () => {
            NizzerAPI.changeCardContent(card.id, {title: this.elements.input.textContent})
        });

        // drag
        // passa o id do cartao quando começa o drag
        this.elements.root.addEventListener("dragstart", event => {
            console.log("comecou");
        })
        // previne o efeito padrão quando dropa
        this.elements.root.addEventListener("drop", event => {
            event.preventDefault();
        })
        


    }

    static createRoot() {
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(
            `
            <div class="card" draggable="true" droppable="false">
                <div class="card__remove" droppable="false">
                    <div class="card__remove__delete card__remove__item" droppable="false">x</div>
                    <div class="card__remove__confirm card__remove__item hidden" droppable="false">y</div>
                    <div class="card__remove__dissmiss card__remove__item hidden" droppable="false">n</div>
                </div>

                <div class="card__input" contenteditable droppable="false"></div>
            </div>
            `
        ).children[0];
    }

}