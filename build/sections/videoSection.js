import { Section } from "./sectionMaker.js";
class VideoSection extends Section {
    constructor(deleteSection, drag) {
        super(deleteSection, drag);
        this.sectionType = 'VIDEO';
        this.defaultVideoId = 'u31qwQUeGuM';
        this.getVideoId = (url) => {
            const regExr = /(?:https?:\/\/)?(?:www.)?youtu.be\/([a-zA-Z0-9-_]{11})/;
            const match = url.match(regExr);
            if (match == null)
                throw new Error('Invalid Video Id Format!');
            return match[1];
        };
        this.getTemplate = (title, videoId) => {
            return (`
            <div class="video-area" draggable="false">
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}" 
                    title="MOTION Image Section" 
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                >
                </iframe>
            </div>
            <div class="title-area">
                <div class="section__title">${(title.length === 0) ? this.defaultTitle : title}</div>
                <button class="section__close">𝘹</button>
            </div>
        `);
        };
        this.makeSectionTemplate = (title, url) => {
            try {
                const videoId = this.getVideoId(url);
                return this.getTemplate(title, videoId);
            }
            catch (e) {
                return this.getTemplate(title, this.defaultVideoId);
            }
        };
    }
}
export default VideoSection;
//# sourceMappingURL=videoSection.js.map