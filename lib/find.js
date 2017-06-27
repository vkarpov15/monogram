module.exports = collection => {
  collection.action(function find(filter, options) {
    return collection._collection.find(filter, options).toArray();
  });

  collection.pre('find', function(action) {
    if (!action.chained.length) {
      return action;
    }
    while (action.params.length < 2) {
      action.params.push({});
    }
    action.chained.forEach(function(chained) {
      action.params[1][chained.name] = chained.params[0];
    });
    return action;
  });
};