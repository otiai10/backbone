(function(){
  // Backbone
  var Task = Backbone.Model.extend({
    defaults: {
      title : 'do something',
      completed : false,
    }
  });
  var Tasks = Backbone.Collection.extend({model:Task});

  var TaskView = Backbone.View.extend({
    tagName : 'li',
    initialize : function(){
      this.model.on('destroy',this.remove, this);
    },
    events  : {
      'click .delete' : 'destroy'
    },
    destroy : function(){
      if(confirm('are you sure?')){
        this.model.destroy();
      }
    },
    remove : function(){
      this.$el.remove();
    },
    template: _.template($('#task-template').html()),
    render : function(){
      var tpl = this.template(this.model.toJSON());
      this.$el.html(tpl);
      return this;
    }
  });
  var TasksView = Backbone.View.extend({
    tagName : 'ul',
    render : function(){
      this.collection.each(function(task){
        var taskView = new TaskView({model:task});
        this.$el.append(taskView.render().el);
      },this);
      return this;
    }
  });

  var tasks = new Tasks([
    {
      title : 'りっちゃんぺろぺろ',
      completed : true,
    },
    {
      title : 'あずにゃんぺろぺろ',
    },
    {
      title : 'むぎちゃんふにふに',
    },
  ]);

  var tasksView = new TasksView({collection:tasks});
  $('#tasks').html(tasksView.render().el);
})();