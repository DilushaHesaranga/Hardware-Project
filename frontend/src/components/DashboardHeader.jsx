import './DashboardHeader.css';

function DashboardHeader({ isConnected, lastReadingText, gardenName = 'Balcony Mint Garden' }) {

    return(
        <header className="dashboard-header">
            <div className="dashboard-header_title">
                <h1>{gardenName}</h1>
                <p>Monitor,control and manage the garden.</p>
            </div>

            <div className="dashboard-header_connection">
                <span
                    className={`dashboard-header_status ${isConnected ? 'is-connected' : 'is-offline'}`}
                >
                    {isConnected ? '✓ Controller connected' : 'Controller offline'}
                </span>
                <p>{lastReadingText}</p>
            </div>
        </header>
    );

}
export default DashboardHeader;
