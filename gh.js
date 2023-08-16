window.customElements.define('gh-persona',
    class extends HTMLElement {
        __template = `
        <style>
        .persona {
            margin-left: auto;
            margin-right: auto;
            vertical-align: middle;
            display: flex;
            align-items: center;
        }
        .persona-image {
            aspect-ratio: initial;
            width: 30vw;
            min-width: 80px;
            max-width: 150px;
            float: left;
        }
        .persona-speech-bubble {
            background-color: var(--bubble-background);
            color: var(--bubble-text-color);
            margin-left: 50px;
            margin-right: 7px;
            padding: 25px;
            border: 2px solid var(--gray-color);
            font-family: var(--speech-font),fantasy;
            border-radius: 10px;
            min-width: 120px;
            position: relative;
            box-shadow: 6px 6px 6px var(--gray-color);
        }
        .persona-speech-bubble::before {
            /* speech bubble tail's grey background*/
            content: "";
            position: absolute;
            border-style: solid;
            display: block;
            width: 0;
            top: 50%;
            left: -25px;
            border-width: 11px 25px 11px 0;
            border-color: transparent var(--gray-color);
        }
        .persona-speech-bubble::after {
            /* Speech bubble tail's white foreground */
            content: "";
            position: absolute;
            border-style: solid;
            display: block;
            width: 0;
            top: calc(50% + 2px);
            left: -20px;
            border-width: 9px 21px 9px 0;
            border-color: transparent var(--bubble-background);
        }
        </style>
        <div class="persona">
        <img id="speaker" class="persona-image" alt="" src="" />
        <div class="persona-speech-bubble">
        <slot name="quote"></slot>
        </div>
        </div>`;

        constructor() {
            super();
            this.attachShadow({'mode': 'open'});
            const persona_quote_template = document.createElement('template');
            persona_quote_template.innerHTML = this.__template;
            this.shadowRoot.appendChild(persona_quote_template.content.cloneNode(true))

            const character = this.getAttribute("character")
            const image_tag = this.shadowRoot.getElementById('speaker');
            image_tag.setAttribute('src', `/images/personas/${character}.gif`);
            image_tag.setAttribute('alt', `image of ${character}`)

        }
    }
)


window.customElements.define('gh-image-quote',
    class extends HTMLElement {

        __template = `
        <style>
        #wrapper {
            max-width: 80vw;
            margin-left: auto;
            margin-right: auto;
        }
        #wrapper > img { 
            display: block;
            margin-left: auto;
            margin-right: auto;
            aspect-ratio: initial;
            min-width: 150px;
            margin-bottom: 20px;
        }
        #wrapper  > blockquote {
            margin-left: auto;
            margin-right: auto;
            width: 60vw;
        }
        #wrapper > blockquote q {
            display:block;
            font-size: x-large;
            text-align: center;
            color: #b59d6f;
        }
        #wrapper > blockquote #quote-author {
            text-align: right;
            margin-bottom: 0;
        }
        #wrapper > blockquote #source {
            font-size: small;
            margin: 0;
            text-align: right;
            text-emphasis: aqua;
        }
        
        </style>
        <figure id="wrapper">
        <img id="image">
        <blockquote>
        <q id="quote-text"><slot name="quote"></slot></q>
        <p id="quote-author"><slot name="author"></slot></p>
        <p id="source"><em><slot name="source"></slot></em></p>
        </blockquote>
        </figure>`;

        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            const gh_image_quote_template = document.createElement('template');
            gh_image_quote_template.innerHTML = this.__template;
            let child = gh_image_quote_template.content.cloneNode(true);
            this.shadowRoot.appendChild(child)

            const image_tag = this.shadowRoot.getElementById('image');
            if (this.hasAttribute('image')) {
                const image_url = `/images/${this.getAttribute('image')}`;
                image_tag.setAttribute('src', image_url);

                if (this.hasAttribute('alt-text')) {
                    image_tag.setAttribute('alt', this.getAttribute('alt-text'));
                }
            } else {
                image_tag.setAttribute('display', 'none')
            }
        }
    }
);


