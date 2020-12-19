import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useIpt from '../../hooks/useIpt'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../ipt/utils'
import { getFarms } from '../../ipt/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const ipt = useIpt()
  const { account } = useWallet()

  const farms = getFarms(ipt)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
