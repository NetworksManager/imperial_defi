import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../ipt/utils'
import useIpt from './useIpt'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const ipt = useIpt()
  const masterChefContract = getMasterChefContract(ipt)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, ipt])

  useEffect(() => {
    if (account && ipt) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, ipt])

  return balance
}

export default useStakedBalance
