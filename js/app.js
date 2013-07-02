(function(){
  // model
  var Task = Backbone.Model.extend({
    defaults : {
      title : 'This is default title',
      completed : false,
    },
    someMethod : function(){
      this.set('completed', !this.get('completed'));
      return this.get('completed');
    },
  });
  var task1 = new Task({
    title     : 'hoge-----',
    date      : '2013-07-01',
    completed : false,
  });

  // view
  var TaskView = Backbone.View.extend({
    tagName   : 'li',
    template  : _.template($("#task-template").html()),
    render    : function(){
      var tmplt = this.template(this.model.toJSON());
      this.$el.html(tmplt);
      return this;
    },
  });

  // Collection
  var Tasks = Backbone.Collection.extend({
    model : Task
  });

  var TasksView = Backbone.View.extend({
    tagName : 'ul',
    render : function(){
      this.collection.each(function(task){
        var taskView = new TaskView({model:task});
        this.$el.append(taskView.render().el);
      },this);
      return this;
    },
  });
  var tasks = new Tasks([
    {
      title : '001',
    },
    {
      title : '002',
    },
    {
      title : '003',
    }
  ]);
  var tasksView = new TasksView({collection: tasks});
  $('#tasks').html(tasksView.render().el);
})();
