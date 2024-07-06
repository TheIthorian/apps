import { data } from './data';

export class App {
    public static newInstance() {
        return new App();
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

        if (!redirectUrl) {
            console.log(`No redirect link for target: ${target}`);
            this.createLinks();
            return;
        }

        window.location = redirectUrl;
    }

    private createLinks() {
        const container = document.getElementById('container');

        const foundry = document.createElement('a');
        foundry.setAttribute('id', 'foundry');
        foundry.setAttribute('href', data.foundry);
        foundry.innerText = 'foundry';
        container.appendChild(foundry);

        const theatreSchedule = document.createElement('a');
        theatreSchedule.setAttribute('id', 'theatre-schedule');
        theatreSchedule.setAttribute('href', data['theatre-schedule']);
        theatreSchedule.innerText = 'theatre-schedule';
        container.appendChild(theatreSchedule);

        const energyDashboard = document.createElement('a');
        energyDashboard.setAttribute('id', 'energy-dashboard');
        energyDashboard.setAttribute('href', data['energy-dashboard']);
        energyDashboard.innerText = 'energy-dashboard';
        container.appendChild(energyDashboard);
    }
}
