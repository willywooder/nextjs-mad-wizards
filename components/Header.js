import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="p-5 header">
            <div className="flex flex-row items-center">
                <a className="explore" href="https://github.com/willywooder/solidity-mad-wizards">Whitepaper</a>
            </div>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
