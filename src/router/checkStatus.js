const checkStatus = (nextState, replace, next) => {
    const tokenInfo = JSON.parse(localStorage.getItem('token'));
    if (tokenInfo) {
        const curTime = tokenInfo.curTime;
        const time = new Date().getTime();
        if ((time - curTime) > (1000 * 60 * 10)) {
            replace('/login?reUrl=writer');// 如果token信息为空就直接到登录页面
            next();
        } else {
            next();
        }
    } else {
        replace('/login?reUrl=writer');// 如果token信息为空就直接到登录页面
        next();
    }
};

export default checkStatus;
