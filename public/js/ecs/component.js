ECS.component = ECS.component || {}

/**
 * Factory function to create a component with a name and data.
 * @param name
 * @param data
 * @returns {{name}}
 */
ECS.componentFactory = function (name, data) {
  return Object.assign({ name }, data);
}