const HOUR = 1000 * 60 * 60 * 60;
export const INITIAL_STATE: MiniDBState = {
    accounts: [],
    limit: 10,
};
export const MINI_DB_FILE_PATH_NAME = 'miniDBFile.json';
export const DB_ADMIN_ACCOUNT: UserFromDataBaseType = {
    ID: 1,
    constraint: 'admin',
    username: { value: process.env.ADMIN_USERNAME as string },
    password: { value: process.env.ADMIN_PASSWORD as string },
};
export const ADMIN_ACCOUNT: AccountFromClientType = {
    username: { value: process.env.ADMIN_USERNAME as string },
    password: { value: process.env.ADMIN_PASSWORD as string },
};

export const SERVER_ERROR_RESPONSE = 'internal server error';

export const COOKIES_EXPIRES = new Date(Date.now() + HOUR * 2);

export const DATABASE: MiniDBType = { state: INITIAL_STATE };
DATABASE.state.accounts.push(DB_ADMIN_ACCOUNT);
