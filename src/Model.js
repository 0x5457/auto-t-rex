/**
 * 神经网络模型类
 */
export class Model {
  /**
   * 创建模型
   */
  constructor() {
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [3], units: 1 }),
        tf.layers.dense({ units: 128, activation: 'relu' }),
        tf.layers.dense({ units: 2, activation: 'sigmoid' }),
      ],
    });
    this.model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });
  }

  /**
   * 训练模型
   * 
   * @param {Array} data  [障碍物x轴, 障碍物宽度,  当前速度]
   * @param {Array} label [0, 1] or [1, 0] 是否应该跳 one-hot
   */
  train(data, label) {
    this.model.fit(tf.tensor1d(data), tf.tensor1d(label), {
      batchSize: 1,
      epochs: 3,
    });
  }

  /**
   * 预测是否应该跳
   * 
   * @param {Array} data  [障碍物x轴, 障碍物宽度,  当前速度]
   * @return {Array} 是否应该跳的 one-hot
   */
  predict(data) {
    return this.model.predict(tf.tensor1d(data));
  }
}
