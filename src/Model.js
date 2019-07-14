import * as tf from '@tensorflow/tfjs';

/**
 * 神经网络模型类
 */
export default class Model {
  /**
   * 创建模型
   */
  constructor() {
    this.inputs = [];
    this.labels = [];

    this.w1 = tf.variable(tf.randomNormal([3, 6]));
    this.b1 = tf.variable(tf.randomNormal([6]));
    this.w2 = tf.variable(tf.randomNormal([6, 2]));
    this.b2 = tf.variable(tf.randomNormal([2]));

    this.optimizer = tf.train.adam(0.1);
  }

  /**
   * 模型
   *
   * @param {Array} x
   * @return {Array} predY
   */
  model(x) {
    return tf.tidy(() => {
      return tf
        .tensor(x)
        .reshape([-1, 3])
        .matMul(this.w1)
        .add(this.b1)
        .matMul(this.w2)
        .add(this.b2);
    });
  }

  /**
   * 训练模型
   *
   * @param {Array} data  [障碍物x轴, 障碍物宽度,  当前速度]
   * @param {Boolean} label 是否应该跳
   *
   */
  train(data, label) {
    this.inputs.push(data);
    this.labels.push(label ? [1, 0] : [0, 1]);
    
    tf.tidy(() => {
      for (let i = 0; i < 100; i++) {
        this.optimizer.minimize(() => {
          const predYs = this.model(this.inputs);

          const loss = tf.losses.sigmoidCrossEntropy(
            tf.tensor2d(this.labels).reshape([-1, 2]),
            predYs,
          );
          // loss.data().then(l => console.log('Loss', l));
          return loss;
        });
      }
    });
  }

  /**
   * 预测是否应该跳
   *
   * @param {Array} data  [障碍物x轴, 障碍物宽度,  当前速度]
   * @return {Boolean} 是否应该跳的
   */
  predict(data) {
    const predictRes = this.model(data).arraySync();
    return predictRes[0][0] > predictRes[0][1];
  }
}
