import { Section } from "./sectionMaker.js";
class TaskSection extends Section {
    constructor(deleteSection, drag) {
        super(deleteSection, drag);
        this.sectionType = 'TASK';
        this.defaultBody = `&lt;${this.sectionType} 내용을 입력해 주세요.&gt;`;
        this.makeSectionTemplate = (title, body) => {
            return (`
            <div class="title-area" draggable="false">
                <div class="section__title--container">
                    <div class="section__title">${(title.length === 0) ? this.defaultTitle : title}</div>
                    <div class="section__task-container">
                        <input type="checkbox">
                        <div class="section__content">${(body.length === 0) ? this.defaultBody : body}</div>
                    </div>
                </div>
            </div>
            <button class="section__close">𝘹</button>
        `);
        };
    }
}
export default TaskSection;
//# sourceMappingURL=taskSection.js.map