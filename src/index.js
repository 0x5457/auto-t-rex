import Model from './Model';
import './test';

const m = new Model();

/**
 * 归一化输入数据
 * @param {Array} data
 * @param {Number} canvasWidth
 * @return {Array} 归一化后的数据
 */
function normalization(data, canvasWidth) {
  return [data[0] / canvasWidth, data[1] / canvasWidth, data[2] / 100];
}

const getGameInfo = () => {
  // eslint-disable-next-line new-cap
  const runner = window.Runner();

  // 障碍物 xPos width 速度 runner.currentSpeed
  if (runner.horizon.obstacles.length > 0) {
    
    const firstHorion = runner.horizon.obstacles[0];
    const data = normalization([firstHorion.xPos, firstHorion.width, runner.currentSpeed], runner.canvas.width);

    if (!runner.tRex.jumping && m.predict(data)) {
      runner.tRex.startJump(runner.currentSpeed);
    }

    if (runner.crashed) {
      m.train(data, !runner.tRex.jumping);
      runner.restart();
    }
  }
  requestAnimationFrame(getGameInfo);
};

requestAnimationFrame(getGameInfo);

