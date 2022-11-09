import { Section } from "./sectionMaker.js";
class NoteSection extends Section {
    constructor(deleteSection, drag) {
        super(deleteSection, drag);
        this.sectionType = 'NOTE';
        this.defaultBody = `&lt;${this.sectionType} 내용을 입력해 주세요.&gt;`;
        this.makeSectionTemplate = (title, body) => {
            return (`
             <div class="title-area" draggable="false">
                  <div class="section__title--container">
                      <div class="section__title">${(title.length === 0) ? this.defaultTitle : title}</div>
                      <div class="section__title-content">${(body.length === 0) ? this.defaultBody : body}</div>
                  </div>
             </div>
             <button class="section__close">𝘹</button>
        `);
        };
    }
}
export default NoteSection;
//# sourceMappingURL=noteSection.js.map