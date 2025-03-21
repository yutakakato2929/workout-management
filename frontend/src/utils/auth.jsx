export const isAuthenticated = () => {
    const token = localStorage.getItem("access_token");
    return !!token; // トークンがある場合は true, ない場合は false
};