// Function to check if the user is authenticated based on localStorage
export function useAuth() {

    const userToken = localStorage.getItem('userToken');
  
    // Return true if key 'userToken' is set, thus user is authenticated, false otherwise
    return !!userToken;
}