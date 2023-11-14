export type Config = {
    addStyle: {
        side: string,
        sideMenu: string,
        sideLink: string,
        login: string,
        loginTitle: string
    },
    login: {
        title: string,
    }
}

export type SideLink = {
    label: string,
    link: string
}