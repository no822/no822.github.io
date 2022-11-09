export class ImplModalMaker {
    constructor(contentMaker, sectionMaker, setIsModal, addSectionElement) {
        this.contentMaker = contentMaker;
        this.sectionMaker = sectionMaker;
        this.setIsModal = setIsModal;
        this.addSectionElement = addSectionElement;
        this.closeModal = (modal) => {
            modal.remove();
            this.setIsModal(false);
        };
        this.sectionButtonClickHandler = (modal, modalInfo) => {
            const sectionElement = this.sectionMaker.getSection(modalInfo);
            this.addSectionElement(sectionElement);
            this.closeModal(modal);
        };
        this.enrollModalEvents = (modal) => {
            // 1. 모달 닫기 이벤트
            const closeButton = (modal.querySelector('.modal__close'));
            closeButton.addEventListener('click', () => {
                this.closeModal(modal);
            });
            // 2. section 추가 이벤트
            const addButton = (modal.querySelector('.modal__add-button'));
            addButton.addEventListener('click', () => {
                const title = modal.querySelector('#title');
                const url = modal.querySelector('#url');
                const body = modal.querySelector('#body');
                const sectionType = this.sectionMaker.sectionType;
                const sectionInfo = (sectionType === 'IMAGE' || sectionType === 'VIDEO')
                    ? { title: title.value, url: url.value } : { title: title.value, body: body.value };
                this.sectionButtonClickHandler(modal, sectionInfo);
            });
        };
        this.makeTemplate = () => {
            return (`
            <button class="modal__close">𝖷</button>
            ${this.contentMaker.getModalContentTemplate()}
            <div class="modal__buttons">
                <button class="modal__add-button">추가</button>
            </div>
        `);
        };
        this.makeModalElement = () => {
            const modal = document.createElement('div');
            modal.classList.add('modal__container');
            modal.innerHTML = this.makeTemplate();
            this.enrollModalEvents(modal);
            return modal;
        };
    }
}
//# sourceMappingURL=modalMaker.js.map