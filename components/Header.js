import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="p-5 header">
            <div className="flex flex-row items-center">
                <a className="explore" href="/explore">Explore</a>
            </div>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
