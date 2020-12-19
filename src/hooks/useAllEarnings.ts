import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms } from '../ipt/utils'
import useIpt from './useIpt'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const ipt = useIpt()
  const farms = getFarms(ipt)
  const masterChefContract = getMasterChefContract(ipt)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, ipt])

  useEffect(() => {
    if (account && masterChefContract && ipt) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, ipt])

  return balances
}

export default useAllEarnings
