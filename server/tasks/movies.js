const { resolve } = require('path')
const cp = require('child_process');

; (async () => {
    const script = resolve(__dirname, '../crawler/trail.js')
    const child = cp.fork(script, []); // 衍生新的 Node.js 进程，并调用指定的模块，该模块已建立了 IPC 通信通道，可以在父进程与子进程之间发送消息

    let invoked = false;

    child.on('error', err => {
        if (invoked) return;

        invoked = true;

        console.log(invoked);
    })

    child.on('exit', code => {
        if (invoked) return;

        invoked = false;

        let err = code === 0 ? null : new Error('exit code ' + code)

        console.log(err)
    })

    child.on('message', data => {
        let result = data.result;

        console.log(result)
    })
})()