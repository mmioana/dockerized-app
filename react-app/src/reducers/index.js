const userAdmin = {
    username: 'admin',
    password: '123456ABC',
    isLoggedIn: false
};

export default (user = userAdmin, action) => {
    switch(action.type) {
        case 'GET_ADMIN_USER': {
            return user;
        }
        case 'SET_LOGGED_IN': {
            return Object.assign({}, user, {
                isLoggedIn: true
            });
        }
        case 'SET_LOGGED_OUT': {
            return Object.assign({}, user, {
                isLoggedIn: false
            });
        }
        default: {
            return user;
        }
    }
}