;(function( $ ){

  var defaults = {
  };

  $.fn.editTable = function(params) {
    return this.each(function() {
      var table = $(this),
          settings = $.extend({}, defaults, params),
          tr = table.find('tbody tr'),
          td = tr.find('td'),
          buttonDel = '<button type="button" class="btn btn-danger btn-xs delete"><i class="fa fa-times" aria-hidden="true"></i></button>',
          buttonAppendTop = '<button type="button" class="btn btn-primary btn-xs append top"><i class="fa fa-arrow-up" aria-hidden="true"></i></button>',
          buttonAppendBottom = '<button type="button" class="btn btn-primary btn-xs append bottom"><i class="fa fa-arrow-down" aria-hidden="true"></i></button>',
          buttonEdit = '<button type="button" class="btn btn-primary btn-xs edit"><i class="fa fa-pencil" aria-hidden="true"></i></button>',
          buttonSave = '<button type="button" class="btn btn-success btn-xs save"><i class="fa fa-check" aria-hidden="true"></i></button>';

      tr.append('<td>'+buttonAppendTop+' '+buttonAppendBottom+' '+buttonDel+'</td>');
      td.append(buttonEdit);


      //Удаление строки
      table.on('click','.delete',function(){
        console.info('del');
        $(this).closest('tr').remove();
      })

      //Редактирование ячейки
      table.on('click','.edit',function(){
        console.info('edit');
        var trParent = $(this).closest('td'),
            text = trParent.text();
        trParent.html('<textarea>'+text+'</textarea>'+buttonSave)
      })

      //Сохранение ячейки
      table.on('click','.save',function(){
        console.info('save');
        var trParent = $(this).closest('td'),
            text = trParent.find('textarea').val();

        trParent.html(text+buttonEdit);
      })

      //Добавить строку таблицы
      table.on('click','.append',function(){
        var arrow = ($(this).hasClass('top')) ? 'top' : 'bottom',
            thisTr = $(this).closest('tr'),
            newTr  = thisTr.clone(),
            trNew;

        if (arrow == 'top')
        {
          thisTr.before(newTr);
          trNew = thisTr.prev('tr');
        }
        if (arrow == 'bottom')
        {
          thisTr.after(newTr);
          trNew = thisTr.next('tr');
        }

        trNew.find('td:not(:last-child)').html('...'+buttonEdit);
        trNew.find('td:last-child').html(buttonAppendTop+' '+buttonAppendBottom+' '+buttonDel);


      })


    });
  };
})( jQuery )
