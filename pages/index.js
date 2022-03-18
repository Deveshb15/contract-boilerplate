import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { ethers } from 'ethers'

export default function Home() {

  const [account, setAccount] = useState(null)

  const connectWallet = async() => {
      try {
          const { ethereum } = window
          if(ethereum) {
              const accounts = await ethereum.request({
                  method: 'eth_requestAccounts'
              })
              console.log(accounts)
              setAccount(accounts[0])
          } else {
              alert('Download metamask first')
          }
      } catch(err) {
          console.log(err)
      }
  }

  const checkIfWalletIsConnected = async() => {
      try {
          const { ethereum } = window

          if(ethereum) {

              const accounts = await ethereum.request({
                  method: 'eth_accounts'
              })

              if(accounts.length > 0) {
                  setAccount(accounts[0])
              }

          } else {
              console.log('download metamask')
          }
      } catch(err) {
          console.log(err)
      }
  }

  useEffect(() => {
      checkIfWalletIsConnected()
  }, [])

  const renderContainer = () => (
      <div className={styles.renderContainer}>
          <p>Connected Wallet: {account}</p>
      </div>
  )

  return (
    <div className={styles.container}>
			<Head>
				<title>Boilerplate for contract interaction</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Interact with your contract!
				</h1>
        {
            account ? (
                renderContainer()
            ) : (
                <button onClick={connectWallet} className={styles.button}>Connect</button>
            )
        }
			</main>
		</div>
  )
}
