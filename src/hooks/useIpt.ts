import { useContext } from 'react'
import { Context } from '../contexts/IptProvider'

const useIpt = () => {
  const { ipt } = useContext(Context)
  return ipt
}

export default useIpt
