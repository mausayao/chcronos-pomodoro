let isRunning = false;

self.onmessage = function (event) {
    if (isRunning) return;
    isRunning = true;

    const state = event.data;

    const { activeTask, secondsRemaing } = state;
    const endDate = activeTask.startDate + secondsRemaing * 1000;
    const now = Date.now();

    let countDownSeconds = Math.ceil((endDate - now) / 1000);

    function countDown() {
        self.postMessage(countDownSeconds);

        const now = Date.now();
        countDownSeconds = Math.floor((endDate - now) / 1000);

        setTimeout(countDown, 1000);
    }

    countDown();
};