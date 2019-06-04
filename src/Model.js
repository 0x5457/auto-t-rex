import * as tf from '@tensorflow/tfjs';
/**
 * 神经网络模型类
 */
export default class Model {
  /**
   * 创建模型
   */
  constructor() {
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [3], units: 1 }),
        tf.layers.dense({ units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 2, activation: 'sigmoid' }),
      ],
    });
    this.model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });
  }

  /**
   * 训练模型
   *
   * @param {Array} data  [障碍物x轴, 障碍物宽度,  当前速度]
   * @param {Boolean} label 是否应该跳
   * 
   * @return {Object} 是否应该跳的
   */
  train(data, label) {
    return this.model.fit(
      tf
        .tensor1d(data)
        .reshape([1, 3])
        .softmax(),
      tf.tensor1d(label ? [1, 0] : [0, 1]).reshape([1, 2]),
      {
        batchSize: 1,
        epochs: 1,
      },
    );
  }

  /**
   * 预测是否应该跳
   *
   * @param {Array} data  [障碍物x轴, 障碍物宽度,  当前速度]
   * @return {Boolean} 是否应该跳的
   */
  predict(data) {
    const predictRes = this.model
      .predict(
        tf
          .tensor1d(data)
          .reshape([1, 3])
          .softmax(),
      )
      .arraySync();
    return predictRes[0][0] > predictRes[0][1];
  }
}
