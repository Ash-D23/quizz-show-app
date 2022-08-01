import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../Context/AuthContext/AuthContext'

function RequireAuth({ children }: { children: JSX.Element }) : JSX.Element{
    const location = useLocation()
    const auth : any = useAuthContext()
    if (!auth.user) {
        return <Navigate to='/login' state={{ from: location.pathname }} />
    }
    return children
}

export default RequireAuth