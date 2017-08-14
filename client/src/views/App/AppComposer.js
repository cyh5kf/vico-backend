import React from 'react';
import AppView from './AppView';
import _ from 'underscore';


export default class AppComposer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSideBarFold:false, //左侧菜单是否折叠
            menuList : [
                {path: '/main/home', name: 'Realtime statistics', icon: 'home'},
                {path: '/main/daily', name: 'Daily statistics', icon: 'line-chart'},
                {path: '/main/realtimertt', name: 'Realtime rtt statistics', icon: 'area-chart'},
            ]
        };
    }

    handleChangeMenu = (e)=> {
        //nothing
    };

    toggleMenuFold=()=>{
        var isSideBarFold = this.state.isSideBarFold;
        this.setState({isSideBarFold:!isSideBarFold});
    };

    getMenuItem = (path)=>{
        var menu = _.find(this.state.menuList, function (m) {
            if (m.path === path) {
                return m;
            }
        });
        return menu || {};
    };

     getMenuItemByRoute =  (routes)=>{
        var paths = _.map(routes, function (r) {
            if (r.path === '/') {
                return '';
            }
            return r.path;
        });
        var path = paths.join('/');
        return this.getMenuItem(path);
    };

    render() {

        var routes = this.props.routes;
        var routeInfo = this.getMenuItemByRoute(routes);
        var store = _.extend({
            menuList: this.state.menuList,
            menuCurrent: routeInfo.path
        },this.state);

        return (
            <AppView actions={this} store={store} routeInfo={routeInfo}>{this.props.children}</AppView>
        );
    }

}
