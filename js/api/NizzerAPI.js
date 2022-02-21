export default class NizzerAPI {
    
    static getAllData() {
        return read();
    }

    // Kanbans
    static newKanban(){
        const kanbans = read();
        const element = {
            id: randomId(),
            content: {title: "Kanban"},
            lists: []
        };
        kanbans.push(element);
        save(kanbans);
        return element;
    }

    static removeKanban(kanbanId){
        const kanbans = read();
        kanbans.forEach((kanban, kbIdx) => {
            kanbans.splice(kbIdx, 1);
        });

        save(kanbans);
    }

    static changeKanbanContent(kanbanId, newContent){
        const kanbans = read();
        kanbans.forEach(kanban => {
            if (kanban.id == kanbanId) {
                kanban.content = newContent;
            }
        });
        save(kanbans);
    }


    // Lists
    static newList(content, kanbanId){
        const kanbans = read();
        const element = {
            id: randomId(),
            content: content,
            cards: []
        };
        
        kanbans.forEach(kanban => {
            if (kanban.id == kanbanId){
                kanban.lists.push(element);
                save(kanbans);
            }
        })

        return element;
    }
    static removeList(listId){
        const kanbans = read();
        kanbans.forEach((kanban, kbIdx) => {
            kanban.lists.forEach((list, listIdx)=> {
                if (list.id == listId) {
                    kanban.lists.splice(listIdx, 1);
                }
            })
        });

        save(kanbans);
    }

    static changeListContent(listId, newContent){
        const kanbans = read();
        kanbans.forEach((kanban, kbIdx) => {
            kanban.lists.forEach((list, listIdx)=> {
                if (list.id == listId) {
                    list.content = newContent;
                }
            })
        });

        save(kanbans);
    }




    // Cards
    static newCard(content, listId){
        const kanbans = read();
        const element = {
            id:randomId(),
            content: content
        }
        kanbans.forEach(kanban => {
            kanban.lists.forEach(list => {
                if (list.id == listId) {
                    list.cards.push(element);
                }
            })
        })

        save(kanbans);
        return element;
    }

    static removeCard(cardId) {
        const kanbans = read();
        kanbans.forEach((kanban, kbIdx) => {
            kanban.lists.forEach((list, listIdx)=> {
                list.cards.forEach((card, cardIdx) => {
                    if (card.id == cardId) {
                        list.cards.splice(cardIdx, 1);
                    }
                })
            })
        });

        save(kanbans);
    }
    static changeCardContent(cardId, newContent){
        const kanbans = read();
        kanbans.forEach((kanban, kbIdx) => {
            kanban.lists.forEach((list, listIdx)=> {
                list.cards.forEach((card, cardIdx) => {
                    if (card.id == cardId) {
                        card.content = newContent;
                    }
                })
            })
        });

        save(kanbans);
    }

    static cleanData() {
        clearMemory();
    }
}

function read() {
    let kanbans = JSON.parse(localStorage.getItem("nizzer-data"));
    if (!kanbans) {
        kanbans = [{
            id: randomId(),
            content: {title: "Kanban"},
            lists: []}];
        save(kanbans);
    }
    return kanbans;
}

function save(data) {
    localStorage.setItem("nizzer-data", JSON.stringify(data));
}

function randomId() {
    return Math.floor(Math.random() * 10000000);
}

function clearMemory() {
    localStorage.removeItem("nizzer-data");
}