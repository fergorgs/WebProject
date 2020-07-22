import React, { createContext, useState } from 'react'

export const PermissionContext = createContext()

const PermissionProvider = ({ children }) => {
  const [permission, setPermission] = useState('Admin')

  const savePermission = (perm) => {
    setPermission(perm)
  }

  return (
    <PermissionContext.Provider value={{permission, savePermission}}>
      {children}
    </PermissionContext.Provider>
  )
}

export default PermissionProvider
