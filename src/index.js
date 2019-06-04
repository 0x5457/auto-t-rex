import Model from './Model';

const m = new Model();

const getGameInfo = async () => {
  // eslint-disable-next-line new-cap
  const runner = window.Runner();

  // 障碍物 xPos width 速度 runner.currentSpeed
  if (runner.horizon.obstacles.length > 0) {
    const firstHorion = runner.horizon.obstacles[0];
    const data = [firstHorion.xPos, firstHorion.width, runner.currentSpeed];

    const isJump = m.predict(data);

    if (isJump) {
      runner.tRex.startJump(runner.currentSpeed);
    }

    if (runner.crashed) {
      console.log(runner.tRex.jumping);
      m.train(data, !runner.tRex.jumping).then(() => {
        runner.restart();
      });
    }
  }
};

setInterval(getGameInfo, 100);
