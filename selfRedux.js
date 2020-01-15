;(function anonymous() {
    let stateObj = {}
    let listenAry = []

    function updateState(callback) {
        let newObj = callback(stateObj)
        stateObj = {...stateObj, ...newObj}

        listenAry.forEach(item => {
            if (typeof item === 'function') {
                item()
            }
        })
    }

    function getState() {
        return stateObj
    }

    function subscribe(fn) {
        for (let i = 0; i < listenAry.length; i++) {
            if (listenAry[i] === fn) {
                return;
            }
        }
        listenAry.push(fn)
    }

    window.myRedux = {
        updateState,
        getState,
        subscribe
    }
})();