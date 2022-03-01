import Cookie from 'js-cookie'
export default {
    namespaced: true,
    state: {
        currentMenu: null,
        isCollapse: false,
        tabs: [

        ],
        menu: []
    },
    mutations: {
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
            console.log(val);
        },
        clearMenu(state) {
            state.menu = [],
                Cookie.remove('menu'),
                state.tabs = []
        },
        addMenu(state, router) {
            if (!Cookie.get('menu')) {
                return
            }
            let menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            let currentMenu =
            {
                path: '/',
                component: () => import(`@/views/Main`),
                children: []
            }

            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`@/views/${item.url}`)
                        return item
                    })
                    currentMenu.children.push(...item.children)
                } else {
                    item.component = () => import(`@/views/${item.url}`)
                    currentMenu.children.push(item)
                }
            });
            console.log(currentMenu);
            router.addRoute(currentMenu)
        },
        SELECT(state, val) {
            if (state.tabs.findIndex(tab => tab.name == val.name) == -1 && val.name != 'home') {
                state.tabs.push(val);
            }
            val.name === "home" ? state.currentMenu = null : state.currentMenu = val;
        },
        changeActive(state, val) {
            state.currentMenu.path = val.path
        },
        DELETETAB(state, { name, router }) {
            state.tabs = state.tabs.filter(item => !(item.name == name))
            let length = state.tabs.length
            let isCurrentRoute = state.tabs.findIndex(item => item.name == router.currentRoute.name) === -1;
            // (length == 0) && a ? router.push({ name: 'home' }) : router.push({ name: state.tabs[length - 1].name })
            if (length == 0) {
                router.push({ name: 'home' });
                state.currentMenu = null;
            } else if (isCurrentRoute) {
                router.push({ name: state.tabs[length - 1].name })
                state.currentMenu = state.tabs[length - 1]
            }
        },
        pushRoute(state, { router, item }) {
            const cur = state.currentMenu;
            let isPushRoute = null;
            if (cur) {
                cur.name == item.name ? (isPushRoute = false) : (isPushRoute = true);
            } else {
                item.name == "home" ? (isPushRoute = false) : (isPushRoute = true);
            }
            if (isPushRoute) {
                router.push({ name: item.name });
            }
        },
        HANDLECOLLAPSE(state) {
            state.isCollapse = !state.isCollapse
        }
    },
    actions: {

    },

}