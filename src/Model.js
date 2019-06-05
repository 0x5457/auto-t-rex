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

    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [3], units: 2 }),
        tf.layers.dense({ units: 2, activation: 'relu' }),
        tf.layers.dense({ units: 1, activation: 'sigmoid' }),
      ],
    });
    this.model.summary();
    this.model.compile({
      optimizer: tf.train.adam(1e-3),
      loss: 'binaryCrossentropy',
      metrics: ['accuracy'],
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
    this.labels.push(label ? 1 : 0);

    this.model
      .trainOnBatch(
        tf.tensor2d(this.inputs).reshape([-1, 3]),
        tf
          .tensor1d(this.labels)
          .toFloat()
          .reshape([-1, 1]),
      )
      .then(([loss, metric]) => {
        console.log(`loss ${loss}, metric: ${metric}`);
      });
  }

  /**
   * 预测是否应该跳
   *
   * @param {Array} data  [障碍物x轴, 障碍物宽度,  当前速度]
   * @return {Boolean} 是否应该跳的
   */
  predict(data) {
    const predictRes = this.model.predict(tf.tensor1d(data).reshape([-1, 3])).arraySync();
    return predictRes[0][0] > 0.5;
  }
}
