import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../ipt/utils'
import useIpt from './useIpt'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const ipt = useIpt()
  const masterChefContract = getMasterChefContract(ipt)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, ipt])

  useEffect(() => {
    if (account && masterChefContract && ipt) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, ipt])

  return balance
}

export default useEarnings
