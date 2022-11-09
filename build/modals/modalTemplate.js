export class MediaModal {
    constructor() {
        // (title, url)
        this.getModalContentTemplate = () => {
            return (`
            <div class="modal__input">
                <label for="title" class="modal__input-label">title</label>
                <input type="text" id="title" />
            </div>
            <div class="modal__input">
                <label for="url" class="modal__input-label">url</label>
                <input type="text" id="url" />
            </div>
       `);
        };
    }
}
export class TextModal {
    constructor() {
        // (title, body)
        this.getModalContentTemplate = () => {
            return (`
            <div class="modal__input">
                <label for="title" class="modal__input-label">title</label>
                <input type="text" id="title"/>
            </div>
            <div class="modal__input">
                <label for="body" class="modal__input-label">body</label>
                <textarea rows="2" cols="30" id="body"></textarea>
            </div>
        `);
        };
    }
}
//# sourceMappingURL=modalTemplate.js.map