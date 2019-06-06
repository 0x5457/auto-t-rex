import * as tf from '@tensorflow/tfjs';

const inputs = [
  [0.32666666666666666, 0.085, 0.06346000000000115],
  [0.06833333333333333, 0.085, 0.06099000000000033],
  [0.235, 0.125, 0.07601000000000535],
  [0.30666666666666664, 0.125, 0.071980000000004],
  [0.25666666666666665, 0.125, 0.07116000000000372],
];
const labels = [0, 1, 1, 0, 0];

const w = tf.variable(tf.randomNormal([3, 6]));
const b = tf.variable(tf.randomNormal([6]));
const w1 = tf.variable(tf.randomNormal([6, 2]));
const b1 = tf.variable(tf.randomNormal([2]));

/**
 * 模型
 *
 * @param {Array} x
 * @return {any}
 */
function model(x) {
  return tf.tensor(x)
    .reshape([-1, 3])
    .matMul(w)
    .add(b)
    .matMul(w1)
    .add(b1);
}

const optimizer = tf.train.adam(0.5);
for (let index = 0; index < 100; index++) {
  for (let i = 0; i < inputs.length; i++) {
    optimizer.minimize(() => {
      const predYs = model(inputs[i]);

      const loss = tf.losses.sigmoidCrossEntropy(tf.oneHot(labels[i], 2).reshape([-1, 2]), predYs);

      loss.data().then(l => console.log('Loss', l));

      console.log(labels[i]);

      tf.argMax(predYs, 1).print();

      return loss;
    });
  }
}

// const w = tf.variable(tf.randomNormal([1, 1]));
// const b = tf.variable(tf.randomNormal([1, 1]));

// /**
//  * 模型
//  * @param {Number} x
//  * @return {any}
//  */
// function model(x) {
//   return tf.tidy(() => {
//     return tf
//       .tensor(x)
//       .reshape([-1, 1])
//       .matMul(w)
//       .add(b);
//   });
// }
// const optimizer = tf.train.adam(0.8);

// for (let i = 0; i < 100; i++) {
//   optimizer.minimize(() => {
//     const x = Math.random();

//     const predYs = model(x);

//     const loss = tf.losses.meanSquaredError(tf.tensor(x * 0.3 + 0.9).reshape([-1, 1]), predYs);

//     loss.data().then(l => console.log('Loss', l));
//     w.print();
//     b.print();
//     return loss;
//   });
// }
