export default class DropzoneCard {
    constructor () {
        this.elements = {};
        this.elements.root = DropzoneCard.createRoot();
    }

    static createRoot() {
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(
            `
            <div class="dropzone-card" droppable="true">
                
            </div>
            `
        ).children[0];
    }
}