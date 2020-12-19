import { useCallback } from 'react'

import useIpt from './useIpt'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../ipt/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const ipt = useIpt()
  const masterChefContract = getMasterChefContract(ipt)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, ipt],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
