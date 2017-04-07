import path from 'path';

export default {
  port: process.env.PORT || 5000,
  root: path.resolve(__dirname, '../../../../'),
  dist: path.resolve(__dirname, '../../../../dist'),
  static: path.resolve(__dirname, '../../../client')
}