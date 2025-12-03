class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._data = {}; // Private property to store data
    }

    // Getter
    get data() {
        return this._data;
    }

    // Setter - this is what you'll use!
    set data(value) {
        this._data = value;
        this.render(); // Re-render when data changes
    }

    render() {
        const {
            imageSrc = '',
            imageAlt = 'Project image',
            imageSizes = [],
            title = 'Untitled Project',
            description = 'No description available.',
            link = '#',
            linkText = 'View more',
            linkAvailable = true
        } = this._data;

        // Clear shadow root before rendering
        this.shadowRoot.innerHTML = '';

        const styleElement = document.createElement('style');
        styleElement.textContent = `
            /* Reset */
            * {
                margin: 0;
                padding: 0;
            }

            :host {
                padding: var(--scale-md, 1.5rem);
                display: grid;
                grid-template-columns: 7.5rem 1fr;
                background: var(--color-foreground-primary, #fcfcfc);
                border-radius: var(--scale-sm, 1rem);
                box-shadow:
                    var(--shadow-displacement-down-1, 0 6px 18px)
                    rgba(var(--color-shadow-1, 49, 44, 66), var(--shadow-alpha-soft, 0.1)),
                    var(--shadow-displacement-down-2, 0 2px 4px)
                    rgba(var(--color-shadow-2, 105, 87, 173), var(--shadow-alpha-hard, 0.15));
                transition: transform 0.2s ease;
            }

            :host(:hover) {
                transform: translateX(8px);
            }

            picture {
                grid-column: 1;
                grid-row: 1 / -1;
                width: 7.5rem;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            div {
                grid-column: 2;
                padding: 0 0 0 var(--scale-md, 1.5rem);
                display: flex;
                flex-direction: column;
            }

            h3 {
                font-family: var(--font-display);
                font-weight: var(--font-weight-bld, 600);
                margin-bottom: var(--scale-xs, 0.5rem);
                color: var(--color-text, #1e1d20);
            }

            p {
                flex: 1;
                line-height: 1.6;
                margin-bottom: var(--scale-sm, 1rem);
                color: var(--color-text, #1e1d20);
            }

            a {
                align-self: flex-start;
                font-weight: var(--font-weight-bld, 600);
                color: var(--color-sunset-3, #715eea);
                text-decoration: none;
            }

            a:hover {
                color: oklch(from var(--color-sunset-3, #715eea) calc(l - 0.25) c h);
            }

            .project-unavailable {
                color: var(--color-text, #1e1d20);
                cursor: default;
            }

            @media (max-width: 42.5em) { 
                :host {
                    grid-template-columns: 1fr;
                }
                
                picture {
                    display: none;
                }
                
                div {
                    padding: 0;
                }
            }
        `;

        // Create picture element (only if imageSrc exists)
        const pictureContent = document.createElement('picture');
        if (imageSrc) {
            // Build srcset from array if provided
            if (imageSizes && imageSizes.length > 0) {
                const source = document.createElement('source');
                source.srcset = imageSizes.map(img => `${img.url} ${img.width}w`).join(', ');
                source.sizes = `(max-width: 480px) 90vw, (max-width: 1024px) 50vw, 33vw`;
                source.type = 'image/png';
                pictureContent.appendChild(source);
            }

            // Fallback img
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = imageAlt;
            pictureContent.appendChild(img);
        }

        // Create text content
        const textContent = document.createElement('div');
        
        const contentTitle = document.createElement('h3');
        contentTitle.textContent = title;
        
        const contentDescription = document.createElement('p');
        contentDescription.textContent = description;
        
        const contentLink = document.createElement('a');
        if (linkAvailable) {
            contentLink.href = link;
            contentLink.textContent = linkText;
        } else {
            contentLink.className = 'project-unavailable';
            contentLink.textContent = linkText;
        }

        textContent.appendChild(contentTitle);
        textContent.appendChild(contentDescription);
        textContent.appendChild(contentLink);

        // Append to shadow root
        this.shadowRoot.appendChild(styleElement);
        if (imageSrc) {
            this.shadowRoot.appendChild(pictureContent);
        }
        this.shadowRoot.appendChild(textContent);
    }
}

customElements.define('project-card', ProjectCard);