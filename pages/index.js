import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"

export default function MintPage() {
    const { Moralis, account, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    // These get re-rendered every time due to our connect button!
    const chainId = parseInt(chainIdHex)
    // console.log(`ChainId is ${chainId}`)
    const wizardAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const [tokenCounter, setTokenCounter] = useState("0")

    const dispatch = useNotification()

    const {
        runContractFunction: requestNft,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: wizardAddress,
        functionName: "requestNft",
        params: {},
    })

    /* View Functions */
    const { runContractFunction: getTokenCounter } = useWeb3Contract({
        abi: abi,
        contractAddress: wizardAddress, 
        functionName: "getTokenCounter",
        params: {
            player: account,
        },
    })


    

    async function updateUIValues() {
        const hasTokenCounter = (await getTokenCounter()).toString()
        setTokenCounter(hasTokenCounter)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1)
            updateUIValues()
            handleNewNotification(tx)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="page">
            <div className="first-block"></div>
                <section className="mint-block">
                    <div className="nft-block">
                        <img className="nftimg" src="/img/mint.gif"></img>
                    </div>
                    <div className="Description">
                        <button
                            className="mint-button"
                            onClick={async () =>
                                await requestNft({
                                    onSuccess: handleSuccess,
                                    onError: (error) => console.log(error),
                                })
                            }
                            disabled={isLoading || isFetching}
                        >
                            {isLoading || isFetching ? (
                                <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                            ) : (
                                "Mint Wizard"
                            )}
                        </button>
                        <p className="desctiption-text">Just a MAD Wizard that to break free from his cage! There are no Traits defining your luck...Pure skill and luck. </p>
                        <p className="desctiption-text">Also, who knows whats comming after this mint? Who is stading behind? </p>
                        <div className="raffle-content">  
                            <div className="winner">
                                <div className="stat stat-win">Minted: {tokenCounter}/999</div> 
                            </div>
                        </div>
                    </div>
                </section>
        </div>
    )
}
