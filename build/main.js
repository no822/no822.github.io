import { MediaModal, TextModal } from "./modals/modalTemplate.js";
import { ImplModalMaker } from "./modals/modalMaker.js";
import ImageSection from "./sections/imageSection.js";
import VideoSection from "./sections/videoSection.js";
import NoteSection from "./sections/noteSection.js";
import TaskSection from "./sections/taskSection.js";
import { DragHandler } from "./dragEvent/drag.js";
class ImplMain {
    constructor() {
        this.list = [];
        this.isModal = false;
        this.syncList = () => {
            const container = document.querySelector('.main__section-container');
            const list = Array.from(container.querySelectorAll('.section'));
            this.list = list;
        };
        this.setListIndex = () => {
            this.list.forEach((section, index) => {
                section.setAttribute('id', `section_${(index + 1)}`);
            });
            return this.list;
        };
        this.refreshList = () => {
            // list 순서가 변경 후 인덱스 재정렬
            this.syncList();
            return this.setListIndex();
        };
        this.setIsModal = (isModal) => {
            this.isModal = isModal;
        };
        this.addSectionElement = (sectionElement) => {
            const index = (this.list.length + 1).toString();
            sectionElement.setAttribute('id', `section_${index}`);
            this.list = [...this.list, sectionElement];
            const container = document.querySelector('.main__section-container');
            container.append(sectionElement);
        };
        this.deleteSectionElement = (sectionElement) => {
            this.list = [...this.list.filter(section => section !== sectionElement)];
            this.setListIndex();
            sectionElement.remove();
        };
        this.modalEvent = (button, contentTemplateMaker, sectionMaker) => {
            button.addEventListener('click', () => {
                if (this.isModal)
                    return;
                const body = (document.querySelector('body'));
                const templateMaker = new ImplModalMaker(contentTemplateMaker, sectionMaker, this.setIsModal, this.addSectionElement);
                body.append(templateMaker.makeModalElement());
                this.setIsModal(true);
            });
        };
        this.dropEvent = (drag) => {
            const container = document.querySelector('main.main__section-container');
            container.addEventListener('dragover', drag.dragOverHandler);
            container.addEventListener('drop', drag.dropHandler);
        };
        this.enrollEvent = () => {
            const imageButton = (document.querySelector('#image-button'));
            const videoButton = (document.querySelector('#video-button'));
            const noteButton = (document.querySelector('#note-button'));
            const taskButton = (document.querySelector('#task-button'));
            const mediaModal = new MediaModal();
            const textModal = new TextModal();
            const dragEvent = new DragHandler(this.refreshList);
            const imageSection = new ImageSection(this.deleteSectionElement, dragEvent);
            const videoSection = new VideoSection(this.deleteSectionElement, dragEvent);
            const noteSection = new NoteSection(this.deleteSectionElement, dragEvent);
            const taskSection = new TaskSection(this.deleteSectionElement, dragEvent);
            this.dropEvent(dragEvent);
            this.modalEvent(imageButton, mediaModal, imageSection);
            this.modalEvent(videoButton, mediaModal, videoSection);
            this.modalEvent(noteButton, textModal, noteSection);
            this.modalEvent(taskButton, textModal, taskSection);
        };
        this.init = () => {
            console.log('init!');
            this.enrollEvent();
        };
    }
}
const main = new ImplMain();
main.init();
//# sourceMappingURL=main.js.map