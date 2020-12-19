import { useCallback } from 'react'

import useIpt from './useIpt'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../ipt/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const ipt = useIpt()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(ipt),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, ipt],
  )

  return { onStake: handleStake }
}

export default useStake
