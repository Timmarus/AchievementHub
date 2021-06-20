// user action functions
const log = console.log


export const setRouteToAccount = (app, route) => {
    app.setState({currentPage: route})

}