export class Section {
    constructor(deleteSection, drag) {
        this.deleteSection = deleteSection;
        this.drag = drag;
        this.defaultTitle = '&lt;기본 타이틀&gt;';
        this.getSectionTemplate = (modalInfo) => {
            if (this.sectionType === 'IMAGE' || this.sectionType === 'VIDEO') {
                const { title, url } = modalInfo;
                const sectionTemplate = this.makeSectionTemplate(title, url);
                return sectionTemplate;
            }
            else {
                const { title, body } = modalInfo;
                const sectionTemplate = this.makeSectionTemplate(title, body);
                return sectionTemplate;
            }
        };
        this.getElementWithEvents = (element) => {
            element.addEventListener('dragstart', this.drag.dragStartHandler);
            element.addEventListener('dragend', this.drag.dragEndHandler);
            element.addEventListener('dragenter', e => e.preventDefault());
            element.addEventListener('dragover', e => e.preventDefault());
            const deleteButton = element.querySelector('.section__close');
            deleteButton.addEventListener('click', () => {
                this.deleteSection(element);
            });
            return element;
        };
        this.createSection = (modalInfo) => {
            const sectionTemplate = this.getSectionTemplate(modalInfo);
            const sectionContainer = document.createElement('div');
            sectionContainer.classList.add('section');
            sectionContainer.classList.add(this.sectionType);
            sectionContainer.setAttribute('draggable', 'true');
            sectionContainer.innerHTML = sectionTemplate;
            return this.getElementWithEvents(sectionContainer);
        };
        this.getSection = (modalInfo) => {
            const section = this.createSection(modalInfo);
            return section;
        };
    }
}
//# sourceMappingURL=sectionMaker.js.map