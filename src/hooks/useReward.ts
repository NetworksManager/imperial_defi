import { useCallback } from 'react'

import useIpt from './useIpt'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../ipt/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const ipt = useIpt()
  const masterChefContract = getMasterChefContract(ipt)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, ipt])

  return { onReward: handleReward }
}

export default useReward
