const myStuffTemplate = document.createElement('template');

myStuffTemplate.innerHTML = `
<div class="persona">
<img class="speaker" alt="image of wiseass character" src="/images/personas/wiseass_2.gif"/>
<div class="speech">
They haven't <i class="italic">invented</i> a code smell that could hide from my big
nose!
</div>
</div>`;

class GHPersona extends HTMLElement {

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });

        const child = myStuffTemplate.content.cloneNode(true);
        this._shadowRoot.appendChild(child)
    }
}

window.customElements.define('gh-persona', GHPersona)