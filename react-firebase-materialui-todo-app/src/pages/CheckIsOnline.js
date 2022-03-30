import React from "react";
import isReachable from "is-reachable";

const URL = "speedtest.pl";
const EVERY_SECOND = 1000;

export default class CheckIsOnline extends React.PureComponent {
    _isMounted = true;

    state = { online: false };

    componentDidMount() {
        setInterval(async () => {
            const online = await isReachable(URL);

            if (this._isMounted) {
                this.setState({ online });
            }
        }, EVERY_SECOND);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return <div>
            {this.state.online ? "ONLINE" : "OFFLINE"}</div>;
    }
}
