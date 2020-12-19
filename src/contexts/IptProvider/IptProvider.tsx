import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Ipt } from '../../ipt'

export interface IptContext {
  ipt?: typeof Ipt
}

export const Context = createContext<IptContext>({
  ipt: undefined,
})

declare global {
  interface Window {
    iptsauce: any
  }
}

const IptProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [ipt, setIpt] = useState<any>()

  // @ts-ignore
  window.ipt = ipt
  // @ts-ignore


  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const iptLib = new Ipt(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setIpt(iptLib)
      window.iptsauce = iptLib
    }
  }, [ethereum])

  return <Context.Provider value={{ ipt }}>{children}</Context.Provider>
}

export default IptProvider
