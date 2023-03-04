import React from 'react'
import stores from '@/store'

const StoresContext = React.createContext(stores)
export const useStores = () => {
  return React.useContext(StoresContext)
}
