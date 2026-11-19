//importing the stylesheet for the navigation bar component
import './NavigationBar.css';

//creating the component for the navigation bar
function NavigationBar({ page }){
    return(
        <nav className="navigation-bar" aria-label="Main navigation">

            {/*Brand name and the logo*/}
            <span className="navigation-bar_brand">
                <svg
                    className="navigation-bar_logo"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <rect width="24" height="24" rx="6" fill="#1b7054" />
                    <path d="M6 18C5 10 10 6 18 6C18 14 14 19 6 18Z" fill="white" />
                </svg>
                Mint Garden
            </span>

            {/*Navigation links for the navigation bar*/}
            <ul className="navigation-bar_links">
                <li><a href="#overview" aria-current={page === 'overview' ? 'page' : undefined}>Overview</a></li>
                <li><a href="#controls" aria-current={page === 'controls' ? 'page' : undefined}>Controls</a></li>
                <li><a href="#history" aria-current={page === 'history' ? 'page' : undefined}>History</a></li>
                <li><a href="#activity" aria-current={page === 'activity' ? 'page' : undefined}>Activity</a></li>
                <li><a href="#settings" aria-current={page === 'settings' ? 'page' : undefined}>Settings</a></li>
            </ul>
            {/*Mode indicator for the navigation bar*/}
            <span className="navigation-bar_mode">Sample data mode</span>

        </nav>
    );

}
export default NavigationBar;
