import {useCallback} from 'react'

import useIpt from './useIpt'
import {useWallet} from 'use-wallet'

import {leave, getXIptStakingContract} from '../ipt/utils'

const useLeave = () => {
  const {account} = useWallet()
  const ipt = useIpt()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXIptStakingContract(ipt),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, ipt],
  )

  return {onLeave: handle}
}

export default useLeave
