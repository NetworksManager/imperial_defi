import {useCallback} from 'react'

import useIpt from './useIpt'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getIptContract,
  getXIptStakingContract
} from '../ipt/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const ipt = useIpt()
  const lpContract = getIptContract(ipt)
  const contract = getXIptStakingContract(ipt)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveStaking
