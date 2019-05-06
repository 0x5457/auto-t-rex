const getGameInfo = () => {
    // eslint-disable-next-line new-cap
    const runner = window.Runner();
    console.log(runner.currentSpeed); // 速度
    console.log(runner.horizon.obstacles[0].spritePos); // 第一个障碍物的位置 // x: 228 y: 2
    
    requestAnimationFrame(getGameInfo)
}

requestAnimationFrame(getGameInfo);