export const getUserAdmin = () => {
    return {
        type: "GET_ADMIN_USER"
    };
}

export const getAnotherUser = (username) => {
    return {
        type: "GET_ANOTHER_USER",
        username: username
    };
}