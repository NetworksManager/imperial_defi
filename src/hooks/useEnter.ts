import {useCallback} from 'react'

import useIpt from './useIpt'
import {useWallet} from 'use-wallet'

import {enter, getXIptStakingContract} from '../ipt/utils'

const useEnter = () => {
  const {account} = useWallet()
  const ipt = useIpt()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXIptStakingContract(ipt),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, ipt],
  )

  return {onEnter: handle}
}

export default useEnter
