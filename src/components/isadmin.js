import { getUser } from "../commons"

export const IsAdmin = ( {children} ) => {
    let user = getUser();
    if( user.admin ) {
        return <>{children}</>
    }else {
        return null;
    }
}