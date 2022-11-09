import { Section } from "./sectionMaker.js";
class ImageSection extends Section {
    constructor(deleteSection, drag) {
        super(deleteSection, drag);
        this.sectionType = 'IMAGE';
        this.defaultImageUrl = 'https://via.placeholder.com/500x300.png?text=Please+Input+Valid+Image+Url';
        this.validateUrl = (url) => {
            const regExr = /(?:https?:\/\/)?(?:www.)?[a-zA-Z0-9.]+(\/[a-zA-Z0-9_-]+(.jpg|.png|.jpeg)?)/;
            if (!url.match(regExr))
                throw new Error('Invalid Url Format!');
            return url[0];
        };
        this.getTemplate = (title, url) => {
            return (`
            <div class="image-area" draggable="false">
                <img src=${url} alt="section image" draggable="false">
            </div>
            <div class="title-area">
                <div class="section__title">${(title.length === 0) ? this.defaultTitle : title}</div>
                <button class="section__close">𝘹</button>
            </div>
        `);
        };
        this.makeSectionTemplate = (title, url) => {
            try {
                this.validateUrl(url);
                return this.getTemplate(title, url);
            }
            catch (e) {
                return this.getTemplate(title, this.defaultImageUrl);
            }
        };
    }
}
export default ImageSection;
//# sourceMappingURL=imageSection.js.map