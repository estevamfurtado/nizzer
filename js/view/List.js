import NizzerAPI from "../api/NizzerAPI.js";
import Card from "./Card.js";
import DropzoneCard from "./DropzoneCard.js";

export default class List {

    constructor (list) {
        this.elements = {};

        this.elements.root = List.createRoot();
        this.elements.root.dataset.id = list.id;

        this.elements.title = this.elements.root.querySelector(".list__header__title");
        this.elements.remove = this.elements.root.querySelector(".list__header__remove");
        this.elements.content = this.elements.root.querySelector(".list__content");
        this.elements.content.dataset.id = list.id;
        this.elements.addCard = this.elements.root.querySelector(".list__add-card");
        this.elements.dropzone = null;

        this.elements.title.textContent = list.content.title;
        

        // this.elements.content.appendChild(new DropzoneCard().elements.root)
        list.cards.forEach(card => {
            const cardView = new Card(card);
            this.elements.content.appendChild(cardView.elements.root);
            // this.elements.content.appendChild(new DropzoneCard().elements.root)
        })

        // Remove List
        this.elements.remove.addEventListener("click", () => {
            NizzerAPI.removeList(list.id);
            this.elements.root.parentElement.removeChild(this.elements.root);
        });

        // Add Card
        this.elements.addCard.addEventListener("click", () => {
            const card = NizzerAPI.newCard({title: "Card"}, list.id);
            const cardView = new Card(card);
            this.elements.content.appendChild(cardView.elements.root);
        })

        // Saves list title content
        this.elements.title.addEventListener("blur", () => {
            NizzerAPI.changeListContent(list.id, {title: this.elements.title.textContent})
        });


        // droppable
        this.elements.content.addEventListener("dragenter", event => {
            console.log("enter");
            //console.log(document.elementFromPoint(e.clientX, e.clientY));            
        });
        this.elements.content.addEventListener("dragleave", event => {
            console.log("leave");
        });

        this.elements.content.addEventListener("mouseover", event => {
        })


    }

    static ContainerContainsElement(container, element) {

        let parent = element;
        let child = element;
        let isSearching = true;

        console.log(container);

        while (isSearching) {
            if (parent === container) {
                isSearching = false;
                return child;
            }
            else {
                child = parent;
                parent = child.parentElement;
                console.log(parent);
            }
        }
    }

    static createRoot() {
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(
            `<div class="list" draggable="true">
                <div class="list__header">
                    <div class="list__header__title" contenteditable></div>
                    <div class="list__header__remove">x</div>
                </div>
                <div class="list__content" droppable="true"></div>
                <div class="list__add-card">+ Add</div>
            </div>`
        ).children[0];
    }

}