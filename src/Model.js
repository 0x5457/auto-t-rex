/**
 *
 */
export class Model {
  /**
   *
   */
  constructor() {
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [3], units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 10, activation: 'softmax' }),
      ],
    });
  }

  /**
   * 训练模型
   * @param {[]} data
   * @param {[]} label
   */
  train(data, label) {
    optimizer.minimize(() => {
      const predYs = model(xs);
      const loss = tf.losses.softmaxCrossEntropy(ys, predYs);
      loss.data().then(l => console.log('Loss', l));
      return loss;
    });
  }
}
