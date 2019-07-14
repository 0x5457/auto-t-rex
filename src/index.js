import Model from './Model';

const m = new Model();
let lastJumpData = [];
/**
 * 归一化输入数据
 * @param {Array} data
 * @return {Array} 归一化后的数据
 */
function normalization(data) {
  return [data[0] / 600, data[1] / 600, data[2] / 100];
}

const getGameInfo = () => {
  // eslint-disable-next-line new-cap
  const runner = window.Runner();

  // 障碍物 xPos width 速度 runner.currentSpeed
  if (runner.horizon.obstacles.length > 0) {
    const firstHorion = runner.horizon.obstacles[0];
    const data = normalization([firstHorion.xPos, firstHorion.width, runner.currentSpeed]);

    if (!runner.tRex.jumping && m.predict(data)) {
      lastJumpData = data;
      runner.tRex.startJump(runner.currentSpeed);
    }

    if (runner.crashed) {
      if (runner.tRex.jumping) {
        m.train(lastJumpData, !runner.tRex.jumping);
      } else {
        m.train(data, !runner.tRex.jumping);
      }
      runner.restart();
    }
  }
  requestAnimationFrame(getGameInfo);
};

requestAnimationFrame(getGameInfo);
