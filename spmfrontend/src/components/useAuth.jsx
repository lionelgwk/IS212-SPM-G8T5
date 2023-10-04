// Function to check if the user is authenticated based on localStorage
export function useAuth() {

    const userToken = localStorage.getItem('userToken');
  
    // Return true if key 'userToken' is set, thus user is authenticated, false otherwise
    return !!userToken;
}

export function useAuthStaff(){
    const userPosition = localStorage.getItem('position');
    return userPosition === "staff";
}

export function useAuthManager(){
    const userPosition = localStorage.getItem('position');
    if (userPosition == "manager" || userPosition == "director"){
        return true;
    }
    return false;
}