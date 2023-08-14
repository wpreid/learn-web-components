const myStuffTemplate = document.createElement('template');

myStuffTemplate.innerHTML = `
<style>

.persona {
    margin-left: auto;
    margin-right: auto;
    vertical-align: middle;
    display: flex;
    align-items: center;
}
.speaker {
    aspect-ratio: initial;
    width: 30vw;
    min-width: 80px;
    max-width: 150px;
    float: left;
}
.speech {
    background-color: var(--bubble-background);
    color: var(--bubble-text-color);
    margin-left: 50px;
    margin-right: 7px;
    padding: 25px;
    border: 2px solid var(--gray-color);
    font-family: var(--speech-font);
    border-radius: 10px;
    min-width: 120px;
    position: relative;
    box-shadow: 6px 6px 6px var(--gray-color);
}
.speech::before {
    /* speech bubble tail's grey background*/
    content: "";
    position: absolute;
    border-style: solid;
    display: block;
    width: 0;
    top: 48%;
    left: -25px;
    border-width: 11px 25px 11px 0;
    border-color: transparent var(--gray-color);
}
.speech::after {
    /* Speech bubble tail's white foreground */
    content: "";
    position: absolute;
    border-style: solid;
    display: block;
    width: 0;
    top: 50%;
    left: -20px;
    border-width: 9px 21px 9px 0;
    border-color: transparent var(--bubble-background);
}
</style>
<div class="persona">
<img id="speaker" class="speaker" 
  alt="image of wiseass character" 
  src="/images/personas/wiseass_2.gif"/>
<div class="speech">
<slot name="quote"></slot>
</div>
</div>`;

class GHPersona extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ 'mode': 'open' });
        const child = myStuffTemplate.content.cloneNode(true);
        this.shadowRoot.appendChild(child)
        const character = this.getAttribute("character")
        const image = `/images/personas/${character}.gif`;
        this.shadowRoot.getElementById('speaker').setAttribute('src', image);

    }
}

window.customElements.define('gh-persona', GHPersona)