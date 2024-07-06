import { data } from './data';

export class App {
    container: HTMLElement;

    public static newInstance() {
        return new App();
    }

    constructor() {
        this.container = document.getElementById('container');
    }

    public async main() {
        console.log('main');
        this.redirectToCurrent();
    }

    private redirectToCurrent() {
        const currentUrl = new URL(window.location.toString());
        const target = currentUrl.searchParams.get('target');
        const redirectUrl = data[target];

        console.log({ currentUrl, target, redirectUrl });
        debugger;

        if (!redirectUrl) {
            console.log(`No redirect link for target: ${target}`);
            this.createLinks();
            return;
        }

        this.createLinkFor(target);
        window.location = redirectUrl;
    }

    private createLinks() {
        for (const key of Object.keys(data)) {
            this.createLinkFor(key);
        }
    }

    private createLinkFor(name: string) {
        const element = document.createElement('a');
        element.setAttribute('id', name);
        element.setAttribute('href', data[name]);
        element.innerText = name;
        this.container.appendChild(element);
    }
}
